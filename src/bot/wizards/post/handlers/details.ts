import { BotContext } from '@util';
import { isBackButtonPressed, processText } from '../helper';
import { DetailsContent, EmotionContent, ExtraContent } from './content.drawer';

export const writeDetailsHandler = async (ctx: BotContext) => {
  const details = await processText(ctx, 'keyDetails');

  if (details) {
    ctx.wizard.next();
    return ExtraContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return EmotionContent(ctx);
  }

  return DetailsContent(ctx);
};
