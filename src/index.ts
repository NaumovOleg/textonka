import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error('BOT_TOKEN is not set in .env');
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  console.log('ddddd');

  const user = ctx.from;
  console.log('User info:', user);

  ctx.reply('👋 Hello!');
});
bot.help((ctx) => ctx.reply('Just say hi!'));
bot.on('text', (ctx) => {
  const user = ctx.from;
  console.log('User info:', user);

  ctx.reply(`You said: ${ctx.message.text}`);
});

bot.launch().then(() => {
  console.log('🚀 Bot started');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
