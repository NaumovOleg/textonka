import { createUserUC, findUserUC } from '@shared/useCases';
import { BotContext } from '@util';
import { MiddlewareFn } from 'telegraf';

export const userMiddleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (!ctx.from) return next();

  let user = await findUserUC.execute({ telegram_id: ctx.from.id });

  if (!user) {
    const { id, ...data } = ctx.from;
    user = await createUserUC.execute({ ...data, telegram_id: id });
  }

  ctx.state.user = user;

  return next();
};
