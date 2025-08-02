import {
  BotContext,
  QuickWizardButtons,
  QuickWizardGeneralButtons,
  WizardType,
} from '@util';
import { callbackQuery } from 'telegraf/filters';

export function isFinishButtonPressed(ctx: BotContext) {
  if (ctx.has(callbackQuery('data'))) {
    return QuickWizardGeneralButtons.finish_wizard === ctx.callbackQuery?.data;
  }
  return false;
}

export async function processButtons<
  K extends keyof typeof QuickWizardButtons,
  V extends
    keyof BotContext['scene']['session'][typeof WizardType.quick_wizard],
  T extends BotContext['scene']['session'][typeof WizardType.quick_wizard][V],
>(ctx: BotContext, data: { buttonGroup: K; sessionKey: V }) {
  if (!ctx.has(callbackQuery('data'))) {
    return null;
  }

  const selectedKey = ctx.callbackQuery
    ?.data as keyof (typeof QuickWizardButtons)[K];

  if (!selectedKey || !(selectedKey in QuickWizardButtons[data.buttonGroup])) {
    return null;
  }

  const value = QuickWizardButtons[data.buttonGroup][selectedKey] as T;

  ctx.scene.session[WizardType.quick_wizard][data.sessionKey] = value;

  return value;
}

export const clearMessageText = async (ctx: BotContext) => {
  if (ctx.chat?.id && ctx.message?.message_id) {
    return ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
  return null;
};
