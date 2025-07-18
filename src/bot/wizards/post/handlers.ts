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

  console.log(ctx.t(getButtonsTranslatePrefix('type', 'value')));

  const typeButtons = Object.entries(PostWizardButtons.type).map(
    ([key, value]) => [
      Markup.button.callback(
        ctx.t(getButtonsTranslatePrefix('type', value)),
        key,
      ),
    ],
  );
  await ctx.reply(
    '📱 Выберите ',
    Markup.keyboard(typeButtons).resize().oneTime(),
  );
  return ctx.wizard.next();
};
