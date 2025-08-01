import Conf from '@conf';
import { Subscription } from '@entities';
import {
  type BotContext,
  QUICK_SUBSCRIPTION_BUTTONS,
  SMART_GENERATIONS,
  SMART_PRODUCT_PAYLOAD,
  SMART_SUBSCRIPTION_BUTTONS,
  splitByChunks,
} from '@util';
import { Composer, Markup } from 'telegraf';
import { message } from 'telegraf/filters';

const composer = new Composer<BotContext>();

composer.command('subscription', async (ctx) => {
  ctx.session = {};
  const subscription = ctx.state.subscription as Subscription;
  const text = ctx.i18n.t('subscription.title', {
    smartWizard: subscription.availableGenerations.smartWizard,
    simpleWizard: 0,
  });

  const buttons = Object.values(SMART_GENERATIONS).map((product) =>
    Markup.button.callback(
      ctx.i18n.t(`subscription.by_buttons.smart`, {
        count: product.count,
        price: `${product.price / 100}/${product.currency}`,
      }),
      product.command,
    ),
  );

  return ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: Markup.inlineKeyboard(splitByChunks(buttons, 1)).reply_markup,
  });
});

composer.action(/^smart_\d+$/, async (ctx) => {
  const command = ctx.match[0] as SMART_SUBSCRIPTION_BUTTONS;
  const product = SMART_GENERATIONS[command];

  return ctx.replyWithInvoice({
    title: ctx.i18n.t(product.titleT, { count: product.count }),
    description: ctx.i18n.t(product.descriptionT),
    payload: JSON.stringify({
      user: ctx.state.user.id,
      product: product.id,
    }),
    provider_token: Conf.PAYMENT_TOKEN,
    currency: product.currency,
    prices: [{ label: product.currency, amount: product.price }],
    photo_url:
      'https://media.licdn.com/dms/image/v2/D4D12AQGgMCavCcCbEg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1711086616356?e=2147483647&v=beta&t=1N65UooE_qsxL1jn9bwI0x1CFp7-czZxArntN8jCIps',
    photo_width: 300,
    photo_height: 200,
    need_email: true,
  });
});

composer.on('pre_checkout_query', (ctx) => {
  const query = ctx.update.pre_checkout_query;
  const payload: SMART_PRODUCT_PAYLOAD = JSON.parse(query.invoice_payload);
  const isSmartProduct =
    !!SMART_SUBSCRIPTION_BUTTONS[payload.product as SMART_SUBSCRIPTION_BUTTONS];
  const isQuickProduct =
    !!QUICK_SUBSCRIPTION_BUTTONS[payload.product as QUICK_SUBSCRIPTION_BUTTONS];

  ctx.answerPreCheckoutQuery(isSmartProduct || isQuickProduct);
});

composer.on(message('successful_payment'), (ctx) => {
  const payment = ctx.message.successful_payment;
  console.log('Успешная оплата:', payment);

  return ctx.reply(
    `✅ Оплата прошла успешно!\nСумма: ${payment.total_amount / 100} ${payment.currency}\nСпасибо за покупку!`,
  );
});

export const subscriptionRouter = composer;
