import { BotContext } from '@util';
export const ai = async (ctx: BotContext) => {
  return ctx.scene.leave();
};
