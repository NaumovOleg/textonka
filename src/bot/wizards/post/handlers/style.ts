import { BotContext, WizardType } from '@util';
import { isBackButtonPressed, processButtons } from '../helper';
import { EmotionContent, IdeaContent, StyleContent } from './content.drawer';

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

  for (const id of ctx.scene.session[WizardType.post_wizard].messagesToDelete ??
    []) {
    try {
      if (ctx.chat?.id) {
        console.log('ssssssssssssssss', id);
        await ctx.telegram.deleteMessage(ctx.chat.id, id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return IdeaContent(ctx);
  }

  await StyleContent(ctx);
};
