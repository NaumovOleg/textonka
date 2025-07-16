import 'reflect-metadata';
import bot from '@bot';
import { AppDataSource } from '@infrastructure';
import { createUserUC } from '@useCases';

async function main() {
  await AppDataSource.initialize();
  console.log('✅ Data source initialized');
  bot.init();
}

main();
