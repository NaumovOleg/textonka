import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processText,
} from '../helper';
import {
  ByeContent,
  DetailsContent,
  EmotionContent,
  ExtraContent,
} from './content.drawer';

export const writeDetailsHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const details = await processText(ctx, 'keyDetails');

  if (details) {
    await clearMessageText(ctx);
    ctx.wizard.next();
    return ExtraContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return EmotionContent(ctx);
  }

  return DetailsContent(ctx);
};
