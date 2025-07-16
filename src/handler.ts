import bot from '@bot';
import http from 'serverless-http';
import { AppDataSource } from '@infrastructure';

export const handler = async (event: any, context: any) => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('✅ Data source initialized');
    } catch (err) {
      console.error('❌ DB initialization failed:', err);
      return {
        statusCode: 500,
        body: 'DB init error',
      };
    }

    return http(bot.webhookCallback('/telegraf'));
  }
};
