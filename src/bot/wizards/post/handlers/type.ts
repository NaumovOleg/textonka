import { BotContext, WizardType } from '@util';
import { processButtons } from '../helper';
import { GoalContent, TypeContent } from './content.drawer';

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
  return TypeContent(ctx);
};
