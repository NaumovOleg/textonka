import { BotContext, WizardType } from '@util';
import { Markup } from 'telegraf';

export const selectType = async (ctx: BotContext) => {
  if (!ctx.scene.session[WizardType.post]) {
    ctx.scene.session[WizardType.post] = {};
  }

  await ctx.reply(
    '📱 Выберите платформу:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Instagram', 'platform_instagram')],
      [Markup.button.callback('Telegram', 'platform_telegram')],
    ]),
  );
  return ctx.wizard.next();
};
