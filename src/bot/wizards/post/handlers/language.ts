import { BotContext } from '@util';
import { clearMessageText, processButtons } from '../helper';
import { LanguageContent, TypeContent } from './content.drawer';

export const languageHandler = async (ctx: BotContext) => {
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
