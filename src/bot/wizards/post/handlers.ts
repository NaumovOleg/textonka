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

async function getButtonsValue<
  K extends keyof typeof PostWizardButtons,
  V extends keyof BotContext['scene']['session'][typeof WizardType.post_wizard],
  T extends BotContext['scene']['session'][typeof WizardType.post_wizard][V],
>(ctx: BotContext, data: { category: K; sessionKey: V }) {
  if (!ctx.has(callbackQuery('data'))) {
    return false;
  }

  const selectedKey = ctx.callbackQuery
    ?.data as keyof (typeof PostWizardButtons)[K];

  if (!selectedKey || !(selectedKey in PostWizardButtons[data.category])) {
    return ctx.scene.leave();
  }

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});
  const value = PostWizardButtons[data.category][selectedKey] as T;

  console.log('==========', data.category, data.sessionKey, value);

  ctx.scene.session[WizardType.post_wizard][data.sessionKey] = value;

  return true;
}

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
  const response = await getButtonsValue(ctx, {
    sessionKey: 'type',
    category: 'type',
  });

  if (!response) {
    return ctx.scene.leave();
  }
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
  const response = await getButtonsValue(ctx, {
    sessionKey: 'goal',
    category: 'goal',
  });

  if (!response) {
    return ctx.scene.leave();
  }

  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.mainIdea`));

  return ctx.wizard.next();
};

export const selectStyle = async (ctx: BotContext) => {
  // const userText = ctx.message.text;

  const styleButtons = Object.keys(PostWizardButtons.style).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('style', key)),
      key,
    ),
  );
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.style`),
    Markup.inlineKeyboard(splitByChunks(styleButtons, 2)),
  );

  return ctx.wizard.next();
};

export const selectEmotion = async (ctx: BotContext) => {
  await ctx.answerCbQuery();
  if (!ctx.has(callbackQuery('data'))) {
    return ctx.scene.leave();
  }

  const selectedKey = ctx.callbackQuery.data;
  if (!selectedKey || !(selectedKey in PostWizardButtons.style)) {
    return ctx.scene.leave();
  }

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});
  const style =
    PostWizardButtons.style[
      selectedKey as keyof typeof PostWizardButtons.style
    ];
  ctx.scene.session[WizardType.post_wizard].style = style;

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

  return ctx.wizard.next();
};

export const writeDetails = async (ctx: BotContext) => {
  await ctx.answerCbQuery();
  if (!ctx.has(callbackQuery('data'))) {
    return ctx.scene.leave();
  }

  const selectedKey = ctx.callbackQuery.data;
  if (!selectedKey || !(selectedKey in PostWizardButtons.emotion)) {
    return ctx.scene.leave();
  }

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});
  const emotion =
    PostWizardButtons.emotion[
      selectedKey as keyof typeof PostWizardButtons.emotion
    ];
  ctx.scene.session[WizardType.post_wizard].emotion = emotion;
  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.keyDetails`));

  return ctx.wizard.next();
};
