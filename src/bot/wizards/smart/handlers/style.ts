import { BotContext } from '@util';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import {
  ByeContent,
  EmotionContent,
  GoalContent,
  StyleContent,
} from './content.drawer';

export const selectStyleHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
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
    return GoalContent(ctx);
  }

  await StyleContent(ctx);
};
