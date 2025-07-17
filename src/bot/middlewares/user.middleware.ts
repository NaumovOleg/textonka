import { User } from '@entities';
import { createUserUC, findUserUC } from '@shared/useCases';
import { MiddlewareFn, type Context } from 'telegraf';

interface CustomState {
  user?: User;
}

export interface MyContext extends Context {
  state: CustomState;
}

export const userMiddleware: MiddlewareFn<MyContext> = async (ctx, next) => {
  if (!ctx.from) return next();

  let user = await findUserUC.execute({ telegram_id: ctx.from.id });

  if (!user) {
    const { id, ...data } = ctx.from;
    user = await createUserUC.execute({ ...data, telegram_id: id });
  }

  ctx.state.user = user;

  return next();
};
