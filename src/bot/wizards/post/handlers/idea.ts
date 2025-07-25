import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processText,
} from '../helper';
import {
  ByeContent,
  GoalContent,
  IdeaContent,
  StyleContent,
} from './content.drawer';

export const writeIdeaHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const idea = await processText(ctx, 'mainIdea');

  if (idea) {
    await clearMessageText(ctx);

    ctx.wizard.next();
    return StyleContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return GoalContent(ctx);
  }

  return IdeaContent(ctx);
};
