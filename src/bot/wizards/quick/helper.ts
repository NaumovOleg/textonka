import Conf from '@conf';
import {
  Attachment,
  BotContext,
  QuickWizardButtons,
  QuickWizardGeneralButtons,
  WizardType,
} from '@util';
import { callbackQuery } from 'telegraf/filters';

export function isFinishButtonPressed(ctx: BotContext) {
  if (ctx.has(callbackQuery('data'))) {
    return QuickWizardGeneralButtons.finish_wizard === ctx.callbackQuery?.data;
  }
  return false;
}

export async function processButtons<
  K extends keyof typeof QuickWizardButtons,
  V extends
    keyof BotContext['scene']['session'][typeof WizardType.quick_wizard],
  T extends BotContext['scene']['session'][typeof WizardType.quick_wizard][V],
>(ctx: BotContext, data: { buttonGroup: K; sessionKey: V }) {
  if (!ctx.has(callbackQuery('data'))) {
    return null;
  }

  const selectedKey = ctx.callbackQuery
    ?.data as keyof (typeof QuickWizardButtons)[K];

  if (!selectedKey || !(selectedKey in QuickWizardButtons[data.buttonGroup])) {
    return null;
  }

  const value = QuickWizardButtons[data.buttonGroup][selectedKey] as T;

  ctx.scene.session[WizardType.quick_wizard][data.sessionKey] = value;

  return value;
}

export const clearMessageText = async (ctx: BotContext) => {
  if (ctx.chat?.id && ctx.message?.message_id) {
    return ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
  return null;
};

export const getAttachment = async (ctx: BotContext) => {
  if (!ctx.message) {
    return null;
  }

  let attachment: Attachment | undefined;

  if ('photo' in ctx.message && Array.isArray(ctx.message.photo)) {
    const photoArray = ctx.message.photo;
    const photo = photoArray[photoArray.length - 1];
    attachment = {
      fileId: photo?.file_id,
      type: 'photo',
      file: photo,
    };
  }
  if ('animation' in ctx.message) {
    attachment = {
      fileId: ctx.message.animation.file_id,
      type: 'animation',
      file: ctx.message.animation,
    };
  }
  if ('video' in ctx.message && ctx.message.video) {
    const size = ctx.message.video.file_size;
    attachment = {
      fileId: ctx.message.video.file_id,
      type: 'video',
      file: ctx.message.video,
    };
    if (size && size > Conf.MAX_AVAILABLE_VIDEO_SIZE) {
      attachment.error = 'wizards.quick-wizard.text.tooBigVideo';
    }
  }

  return attachment;
};
