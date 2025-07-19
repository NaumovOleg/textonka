import {
  BotContext,
  PostWizardButtons,
  PostWizardName,
  PostWizardSession,
  WizardType,
  splitByChunks,
} from '@util';
import { Markup } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';

const getButtonsTranslatePrefix = (
  buttonGroup: keyof PostWizardSession,
  value: string,
) => `wizards.${PostWizardName}.buttons.${buttonGroup}.${value}`;

export const selectTypeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] = {};

  const typeButtons = Object.keys(PostWizardButtons.type).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('type', key)),
      key,
    ),
  );
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.type`),
    Markup.inlineKeyboard(splitByChunks(typeButtons, 2)),
  );
  return ctx.wizard.next();
};

export const selectGoalHandler = async (ctx: BotContext) => {
  if (!ctx.has(callbackQuery('data'))) {
    return ctx.scene.leave();
  }
  await ctx.answerCbQuery();
  const selectedKey = ctx.callbackQuery.data;
  if (!selectedKey || !(selectedKey in PostWizardButtons.type)) {
    return ctx.scene.leave();
  }

  const type =
    PostWizardButtons.type[selectedKey as keyof typeof PostWizardButtons.type];
  ctx.scene.session[WizardType.post_wizard].type = type;

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});

  const goalButtons = Object.keys(PostWizardButtons.goal).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('goal', key)),
      key,
    ),
  );
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.goal`),
    Markup.inlineKeyboard(splitByChunks(goalButtons, 2)),
  );

  return ctx.wizard.next();
};

export const writeIdea = async (ctx: BotContext) => {
  if (!ctx.has(callbackQuery('data'))) {
    return ctx.scene.leave();
  }
  await ctx.answerCbQuery();
  const selectedKey = ctx.callbackQuery.data;
  if (!selectedKey || !(selectedKey in PostWizardButtons.goal)) {
    return ctx.scene.leave();
  }

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});
  const goal =
    PostWizardButtons.goal[selectedKey as keyof typeof PostWizardButtons.goal];
  ctx.scene.session[WizardType.post_wizard].goal = goal;

  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.mainIdea`));

  return ctx.wizard.next();
};

export const selectStyle = async (ctx: BotContext) => {
  if (!ctx.message) {
    await ctx.reply('⛔️ Пожалуйста, отправьте текстовое сообщение.');
    return ctx.scene.leave();
  }

  const styleButtons = Object.keys(PostWizardButtons.style).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('style', key)),
      key,
    ),
  );
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.goal`),
    Markup.inlineKeyboard(splitByChunks(styleButtons, 2)),
  );

  return ctx.wizard.next();
};

export const selectEmotion = async (ctx: BotContext) => {
  if (!ctx.message) {
    await ctx.reply('⛔️ Пожалуйста, отправьте текстовое сообщение.');
    return ctx.scene.leave();
  }

  const emotionButtons = Object.keys(PostWizardButtons.emotion).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('emotion', key)),
      key,
    ),
  );
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.emotion`),
    Markup.inlineKeyboard(splitByChunks(emotionButtons, 2)),
  );

  return ctx.scene.leave();
};
