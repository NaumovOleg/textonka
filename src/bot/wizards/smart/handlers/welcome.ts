import { findSubscriptionUC } from '@shared/useCases';
import { BotContext, SmartWizardName, WizardType } from '@util';
import { Message } from 'telegraf/types';
import { ByeContent } from '../../general.content.drawer';
import { isFinishButtonPressed } from '../helper';
import { LanguageContent, WelcomeContent } from './content.drawer';

export const welcomeHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  ctx.scene.session[WizardType.smart_wizard] ??= {};
  ctx.scene.session[WizardType.quick_wizard] ??= {};

  const subscription = await findSubscriptionUC.execute({
    user: ctx.state.user.id,
  });

  if (!subscription || subscription.availableGenerations?.smartWizard < 1) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${SmartWizardName}.text.subscription_expired`),
    );
    return ctx.scene.leave();
  }

  ctx.wizard.next();

  await WelcomeContent(ctx);
  const message = await LanguageContent(ctx);
  ctx.scene.state.rootMessageId = (message as Message.TextMessage).message_id;

  return message;
};
