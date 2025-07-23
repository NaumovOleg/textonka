import { BotContext } from '@util';
import { isBackButtonPressed, processText } from '../helper';
import { DetailsContent, ExtraContent } from './content.drawer';

export const writeDetails = async (ctx: BotContext) => {
  const details = await processText(ctx, 'keyDetails');

  if (details) {
    ctx.wizard.next();
    return ExtraContent(ctx);
  }

  if (isBackButtonPressed(ctx)) {
    return ctx.wizard.selectStep(ctx.wizard.cursor - 1);
  }

  return DetailsContent(ctx);
};
