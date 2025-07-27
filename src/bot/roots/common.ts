import { type BotContext } from '@util';
import { Composer } from 'telegraf';

const composer = new Composer<BotContext>();
composer.command('start', async (ctx) => {
  ctx.session = {};
  return ctx.reply(ctx.i18n.t('welcome_message'), {
    parse_mode: 'HTML',
  });
});

composer.command('quit', async (ctx) => {
  ctx.session = {};
  await ctx.telegram.leaveChat(ctx.message.chat.id);
  await ctx.leaveChat();
});

composer.command('samples', async (ctx) => {
  ctx.session = {};
  const sample1 = ctx.i18n.t('before_after.samples.sample_1');
  const sample2 = ctx.i18n.t('before_after.samples.sample_2');
  const sample3 = ctx.i18n.t('before_after.samples.sample_2');
  return ctx.reply([sample1, sample2, sample3].join('\n\n\n\n'), {
    parse_mode: 'HTML',
  });
});
export const commonRouter = composer;
