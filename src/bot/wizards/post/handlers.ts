import {
  BotContext,
  PostWizardButtons,
  PostWizardEmoji,
  PostWizardGeneralButtons,
  PostWizardName,
  WizardType,
  splitByChunks,
} from '@util';
import { Markup } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { Convenience as tt } from 'telegraf/types';
import {
  buildChecklistButtons,
  buildChecklistText,
  drawCurrentStep,
  editOrReplyMessage,
  getButtonsTranslatePrefix,
  isBackButtonPressed,
  processButtons,
  processText,
} from './helper';

export const selectTypeHandler = async (ctx: BotContext) => {
  ctx.scene.session[WizardType.post_wizard] = {};

  const typeButtons = Object.keys(PostWizardButtons.type).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('type', key)),
      key,
    ),
  );

  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.welcome`));
  await drawCurrentStep(ctx);

  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.type`),
    Markup.inlineKeyboard(splitByChunks(typeButtons, 2)),
  );

  return ctx.wizard.next();
};

export const selectGoalHandler = async (ctx: BotContext) => {
  console.log('=====================> selectGoalHandler', ctx.updateType);
  if (ctx.updateType !== 'callback_query') {
    return;
  }
  await processButtons(ctx, {
    sessionKey: 'type',
    buttonGroup: 'type',
  });

  if (isBackButtonPressed(ctx)) {
    const resp = await ctx.wizard.back();
    return resp;
  }

  const goalButtons = Object.keys(PostWizardButtons.goal).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('goal', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.goal`),
    Markup.inlineKeyboard(splitByChunks(goalButtons, 2)),
  );

  return ctx.wizard.next();
};

export const writeIdea = async (ctx: BotContext) => {
  console.log('=====================> writeIdea', ctx.updateType);
  if (ctx.updateType !== 'callback_query') {
    return;
  }
  const goal = await processButtons(ctx, {
    sessionKey: 'goal',
    buttonGroup: 'goal',
  });

  if (!goal) {
    return ctx.scene.leave();
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.mainIdea`),
  );

  return ctx.wizard.next();
};

export const selectStyle = async (ctx: BotContext) => {
  console.log('=====================> selectStyle', ctx.updateType);
  if (ctx.updateType !== 'message') {
    return;
  }
  await processText(ctx, 'mainIdea');

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  const styleButtons = Object.keys(PostWizardButtons.style).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('style', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx);
  await ctx.reply(
    ctx.i18n.t(`wizards.post-wizard.text.style`),
    Markup.inlineKeyboard(splitByChunks(styleButtons, 2)),
  );

  return ctx.wizard.next();
};

export const selectEmotion = async (ctx: BotContext) => {
  console.log('=====================> selectEmotion');
  await processButtons(ctx, { buttonGroup: 'style', sessionKey: 'style' });
  if (ctx.updateType !== 'callback_query') {
    return;
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  const emotionButtons = Object.keys(PostWizardButtons.emotion).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('emotion', key)),
      key,
    ),
  );
  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.emotion`),
    Markup.inlineKeyboard(splitByChunks(emotionButtons, 2)),
  );

  return ctx.wizard.next();
};

export const writeDetails = async (ctx: BotContext) => {
  console.log('=====================> writeDetails');
  await processButtons(ctx, {
    buttonGroup: 'emotion',
    sessionKey: 'emotion',
  });

  if (ctx.updateType !== 'callback_query') {
    return;
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.keyDetails`),
  );

  return ctx.wizard.next();
};

export const handleExtraSelection = async (ctx: BotContext) => {
  let data;
  if (ctx.has(callbackQuery('data'))) {
    data = ctx.callbackQuery.data as string;
  }

  if (ctx.updateType === 'message') {
    return;
  }

  const session = ctx.scene.session[WizardType.post_wizard];
  const extra = (session.extra ??= {});

  if (data === PostWizardGeneralButtons.submit_extra) {
    await ctx.reply(
      ctx.i18n.t(`wizards.${PostWizardName}.text.submitted_extra`),
    );
    return ctx.wizard.next();
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  const key = data as keyof PostWizardEmoji;
  extra[key] = !extra[key];

  const t = ctx.i18n.t.bind(ctx.i18n);
  const text = buildChecklistText(extra, t);
  const options: tt.ExtraEditMessageText = {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard(buildChecklistButtons(extra, t)),
  };

  if (ctx.updateType === 'callback_query') {
    return ctx.editMessageText(text, options);
  } else {
    await drawCurrentStep(ctx);
    return ctx.reply(text, options);
  }
};

export const generateResponse = async (ctx: BotContext) => {
  return ctx.scene.leave();
};
