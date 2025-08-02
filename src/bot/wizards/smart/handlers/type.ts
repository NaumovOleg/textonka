import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import { IdeaContent, LanguageContent, TypeContent } from './content.drawer';

export const selectTypeHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const type = await processButtons(ctx, {
    sessionKey: 'type',
    buttonGroup: 'type',
  });

  if (type) {
    ctx.wizard.next();
    return IdeaContent(ctx);
  }

  await clearMessageText(ctx);

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return LanguageContent(ctx);
  }

  return TypeContent(ctx);
};
