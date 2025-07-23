import {
  BotContext,
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
} from '../helper';

export const TypeContent = async (ctx: BotContext) => {
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
};

export const StyleContent = async (ctx: BotContext) => {
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
};

export const GoalContent = async (ctx: BotContext) => {
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
};

export const IdeaContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.mainIdea`),
  );
};

export const EmotionContent = async (ctx: BotContext) => {
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
};

export const DetailsContent = async (ctx: BotContext) => {
  await drawCurrentStep(ctx);
  await editOrReplyMessage(
    ctx,
    ctx.i18n.t(`wizards.post-wizard.text.keyDetails`),
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
