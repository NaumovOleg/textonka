import { I18n } from '@grammyjs/i18n';
import path from 'path';

export const locales = new I18n({
  defaultLocale: 'en',
  useSession: true,
  directory: path.resolve(__dirname, '../../locales'),
});
