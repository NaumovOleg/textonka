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
