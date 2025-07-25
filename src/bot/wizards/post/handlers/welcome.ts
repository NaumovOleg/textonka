import { findSubscriptionUC } from '@shared/useCases';
import { BotContext, PostWizardName, WizardType } from '@util';
import { Message } from 'telegraf/types';
import { LanguageContent, WelcomeContent } from './content.drawer';

export const welcomeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] ??= {};

  const subscription = await findSubscriptionUC.execute({
    user: ctx.state.user.id,
  });

  if (!subscription || subscription.availableGenerations?.postWizard < 1) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${PostWizardName}.text.subscription_expired`),
    );
    return ctx.scene.leave();
  }

  ctx.wizard.next();

  await WelcomeContent(ctx);
  const message = await LanguageContent(ctx);
  ctx.scene.state.rootMessageId = (message as Message.TextMessage).message_id;

  return message;
};
