import bot from '@bot';
import { AppDataSource } from '@infrastructure';
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Buffer } from 'buffer';

const getMessage = (event: APIGatewayProxyEventV2) => {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body!, 'base64').toString()
    : event.body!;
  return JSON.parse(rawBody);
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
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
  }

  if (!bot.initialized) {
    bot.init();
    console.log('✅ Bot initialized');
  }

  const message = getMessage(event);
  console.log('🔔 Telegram Update:', JSON.stringify(message, null, 2));

  try {
    await bot.handleUpdate(message);
    return { statusCode: 200, body: 'ok' };
  } catch (err: any) {
    return { statusCode: 500, body: err.message };
  }
};
