import { aiService, subscriptionService } from '@shared/services';
import { findSubscriptionUC } from '@shared/useCases';
import {
  BotContext,
  PostWizardGeneralButtons,
  PostWizardName,
  WizardType,
} from '@util';
import { callbackQuery } from 'telegraf/filters';
import {
  clearMessageText,
  editOrReplyMessage,
  isBackButtonPressed,
  isFinishButtonPressed,
} from '../helper';
import {
  AIContent,
  ByeContent,
  DetailsContent,
  ExtraContent,
} from './content.drawer';

export const handleExtraSelection = async (ctx: BotContext) => {
  let data;
  if (ctx.has(callbackQuery('data'))) {
    data = ctx.callbackQuery.data as string;
  }

  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }

  await clearMessageText(ctx);
  if (ctx.updateType === 'message') {
    return;
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return DetailsContent(ctx);
  }

  const subscription = await findSubscriptionUC.execute({
    user: ctx.state.user.id,
  });

  if (!subscription || subscription.availableGenerations?.postWizard < 1) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${PostWizardName}.text.subscription_expired`),
    );
    return ctx.scene.leave();
  }

  if (data === PostWizardGeneralButtons.submit_extra) {
    await editOrReplyMessage(
      ctx,
      ctx.i18n.t(`wizards.${PostWizardName}.text.finalStep`),
    );

    const prompt = await aiService.generatePostWizardText(
      ctx.scene.session[WizardType.post_wizard],
    );

    await editOrReplyMessage(
      ctx,
      ctx.i18n.t(`wizards.${PostWizardName}.text.generating`),
      {
        parse_mode: 'HTML',
      },
    );

    await AIContent(ctx, prompt);
    await Promise.all([
      subscriptionService.decreaseLeftPostWizardGenerations(ctx.state.user.id),
      subscriptionService.increasePostWizardGenerations(ctx.state.user.id),
    ]);

    return ctx.scene.leave();
  }

  return ExtraContent(ctx);
};
