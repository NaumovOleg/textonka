import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processText,
} from '../helper';
import { DetailsContent, IdeaContent, TypeContent } from './content.drawer';

export const writeIdeaHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const idea = await processText(ctx, 'mainIdea');

  if (idea) {
    await clearMessageText(ctx);

    ctx.wizard.next();
    return DetailsContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return TypeContent(ctx);
  }

  return IdeaContent(ctx);
};
