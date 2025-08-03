import { aiService } from '@shared/services';
import { BotContext, WizardType } from '@util';
import { ByeContent } from '../../general.content.drawer';
import {
  clearMessageText,
  getAttachment,
  isFinishButtonPressed,
} from '../helper';

export const imageHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }

  const attachment = await getAttachment(ctx);

  if (!attachment) {
    return clearMessageText(ctx);
  }
  if (attachment.error) {
    return ctx.reply(ctx.i18n.t(attachment.error), { parse_mode: 'HTML' });
  }
  const url = await ctx.telegram.getFileLink(attachment.fileId);
  ctx.scene.session[WizardType.quick_wizard].attachmentUrl = url.href;

  const captcha = await aiService.generateAiResponse(
    WizardType.quick_wizard,
    ctx.scene.session[WizardType.quick_wizard],
  );
  return ctx.reply(captcha);
};
