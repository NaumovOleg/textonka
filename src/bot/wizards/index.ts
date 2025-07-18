import { BotContext } from '@util';
import { Scenes } from 'telegraf';
import { PostWizard } from './post';

export const stage = new Scenes.Stage<BotContext>([PostWizard]);
