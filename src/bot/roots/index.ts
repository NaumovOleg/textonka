import type { BotContext } from '@util';
import { Composer } from 'telegraf';
import { startRoute } from './start';

const root = new Composer<BotContext>();

root.use(startRoute);

export default root;
