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
  QUICK_WIZARD_FREE_GENERATIONS = parseInt(
    process.env.QUICK_WIZARD_FREE_GENERATIONS ?? '5',
  );
  AI_API_KEY = process.env.AI_API_KEY ?? '';
  NODE_ENV = process.env.NODE_ENV ?? 'dev';
  AWS_ACCOUNT = process.env.AWS_ACCOUNT ?? '';
  REGION = process.env.REGION ?? 'eu-west-1';
  WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? '';
  PAYMENT_TOKEN = process.env.PAYMENT_TOKEN ?? '';
  IMAGE_AI_MODEL = process.env.IMAGE_AI_MODEL ?? '';
  TEXT_AI_MODEL = process.env.TEXT_AI_MODEL ?? '';
  MAX_AVAILABLE_VIDEO_SIZE = parseInt(
    process.env.MAX_AVAILABLE_VIDEO_SIZE ?? '300',
  );
}

export default new Config();
