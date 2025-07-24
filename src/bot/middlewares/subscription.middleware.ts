import { createSubscriptionUC, findSubscriptionUC } from '@shared/useCases';
import { BotContext } from '@util';
import { MiddlewareFn } from 'telegraf';

export const subscriptionMiddleware: MiddlewareFn<BotContext> = async (
  ctx,
  next,
) => {
  if (!ctx.from) return next();

  const user = ctx.state.user?.id;

  let subscription = await findSubscriptionUC.execute({ user });

  if (!subscription) {
    subscription = await createSubscriptionUC.execute({ user });
  }

  ctx.state.subscription = subscription;

  return next();
};
