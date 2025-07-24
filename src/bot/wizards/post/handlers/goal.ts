import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  processButtons,
} from '../helper';
import { GoalContent, IdeaContent, TypeContent } from './content.drawer';

export const selectGoalHandler = async (ctx: BotContext) => {
  const goal = await processButtons(ctx, {
    sessionKey: 'goal',
    buttonGroup: 'goal',
  });

  if (goal) {
    ctx.wizard.next();
    return IdeaContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return TypeContent(ctx);
  }

  return GoalContent(ctx);
};
