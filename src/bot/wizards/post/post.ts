import { BotContext, WizardType } from '@util';
import { Scenes } from 'telegraf';
import { selectType } from './handlers';

import { callbackQuery } from 'telegraf/filters';

export const PostWizard = new Scenes.WizardScene<BotContext>(
  WizardType.post_wizard,

  selectType,
  async (ctx) => {
    console.log(
      '=======',
      JSON.stringify(ctx.callbackQuery, null, 2),
      JSON.stringify(ctx.message, null, 2),
    );

    if (ctx.has(callbackQuery('data'))) {
      // return ctx.scene.leave();
      console.log(ctx.callbackQuery?.data);
    }

    // const callbackData = ctx.callbackQuery.data;

    // console.log(callbackData);

    // await ctx.reply(`✅ Вы выбрали: ${callbackData}`);

    return ctx.scene.leave();
  },
);
