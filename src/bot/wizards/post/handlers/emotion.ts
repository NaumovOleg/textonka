import { BotContext } from '@util';
import { isBackButtonPressed, processButtons } from '../helper';
import { DetailsContent, EmotionContent } from './content.drawer';

export const selectEmotion = async (ctx: BotContext) => {
  console.log('=====================> selectEmotion');
  const emotion = await processButtons(ctx, {
    buttonGroup: 'emotion',
    sessionKey: 'emotion',
  });
  if (emotion) {
    ctx.wizard.next();
    return DetailsContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  return EmotionContent(ctx);
};
