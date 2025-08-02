import { BotContext, QuickWizardGeneralButtons, QuickWizardName } from '@util';
import { Markup } from 'telegraf';

export const WelcomeContent = async (ctx: BotContext) => {
  const finishButton = Markup.button.callback(
    ctx.i18n.t(`wizards.${QuickWizardName}.buttons.general.finish`),
    QuickWizardGeneralButtons.finish_wizard,
  );

  return ctx.reply(ctx.i18n.t(`wizards.${QuickWizardName}.welcome`), {
    parse_mode: 'HTML',
    reply_markup: Markup.inlineKeyboard([finishButton]).reply_markup,
  });
};
