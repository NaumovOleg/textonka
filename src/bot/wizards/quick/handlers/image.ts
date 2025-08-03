import { attachmentService } from '@shared/services';
import { BotContext } from '@util';
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
  const buffer = await attachmentService.prepareFileBuffer(url.href);
  console.log(buffer);
  return ctx.reply('generated captcha');
};
