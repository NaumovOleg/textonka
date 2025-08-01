import 'dotenv/config';

class Config {
  BOT_TOKEN = process.env.BOT_TOKEN ?? '';
  LAUNCH_STATE = process.env.LAUNCH_STATE;
  WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN ?? '';
  DATABASE_USER = process.env.DATABASE_USER ?? '';
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? '';
  DATABASE_URL = process.env.DATABASE_URL ?? '';
  DATABASE_NAME = `textonica_${process.env.NODE_ENV}`;
  SMART_WIZARD_FREE_GENERATIONS = parseInt(
    process.env.SMART_WIZARD_FREE_GENERATIONS ?? '5',
  );
  AI_API_KEY = process.env.AI_API_KEY ?? '';
  AI_MODEL = process.env.AI_MODEL ?? '';
  NODE_ENV = process.env.NODE_ENV ?? 'dev';
  AWS_ACCOUNT = process.env.AWS_ACCOUNT ?? '';
  REGION = process.env.REGION ?? 'eu-west-1';
  WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? '';
  PAYMENT_TOKEN = process.env.PAYMENT_TOKEN ?? '';
}

export default new Config();
