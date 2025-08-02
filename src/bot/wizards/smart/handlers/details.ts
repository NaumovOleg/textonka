import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processText,
} from '../helper';
import { DetailsContent, GoalContent, IdeaContent } from './content.drawer';

import { ByeContent } from '../../general.content.drawer';

export const writeDetailsHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const details = await processText(ctx, 'keyDetails');

  if (details) {
    await clearMessageText(ctx);
    ctx.wizard.next();
    return GoalContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return IdeaContent(ctx);
  }

  return DetailsContent(ctx);
};
