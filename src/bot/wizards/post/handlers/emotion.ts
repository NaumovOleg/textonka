import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  processButtons,
} from '../helper';
import { DetailsContent, EmotionContent, StyleContent } from './content.drawer';

export const selectEmotionHandler = async (ctx: BotContext) => {
  const emotion = await processButtons(ctx, {
    buttonGroup: 'emotion',
    sessionKey: 'emotion',
  });
  if (emotion) {
    ctx.wizard.next();
    return DetailsContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return StyleContent(ctx);
  }

  return EmotionContent(ctx);
};
