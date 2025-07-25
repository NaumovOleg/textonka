import { findSubscriptionUC } from '@shared/useCases';
import { BotContext, PostWizardGeneralButtons, PostWizardName } from '@util';
import { callbackQuery } from 'telegraf/filters';
import {
  clearMessageText,
  editOrReplyMessage,
  isBackButtonPressed,
} from '../helper';
import { AIContent, DetailsContent, ExtraContent } from './content.drawer';

export const handleExtraSelection = async (ctx: BotContext) => {
  let data;
  if (ctx.has(callbackQuery('data'))) {
    data = ctx.callbackQuery.data as string;
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

    const text =
      'Tap the copy button to copy the below address.\n\n<pre><code>The Address To Be Copied</code></pre>';

    await AIContent(ctx, text);
    return ctx.scene.leave();
  }

  return ExtraContent(ctx);
};
