import { User as UserT } from '@util';

export class User {
  telegram_id: number;
  is_bot: boolean;
  first_name: string;
  language_code?: string;
  id: string;
  added_to_attachment_menu?: boolean;
  username?: string;
  is_premium?: boolean;
  last_name?: string;

  constructor(data: UserT) {
    this.telegram_id = data.telegram_id;
    this.is_bot = data.is_bot;
    this.first_name = data.first_name;
    this.language_code = data.language_code;
    this.added_to_attachment_menu = data.added_to_attachment_menu;
    this.username = data.username;
    this.is_premium = data.is_premium;
    this.last_name = data.last_name;
    this.id = data.id;
  }
}
