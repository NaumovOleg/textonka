import { BotContext, QuickWizardGeneralButtons } from '@util';
import { callbackQuery } from 'telegraf/filters';

export function isFinishButtonPressed(ctx: BotContext) {
  if (ctx.has(callbackQuery('data'))) {
    return QuickWizardGeneralButtons.finish_wizard === ctx.callbackQuery?.data;
  }
  return false;
}
