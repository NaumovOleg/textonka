import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import { EmotionContent, ExtraContent, StyleContent } from './content.drawer';

export const selectEmotionHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const emotion = await processButtons(ctx, {
    buttonGroup: 'emotion',
    sessionKey: 'emotion',
  });
  if (emotion) {
    ctx.wizard.next();
    return ExtraContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return StyleContent(ctx);
  }

  return EmotionContent(ctx);
};
