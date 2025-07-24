import { BotContext, WizardType } from '@util';
import { Message } from 'telegraf/types';
import { TypeContent } from './content.drawer';

export const welcomeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] ??= {
    messagesToDelete: [],
  };

  ctx.wizard.next();
  const message = await TypeContent(ctx);
  ctx.scene.session[WizardType.post_wizard].rootMessageId = (
    message as Message.TextMessage
  ).message_id;

  return message;
};
