import dotenv from 'dotenv';
dotenv.config();

class Config {
  BOT_TOKEN = process.env.BOT_TOKEN ?? '';
  LAUNCH_STATE = process.env.LAUNCH_STATE ?? 'local';
  WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN ?? '';
}

export default new Config();
