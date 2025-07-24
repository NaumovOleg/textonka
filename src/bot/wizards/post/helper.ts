import {
  BotContext,
  PostWizardButtons,
  PostWizardEmoji,
  PostWizardGeneralButtons,
  PostWizardName,
  PostWizardSession,
  splitByChunks,
  WizardType,
} from '@util';
import { Markup } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import { Convenience as tt } from 'telegraf/types';

export const extraPostChecklistItems: (keyof PostWizardEmoji)[] = [
  'emoji',
  'hashtags',
  'cta',
];

export const getCheckboxPrefix = (key: keyof PostWizardEmoji) =>
  `wizards.${PostWizardName}.buttons.extra.${key}`;

export const buildChecklistText = (
  extra: Partial<PostWizardEmoji>,
  t: (key: string) => string,
) => {
  const lines = extraPostChecklistItems.map(
    (key) => `${extra[key] ? '☑️' : '⬜️'} ${t(getCheckboxPrefix(key))}`,
  );

  return `${t(`wizards.${PostWizardName}.text.extra`)}\n\n${lines.join('\n')}`;
};

export const buildChecklistButtons = (
  extra: Partial<PostWizardEmoji>,
  t: (key: string) => string,
) => {
  const buttonsList = extraPostChecklistItems.map((key) =>
    Markup.button.callback(
      `${extra[key] ? '☑️' : '⬜️'} ${t(getCheckboxPrefix(key))}`,
      key,
    ),
  );

  const buttons = splitByChunks(buttonsList, 2);

  buttons.push([
    Markup.button.callback(
      t(`wizards.${PostWizardName}.buttons.general.submit`),
      PostWizardGeneralButtons.submit_extra,
    ),
  ]);
  return buttons;
};

export const getButtonsTranslatePrefix = (
  buttonGroup: keyof PostWizardSession,
  value: string,
) => `wizards.${PostWizardName}.buttons.${buttonGroup}.${value}`;

export async function processButtons<
  K extends keyof typeof PostWizardButtons,
  V extends keyof BotContext['scene']['session'][typeof WizardType.post_wizard],
  T extends BotContext['scene']['session'][typeof WizardType.post_wizard][V],
>(ctx: BotContext, data: { buttonGroup: K; sessionKey: V }) {
  if (!ctx.has(callbackQuery('data'))) {
    return null;
  }

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

export async function processText<
  T extends keyof Pick<PostWizardSession, 'mainIdea' | 'keyDetails'>,
>(ctx: BotContext, property: T) {
  if (!ctx.message || !('text' in ctx.message)) {
    return null;
  }

  const inputText = ctx.message.text;

  ctx.scene.session[WizardType.post_wizard][property] = inputText;

  return inputText;
}

export const drawCurrentStep = async (ctx: BotContext, max: number) => {
  const text = ctx.i18n.t(`wizards.${PostWizardName}.common.step`, {
    step: ctx.wizard.cursor,
    max,
  });
  if (!ctx.scene.state.stepMessageId) {
    const stepMessage = await ctx.reply(text).catch();
    ctx.scene.state.stepMessageId = stepMessage.message_id;
    return stepMessage;
  } else {
    return ctx.telegram
      .editMessageText(
        ctx?.chat?.id,
        ctx.scene.state.stepMessageId,
        undefined,
        text,
      )
      .catch((e) => {
        if (!e.message.includes('message is not modified')) throw e;
      });
  }
};

export function isBackButtonPressed(ctx: BotContext) {
  if (ctx.has(callbackQuery('data'))) {
    return PostWizardGeneralButtons.previous_step === ctx.callbackQuery?.data;
  }
  return false;
}

export async function renderChecklist(ctx: BotContext) {
  await processText(ctx, 'keyDetails');

  const session = ctx.scene.session[WizardType.post_wizard];
  const extra = session.extra ?? {};
  const t = ctx.i18n.t.bind(ctx.i18n);

  const text = buildChecklistText(extra, t);
  const buttons = buildChecklistButtons(extra, t);

  if (ctx.updateType !== 'callback_query') {
    await ctx
      .reply(text, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard(buttons),
      })
      .catch();
  }
}

export const editOrReplyMessage = async (
  ctx: BotContext,
  text: string,
  options?: tt.ExtraEditMessageText,
) => {
  return ctx.telegram
    .editMessageText(
      ctx.chat?.id,
      ctx.scene.state.rootMessageId,
      undefined,
      text,
      options,
    )
    .catch((err) => {
      if (!err?.description?.includes('message is not modified')) {
        return ctx.reply(text, options);
      }
    });
};

export const getNavigationButtons = (ctx: BotContext) => {
  return [
    Markup.button.callback(
      ctx.i18n.t(`wizards.${PostWizardName}.buttons.general.previous_step`),
      PostWizardGeneralButtons.previous_step,
    ),
    Markup.button.callback(
      ctx.i18n.t(`wizards.${PostWizardName}.buttons.general.finish`),
      PostWizardGeneralButtons.finish_wizard,
    ),
  ];
};

export const clearMessageText = async (ctx: BotContext) => {
  if (ctx.chat?.id && ctx.message?.message_id) {
    return ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
  return null;
};
