import {
  BotContext,
  PostWizardButtons,
  PostWizardName,
  PostWizardSession,
  WizardType,
} from '@util';
import { Markup } from 'telegraf';

const getButtonsTranslatePrefix = (
  buttonGroup: keyof PostWizardSession,
  value: string,
) => {
  return `buttons.${PostWizardName}.${buttonGroup}.${value}`;
};

export const selectType = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] = {};

  const typeButtons = Object.values(PostWizardButtons.type).map((value) => [
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('type', value)),
      value,
    ),
  ]);
  await ctx.reply('📱 Выберите ', Markup.inlineKeyboard(typeButtons));
  return ctx.wizard.next();
};
