import { BotContext } from '@util';
import { isBackButtonPressed, processButtons } from '../helper';
import { GoalContent, IdeaContent, TypeContent } from './content.drawer';

export const selectGoalHandler = async (ctx: BotContext) => {
  console.log(
    '=====================> selectGoalHandler',
    ctx.updateType,
    ctx.wizard.cursor,
  );

  const goal = await processButtons(ctx, {
    sessionKey: 'goal',
    buttonGroup: 'goal',
  });

  if (goal) {
    ctx.wizard.next();
    return IdeaContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return TypeContent(ctx);
  }

  return GoalContent(ctx);
};
