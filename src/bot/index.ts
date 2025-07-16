import Config from '@conf';
import { Textonka } from './bot';

const bot = new Textonka(Config.BOT_TOKEN);
bot.init();

export default bot;
