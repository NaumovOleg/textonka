import { BotContext } from '@util';
import {
  clearMessageText,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import { ByeContent, LanguageContent, TypeContent } from './content.drawer';

export const languageHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const language = await processButtons(ctx, {
    buttonGroup: 'language',
    sessionKey: 'language',
  });
  if (language) {
    ctx.wizard.next();
    return TypeContent(ctx);
  }
  await clearMessageText(ctx);

  return LanguageContent(ctx);
};
