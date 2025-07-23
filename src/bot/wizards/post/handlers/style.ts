import { BotContext } from '@util';
import { isBackButtonPressed, processButtons } from '../helper';
import { EmotionContent, StyleContent } from './content.drawer';

export const selectStyleHandler = async (ctx: BotContext) => {
  console.log('=====================> selectStyle', ctx.updateType);

  const style = await processButtons(ctx, {
    buttonGroup: 'style',
    sessionKey: 'style',
  });

  if (style) {
    ctx.wizard.next();
    return EmotionContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  await StyleContent(ctx);
};
