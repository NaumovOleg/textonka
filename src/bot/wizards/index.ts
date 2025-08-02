import { BotContext } from '@util';
import { Scenes } from 'telegraf';
import { QuickWizard } from './quick';
import { SmartWizard } from './smart';

export const stage = new Scenes.Stage<BotContext>([SmartWizard, QuickWizard]);
