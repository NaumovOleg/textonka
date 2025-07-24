import { BotContext, PostWizardGeneralButtons, PostWizardName } from '@util';
import { callbackQuery } from 'telegraf/filters';
import { clearMessageText, isBackButtonPressed } from '../helper';
import { DetailsContent, ExtraContent } from './content.drawer';

export const handleExtraSelection = async (ctx: BotContext) => {
  let data;
  if (ctx.has(callbackQuery('data'))) {
    data = ctx.callbackQuery.data as string;
  }

  await clearMessageText(ctx);

  if (ctx.updateType === 'message') {
    return;
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return DetailsContent(ctx);
  }

  if (data === PostWizardGeneralButtons.submit_extra) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${PostWizardName}.text.submitted_extra`),
    );
    return ctx.wizard.next();
  }

  return ExtraContent(ctx);
};
