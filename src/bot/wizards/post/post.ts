import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import { selectType } from './handlers';

import { callbackQuery } from 'telegraf/filters';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post,

  selectType,
  async (ctx) => {
    if (!ctx.has(callbackQuery('data'))) {
      return ctx.scene.leave();
    }

    const callbackData = ctx.callbackQuery.data;

    if (callbackData.startsWith('platform_')) {
      const selected = callbackData.replace('platform_', '');
      ctx.wizard.state.platform = selected;
      await ctx.reply(`✅ Вы выбрали: ${selected}`);
    }

    return ctx.scene.leave();
  },
);
