import bot from '@bot';
import { AppDataSource } from '@infrastructure';
import 'reflect-metadata';

async function main() {
  await AppDataSource.initialize();
  console.log('✅ Data source initialized');
  bot.init();
}

main();
