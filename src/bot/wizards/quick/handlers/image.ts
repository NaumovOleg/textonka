import { BotContext } from '@util';
import { ByeContent } from '../../general.content.drawer';
import { isFinishButtonPressed } from '../helper';
import { ImageContent } from './content.drawer';

export const imageHandler = async (ctx: BotContext) => {
  if (isFinishButtonPressed(ctx)) {
    await ByeContent(ctx);
    return ctx.scene.leave();
  }

  return ImageContent(ctx);
};
