import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import {
  ByeContent,
  GoalContent,
  IdeaContent,
  TypeContent,
} from './content.drawer';

export const selectGoalHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
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
