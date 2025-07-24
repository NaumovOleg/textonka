import { BotContext } from '@util';
import { clearMessageText, isBackButtonPressed, processText } from '../helper';
import { DetailsContent, EmotionContent, ExtraContent } from './content.drawer';

export const writeDetailsHandler = async (ctx: BotContext) => {
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
