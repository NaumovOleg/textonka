import Conf from '@conf';
import { type BotContext, COMMON_COMMANDS } from '@util';
import { Composer, Markup } from 'telegraf';

const composer = new Composer<BotContext>();

composer.start((ctx) => {
  return ctx.reply(
    ctx.i18n.t('welcome_message'),
    Markup.keyboard([
      [COMMON_COMMANDS.startQuickWizard, COMMON_COMMANDS.startSmartWizard],
    ]).resize(),
  );
});

composer.command(COMMON_COMMANDS.quit, async (ctx) => {
  ctx.session = {};
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});

composer.command(COMMON_COMMANDS.samples, async (ctx) => {
  ctx.session = {};
  const sample1 = ctx.i18n.t('before_after.samples.sample_1');
  const sample2 = ctx.i18n.t('before_after.samples.sample_2');
  const sample3 = ctx.i18n.t('before_after.samples.sample_2');
  return ctx.reply([sample1, sample2, sample3].join('\n\n\n\n'), {
    parse_mode: 'HTML',
  });
});

composer.command(COMMON_COMMANDS.info, async (ctx) => {
  const text = ctx.i18n.t('legal_info.text');
  return ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: ctx.i18n.t('legal_info.buttons.offer'),
            url: Conf.OFFER_LINK,
          },
          {
            text: ctx.i18n.t('legal_info.buttons.privacy'),
            url: Conf.PRIVACY_LINK,
          },
        ],
      ],
    },
  });
});

export const commonRouter = composer;
