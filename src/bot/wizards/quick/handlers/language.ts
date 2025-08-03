import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  isFinishButtonPressed,
  processButtons,
} from '../helper';
import { ImageContent } from './content.drawer';

export const languageHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  const language = await processButtons(ctx, {
    buttonGroup: 'language',
    sessionKey: 'language',
  });

  await clearMessageText(ctx);

  if (language) {
    ctx.wizard.next();
    return ImageContent(ctx);
  }
};
