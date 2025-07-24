import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  processButtons,
} from '../helper';
import { EmotionContent, IdeaContent, StyleContent } from './content.drawer';

export const selectStyleHandler = async (ctx: BotContext) => {
  const style = await processButtons(ctx, {
    buttonGroup: 'style',
    sessionKey: 'style',
  });

  if (style) {
    ctx.wizard.next();
    return EmotionContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return IdeaContent(ctx);
  }

  await StyleContent(ctx);
};
