import { BotContext } from '@util';
import { Scenes } from 'telegraf';
import { PostWizard } from './smart';

export const stage = new Scenes.Stage<BotContext>([PostWizard]);
