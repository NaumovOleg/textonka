import { BotContext, WizardType } from '@util';
import { Message } from 'telegraf/types';
import { LanguageContent, WelcomeContent } from './content.drawer';

export const welcomeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] ??= {};

  ctx.wizard.next();

  await WelcomeContent(ctx);
  const message = await LanguageContent(ctx);
  ctx.scene.state.rootMessageId = (message as Message.TextMessage).message_id;

  return message;
};
