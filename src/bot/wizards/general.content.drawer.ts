import { BotContext } from '@util';
import { Convenience } from 'telegraf/types';

export const editOrReplyMessage = async (
  ctx: BotContext,
  text: string,
  options?: Convenience.ExtraEditMessageText,
) => {
  return ctx.telegram
    .editMessageText(
      ctx.chat?.id,
      ctx.scene.state.rootMessageId,
      undefined,
      text,
      options,
    )
    .catch((err) => {
      if (!err?.description?.includes('message is not modified')) {
        return ctx.reply(text, options);
      }
    });
};

export const ByeContent = (ctx: BotContext) => {
  const text = `<b>${ctx.i18n.t(`wizards.bye`)}</b>`;
  return editOrReplyMessage(ctx, text, { parse_mode: 'HTML' });
};
