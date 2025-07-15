import bot from '@bot';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const bodyParsed = JSON.parse(event.body!);
  console.log('bodyParsed', bodyParsed);
  await new Promise((resolve) => {
    bot.handleUpdate(bodyParsed);
    setTimeout(() => {
      resolve('global timeout');
    }, 30000);
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'function executed successfully' }),
  };
};
