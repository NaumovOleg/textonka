import {
  BotContext,
  POST_STEPS_COUNT,
  PostWizardButtons,
  PostWizardEmoji,
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
  editOrReplyMessage,
  getButtonsTranslatePrefix,
  getNavigationButtons,
} from '../helper';

export const WelcomeContent = async (ctx: BotContext) => {
  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.welcome`));
  return await drawCurrentStep(ctx, POST_STEPS_COUNT);
};

export const LanguageContent = async (ctx: BotContext) => {
  const typeButtons = Object.keys(PostWizardButtons.language).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('language', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.language`),
    Markup.inlineKeyboard(splitByChunks(typeButtons, 2)),
  );
};

export const TypeContent = async (ctx: BotContext) => {
  const typeButtons = Object.keys(PostWizardButtons.type).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('type', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  const buttons = splitByChunks(typeButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.type`),
    Markup.inlineKeyboard(buttons),
  );
};
export const GoalContent = async (ctx: BotContext) => {
  const goalButtons = Object.keys(PostWizardButtons.goal).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('goal', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  const buttons = splitByChunks(goalButtons, 2);
  buttons.push(getNavigationButtons(ctx));

  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.goal`),
    Markup.inlineKeyboard(buttons),
  );
};

export const StyleContent = async (ctx: BotContext) => {
  const styleButtons = Object.keys(PostWizardButtons.style).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('style', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  const buttons = splitByChunks(styleButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.style`),
    Markup.inlineKeyboard(buttons),
  );
};

export const IdeaContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx, POST_STEPS_COUNT);

  return editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.mainIdea`),
    Markup.inlineKeyboard(getNavigationButtons(ctx)),
  );
};

export const EmotionContent = async (ctx: BotContext) => {
  const emotionButtons = Object.keys(PostWizardButtons.emotion).map((key) =>
    Markup.button.callback(
      ctx.i18n.t(getButtonsTranslatePrefix('emotion', key)),
      key,
    ),
  );

  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  const buttons = splitByChunks(emotionButtons, 2);
  buttons.push(getNavigationButtons(ctx));
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.emotion`),
    Markup.inlineKeyboard(buttons),
  );
};

export const DetailsContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx, POST_STEPS_COUNT);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.keyDetails`),
    Markup.inlineKeyboard(getNavigationButtons(ctx)),
  );
};

export const ExtraContent = async (ctx: BotContext) => {
  const session = ctx.scene.session[WizardType.post_wizard];
  const extra = (session.extra ??= {
    emoji: false,
    hashtags: false,
    cta: false,
  });

  if (ctx.has(callbackQuery('data'))) {
    const key = ctx.callbackQuery.data as keyof PostWizardEmoji;
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

  await drawCurrentStep(ctx, POST_STEPS_COUNT);

  return editOrReplyMessage(ctx, text, options);
};

export const AIContent = async (ctx: BotContext, text: string) => {
  return editOrReplyMessage(ctx, text, {
    parse_mode: 'HTML',
  });
};
