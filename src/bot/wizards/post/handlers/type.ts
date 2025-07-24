import { BotContext, WizardType } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  processButtons,
} from '../helper';
import { GoalContent, LanguageContent, TypeContent } from './content.drawer';

export const selectTypeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] ??= {};

  const type = await processButtons(ctx, {
    sessionKey: 'type',
    buttonGroup: 'type',
  });

  if (type) {
    ctx.wizard.next();
    return GoalContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return LanguageContent(ctx);
  }

  return TypeContent(ctx);
};
