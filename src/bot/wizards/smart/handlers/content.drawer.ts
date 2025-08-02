import {
  BotContext,
  SMART_WIZARD_STEPS_COUNT,
  SmartWizardButtons,
  SmartWizardEmoji,
  SmartWizardGeneralButtons,
  SmartWizardName,
  splitByChunks,
  WizardType,
} from '@util';
import { Markup } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { Convenience as tt } from 'telegraf/types';
import {
  buildChecklistButtons,
  buildChecklistText,
  drawCurrentStep,
  getButtonsTranslatePrefix,
  getNavigationButtons,
} from '../helper';

import { editOrReplyMessage } from '../../general.content.drawer';

export const WelcomeContent = async (ctx: BotContext) => {
  await ctx.reply(ctx.i18n.t(`wizards.smart-wizard.text.welcome`));
  return await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
};

export const LanguageContent = async (ctx: BotContext) => {
  const languageButtons = Object.keys(SmartWizardButtons.language).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('language', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  const buttons = splitByChunks(languageButtons, 2);
  buttons.push([
    Markup.button.callback(
      ctx.i18n.t(`wizards.${SmartWizardName}.buttons.general.finish`),
      SmartWizardGeneralButtons.finish_wizard,
    ),
  ]);
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.language`),
    Markup.inlineKeyboard(buttons),
  );
};

export const TypeContent = async (ctx: BotContext) => {
  const typeButtons = Object.keys(SmartWizardButtons.type).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('type', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  const buttons = splitByChunks(typeButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.type`),
    Markup.inlineKeyboard(buttons),
  );
};
export const GoalContent = async (ctx: BotContext) => {
  const goalButtons = Object.keys(SmartWizardButtons.goal).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('goal', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  const buttons = splitByChunks(goalButtons, 2);
  buttons.push(getNavigationButtons(ctx));

  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.goal`),
    Markup.inlineKeyboard(buttons),
  );
};

export const StyleContent = async (ctx: BotContext) => {
  const styleButtons = Object.keys(SmartWizardButtons.style).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('style', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  const buttons = splitByChunks(styleButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.style`),
    Markup.inlineKeyboard(buttons),
  );
};

export const IdeaContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);

  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.mainIdea`),
    Markup.inlineKeyboard(getNavigationButtons(ctx)),
  );
};

export const EmotionContent = async (ctx: BotContext) => {
  const emotionButtons = Object.keys(SmartWizardButtons.emotion).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('emotion', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  const buttons = splitByChunks(emotionButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.emotion`),
    Markup.inlineKeyboard(buttons),
  );
};

export const DetailsContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.smart-wizard.text.keyDetails`),
    Markup.inlineKeyboard(getNavigationButtons(ctx)),
  );
};

export const ExtraContent = async (ctx: BotContext) => {
  const session = ctx.scene.session[WizardType.smart_wizard];
  const extra = (session.extra ??= {
    emoji: false,
    hashtags: false,
    cta: false,
  });

  if (ctx.has(callbackQuery('data'))) {
    const key = ctx.callbackQuery.data as keyof SmartWizardEmoji;
    if (key in extra) {
      extra[key] = !extra[key];
    }
  }

  const t = ctx.i18n.t.bind(ctx.i18n);
  const text = buildChecklistText(extra, t);
  const buttons = buildChecklistButtons(extra, t);
  buttons.push(getNavigationButtons(ctx));
  const options: tt.ExtraEditMessageText = {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard(buttons),
  };

  await drawCurrentStep(ctx, SMART_WIZARD_STEPS_COUNT);

  return editOrReplyMessage(ctx, text, options);
};

export const AIContent = async (ctx: BotContext, text: string) => {
  return editOrReplyMessage(ctx, text, {
    parse_mode: 'HTML',
  });
};
