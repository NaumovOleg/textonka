import { findSubscriptionUC } from '@shared/useCases';
import { BotContext, WizardType } from '@util';
import { ByeContent } from '../../general.content.drawer';
import { isFinishButtonPressed } from '../helper';
import { WelcomeContent } from './content.drawer';

export const welcomeHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }
  ctx.scene.session[WizardType.quick_wizard] ??= {};
  ctx.scene.session[WizardType.smart_wizard] ??= {};

  const subscription = await findSubscriptionUC.execute({
    user: ctx.state.user.id,
  });

  if (!subscription || subscription.availableGenerations?.quickWizard < 1) {
    await ctx.reply(ctx.i18n.t(`wizards.subscription_expired`));
    return ctx.scene.leave();
  }

  ctx.wizard.next();

  await WelcomeContent(ctx);
};
