import {
  type BotContext,
  QUICK_SUBSCRIPTION_BUTTONS,
  SMART_PRODUCT_PAYLOAD,
  SMART_SUBSCRIPTION_BUTTONS,
} from '@util';
import { Composer } from 'telegraf';
import { message } from 'telegraf/filters';

const composer = new Composer<BotContext>();

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

  return ctx.reply(ctx.i18n.t('subscription.successful_payment'));
});

export const paymentsRouter = composer;
