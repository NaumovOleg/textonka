import {
  BotContext,
  QuickWizardButtons,
  QuickWizardGeneralButtons,
  QuickWizardName,
  splitByChunks,
} from '@util';
import { Markup } from 'telegraf';

const buildFinishButton = (ctx: BotContext) => {
  return Markup.button.callback(
    ctx.i18n.t(`wizards.${QuickWizardName}.buttons.general.finish`),
    QuickWizardGeneralButtons.finish_wizard,
  );
};

export const WelcomeContent = async (ctx: BotContext) => {
  const text = ctx.i18n.t(`wizards.${QuickWizardName}.welcome`);
  return ctx.reply(text, { parse_mode: 'HTML' });
};

export const LanguageContent = async (ctx: BotContext) => {
  const languageButtons = Object.keys(QuickWizardButtons.language).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(`wizards.${QuickWizardName}.buttons.language.${key}`),
      key,
    ),
  );
  const finishButton = buildFinishButton(ctx);
  const buttons = splitByChunks(languageButtons, 2);
  buttons.push([finishButton]);

  return ctx.reply(ctx.i18n.t(`wizards.${QuickWizardName}.text.language`), {
    parse_mode: 'HTML',
    reply_markup: Markup.inlineKeyboard(buttons).reply_markup,
  });
};

export const ImageContent = async (ctx: BotContext) => {
  return ctx.reply(ctx.i18n.t(`wizards.${QuickWizardName}.welcome`), {
    parse_mode: 'HTML',
  });
};
