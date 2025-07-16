import { UserT } from '@util';

export class User {
  telegram_id: number;
  is_bot: boolean;
  first_name: string;
  language_code: string;
  id: string;

  constructor(data: UserT) {
    this.telegram_id = data.telegram_id;
    this.is_bot = data.is_bot;
    this.first_name = data.first_name;
    this.language_code = data.language_code;
    this.id = data.id;
  }
}
