import { BotContext, WizardType } from '@util';
import { isBackButtonPressed, processText } from '../helper';
import { GoalContent, IdeaContent, StyleContent } from './content.drawer';

export const writeIdeaHandler = async (ctx: BotContext) => {
  console.log('=====================> writeIdea', ctx.updateType);

  const idea = await processText(ctx, 'mainIdea');

  if (idea) {
    if (ctx.chat?.id && ctx.message?.message_id) {
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }

    ctx.wizard.next();
    return StyleContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    ctx.wizard.back();
    return GoalContent(ctx);
  }

  const message = await IdeaContent(ctx);
  console.log(message);
  if (message && typeof message !== 'boolean' && message?.message_id) {
    ctx.scene.session[WizardType.post_wizard].messagesToDelete?.push(
      message.message_id,
    );
  }
};
