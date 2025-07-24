import { BotContext } from '@util';
import { clearMessageText, isBackButtonPressed, processText } from '../helper';
import { GoalContent, IdeaContent, StyleContent } from './content.drawer';

export const writeIdeaHandler = async (ctx: BotContext) => {
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
