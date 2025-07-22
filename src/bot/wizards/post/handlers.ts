import {
  BotContext,
  PostWizardButtons,
  PostWizardEmoji,
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

async function processButtons<
  K extends keyof typeof PostWizardButtons,
  V extends keyof BotContext['scene']['session'][typeof WizardType.post_wizard],
  T extends BotContext['scene']['session'][typeof WizardType.post_wizard][V],
>(ctx: BotContext, data: { buttonGroup: K; sessionKey: V }) {
  if (!ctx.has(callbackQuery('data'))) {
    return null;
  }

  await ctx.answerCbQuery();

  const selectedKey = ctx.callbackQuery
    ?.data as keyof (typeof PostWizardButtons)[K];

  if (!selectedKey || !(selectedKey in PostWizardButtons[data.buttonGroup])) {
    return null;
  }

  await ctx.editMessageReplyMarkup(undefined).catch(() => {});
  const value = PostWizardButtons[data.buttonGroup][selectedKey] as T;

  ctx.scene.session[WizardType.post_wizard][data.sessionKey] = value;

  return value;
}

async function processText<
  T extends keyof Pick<PostWizardSession, 'mainIdea' | 'keyDetails'>,
>(ctx: BotContext, property: T) {
  if (!ctx.message || !('text' in ctx.message)) {
    return null;
  }

  await ctx.answerCbQuery();

  const inputText = ctx.message.text;

  ctx.scene.session[WizardType.post_wizard][property] = inputText;

  return inputText;
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
  const type = await processButtons(ctx, {
    sessionKey: 'type',
    buttonGroup: 'type',
  });

  if (!type) {
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
  const goal = await processButtons(ctx, {
    sessionKey: 'goal',
    buttonGroup: 'goal',
  });

  if (!goal) {
    return ctx.scene.leave();
  }

  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.mainIdea`));

  return ctx.wizard.next();
};

export const selectStyle = async (ctx: BotContext) => {
  const idea = await processText(ctx, 'mainIdea');
  if (!idea) {
    return ctx.scene.leave();
  }
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
  const style = processButtons(ctx, {
    buttonGroup: 'style',
    sessionKey: 'style',
  });

  if (!style) {
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

  return ctx.wizard.next();
};

export const writeDetails = async (ctx: BotContext) => {
  const emotion = await processButtons(ctx, {
    buttonGroup: 'emotion',
    sessionKey: 'emotion',
  });

  if (!emotion) {
    return ctx.scene.leave();
  }

  await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.keyDetails`));

  return ctx.wizard.next();
};

const checklistItems: (keyof PostWizardEmoji)[] = [
  'emoji',
  'hashtags',
  'cta',
  'clean',
];

const getCheckboxPrefix = (key: keyof PostWizardEmoji) =>
  `wizards.${PostWizardName}.buttons.extra.${key}`;

async function renderChecklist(ctx: any) {
  const extra = ctx.scene.session[WizardType.post_wizard].extra ?? {};
  const lines = checklistItems.map((key) => {
    return `${extra[key] ? '☑️' : '⬜️'} ${ctx.i18n.t(getCheckboxPrefix(key))}`;
  });

  const buttons = checklistItems.map((key) => {
    const label = ctx.i18n.t(getCheckboxPrefix(key));
    const checked = extra[key];
    return [Markup.button.callback(`${checked ? '☑️' : '⬜️'} ${label}`, key)];
  });

  buttons.push([Markup.button.callback('✔️ Submit', '__submit_extra')]);

  const text = `🧩 ${ctx.i18n.t(`wizards.post-wizard.text.extra`)}\n\n${lines.join('\n')}`;

  await ctx.reply(text, {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard(buttons),
  });
  await ctx.wizard.next();
}

export const handleExtraSelection = async (ctx: BotContext) => {
  if (!ctx.has(callbackQuery('data'))) return;

  const extra = ctx.scene.session[WizardType.post_wizard].extra!;

  if (ctx.callbackQuery.data === '__submit_extra') {
    await ctx.answerCbQuery();
    await ctx.reply(ctx.i18n.t(`wizards.post-wizard.text.submitted_extra`));
    return ctx.wizard.next();
  }

  const data = ctx.callbackQuery.data as keyof Partial<PostWizardEmoji>;
  const isAnyExtraSelected = Object.values(extra).some((v) => v);

  if (checklistItems.includes(data)) {
    extra[data] = !extra[data];
    console.log('=======', extra);
    await ctx.answerCbQuery();
    await renderChecklist(ctx);
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }
};

export const selectExtraOptions = async (ctx: BotContext) => {
  if (!ctx.scene.session[WizardType.post_wizard]) {
    ctx.scene.session[WizardType.post_wizard] = {};
  }
  if (!ctx.scene.session[WizardType.post_wizard].extra) {
    ctx.scene.session[WizardType.post_wizard].extra = {
      emoji: false,
      hashtags: false,
      cta: false,
      clean: false,
    };
  }

  return renderChecklist(ctx);
};
