import Conf from '@conf';
import { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const token = headers['x-telegram-bot-api-secret-token']?.[0]?.value;

  if (token !== Conf.WEBHOOK_SECRET) {
    return {
      status: '403',
      statusDescription: 'Forbidden',
      body: 'Invalid Telegram secret token',
    };
  }

  return request;
};
