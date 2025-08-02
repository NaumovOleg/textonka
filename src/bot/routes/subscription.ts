import Conf from '@conf';
import { Subscription } from '@entities';
import {
  PACKAGES,
  QUICK_GENERATIONS,
  QUICK_SUBSCRIPTION_BUTTONS,
  SMART_GENERATIONS,
  SMART_SUBSCRIPTION_BUTTONS,
  splitByChunks,
  SUBSCRIPTION_COMMANDS,
  type BotContext,
} from '@util';
import { Composer, Markup } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';

const composer = new Composer<BotContext>();

composer.command(SUBSCRIPTION_COMMANDS.subscription, async (ctx) => {
  ctx.session = {};
  const subscription = ctx.state.subscription as Subscription;
  const text = ctx.i18n.t('subscription.title', {
    smartWizard: subscription.availableGenerations.smartWizard,
    simpleWizard: 0,
  });

  const buttons = [
    Markup.button.callback(
      ctx.i18n.t(`subscription.by_buttons.price-list.smart`),
      SUBSCRIPTION_COMMANDS.smart_prices,
    ),
    Markup.button.callback(
      ctx.i18n.t(`subscription.by_buttons.price-list.quick`),
      SUBSCRIPTION_COMMANDS.quick_prices,
    ),
  ];

  return ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: Markup.inlineKeyboard(splitByChunks(buttons, 1)).reply_markup,
  });
});

composer.action(SUBSCRIPTION_COMMANDS.price_list, async (ctx) => {
  ctx.session = {};
  if (!ctx.has(callbackQuery('data'))) {
    return null;
  }

  const key = ctx.callbackQuery.data.split('-')[0] as PACKAGES;
  const generationsMap = {
    [PACKAGES.smart]: SMART_GENERATIONS,
    [PACKAGES.quick]: QUICK_GENERATIONS,
  };

  const buttons = Object.values(generationsMap[key]).map((product) =>
    Markup.button.callback(
      ctx.i18n.t(`subscription.by_buttons.${key}`, {
        count: product.count,
        price: `${product.price / 100}/${product.currency}`,
      }),
      product.command,
    ),
  );

  return ctx.reply(ctx.i18n.t('subscription.available_packages'), {
    parse_mode: 'HTML',
    reply_markup: Markup.inlineKeyboard(splitByChunks(buttons, 1)).reply_markup,
  });
});

composer.action(SUBSCRIPTION_COMMANDS.invoice, async (ctx) => {
  const command = ctx.match[0] as
    | QUICK_SUBSCRIPTION_BUTTONS
    | SMART_SUBSCRIPTION_BUTTONS;

  const product =
    SMART_GENERATIONS[command as SMART_SUBSCRIPTION_BUTTONS] ??
    QUICK_GENERATIONS[command as QUICK_SUBSCRIPTION_BUTTONS];

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

export const subscriptionRouter = composer;
