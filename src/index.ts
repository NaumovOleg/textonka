import 'reflect-metadata';
import bot from '@bot';
import { AppDataSource } from '@infrastructure';
import { createUserUC } from '@useCases';

async function main() {
  const resp = await AppDataSource.initialize();
  console.log('✅ Data source initialized');

  await createUserUC.execute('test', 'test');
  bot.start((ctx) => ctx.reply(`Привет, ${ctx.from.first_name}`));

  // Локальный запуск через polling
  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    await bot.launch();
    console.log('🚀 Bot launched locally');
  }
}

main();
