import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import { DetailsContent, GoalContent, StyleContent } from './content.drawer';

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
    return StyleContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return DetailsContent(ctx);
  }

  return GoalContent(ctx);
};
