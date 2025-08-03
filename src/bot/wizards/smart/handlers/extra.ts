import { aiService, subscriptionService } from '@shared/services';
import { findSubscriptionUC } from '@shared/useCases';
import {
  BotContext,
  GENERATIONS_TYPES,
  SmartWizardGeneralButtons,
  SmartWizardName,
  WizardType,
} from '@util';
import { callbackQuery } from 'telegraf/filters';
import {
  clearMessageText,
  isBackButtonPressed,
  isFinishButtonPressed,
} from '../helper';
import { AIContent, DetailsContent, ExtraContent } from './content.drawer';

import { ByeContent, editOrReplyMessage } from '../../general.content.drawer';

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

  if (!subscription || subscription.availableGenerations?.smartWizard < 1) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${SmartWizardName}.text.subscription_expired`),
    );
    return ctx.scene.leave();
  }

  if (data === SmartWizardGeneralButtons.submit_extra) {
    await editOrReplyMessage(
      ctx,
      ctx.i18n.t(`wizards.${SmartWizardName}.text.finalStep`),
    );

    const prompt = await aiService.generateAiResponse(
      WizardType.smart_wizard,
      ctx.scene.session[WizardType.smart_wizard],
    );

    await subscriptionService.performGeneration(
      GENERATIONS_TYPES.smartWizard,
      ctx.state.user.id,
    );
    await AIContent(ctx, prompt);
    return ctx.scene.leave();
  }

  return ExtraContent(ctx);
};
