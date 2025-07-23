import { BotContext } from '@util';
import { isBackButtonPressed, processText } from '../helper';
import { IdeaContent, StyleContent } from './content.drawer';

export const writeIdea = async (ctx: BotContext) => {
  console.log('=====================> writeIdea', ctx.updateType);

  const idea = await processText(ctx, 'mainIdea');

  if (idea) {
    ctx.wizard.next();
    return StyleContent(ctx);
  }
  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  return IdeaContent(ctx);
};
