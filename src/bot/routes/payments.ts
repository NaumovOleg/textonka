import { subscriptionService } from '@shared/services';
import { updateInvoiceUC } from '@shared/useCases';
import {
  type BotContext,
  INVOICE_STATUS,
  PAYMENT_PAYLOAD,
  QUICK_GENERATIONS,
  QUICK_SUBSCRIPTION_BUTTONS,
  SMART_GENERATIONS,
  SMART_SUBSCRIPTION_BUTTONS,
} from '@util';
import { Composer } from 'telegraf';
import { message } from 'telegraf/filters';

const composer = new Composer<BotContext>();

composer.on('pre_checkout_query', (ctx) => {
  const query = ctx.update.pre_checkout_query;
  const payload: PAYMENT_PAYLOAD = JSON.parse(query.invoice_payload);
  const canProcessPayment =
    !!SMART_SUBSCRIPTION_BUTTONS[
      payload.product as SMART_SUBSCRIPTION_BUTTONS
    ] ||
    !!QUICK_SUBSCRIPTION_BUTTONS[payload.product as QUICK_SUBSCRIPTION_BUTTONS];

  ctx.answerPreCheckoutQuery(canProcessPayment);
});

composer.on(message('successful_payment'), async (ctx) => {
  const payment = ctx.message.successful_payment;
  const payload: PAYMENT_PAYLOAD = JSON.parse(payment.invoice_payload);
  const product =
    SMART_GENERATIONS[payload.product as SMART_SUBSCRIPTION_BUTTONS] ??
    QUICK_GENERATIONS[payload.product as QUICK_SUBSCRIPTION_BUTTONS];

  console.log('Успешная оплата:', payment);

  await Promise.all([
    subscriptionService.addGenerations(
      payload.user,
      product.type,
      product.count,
    ),
    updateInvoiceUC.execute(
      { id: payload.invoice },
      { status: INVOICE_STATUS.COMPLETED },
    ),
  ]);

  return ctx.reply(ctx.i18n.t('subscription.successful_payment'));
});

export const paymentsRouter = composer;
