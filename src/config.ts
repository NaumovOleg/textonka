import 'dotenv/config';

class Config {
  BOT_TOKEN = process.env.BOT_TOKEN ?? '';
  LAUNCH_STATE = process.env.LAUNCH_STATE ?? 'local';
  WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN ?? '';
  DATABASE_USER = process.env.DATABASE_USER ?? '';
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? '';
  DATABASE_URL = process.env.DATABASE_URL ?? '';
  DATABASE_NAME = `textonica_${process.env.NODE_ENV}`;
}

export default new Config();
