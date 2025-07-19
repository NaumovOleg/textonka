import path from 'path';
import I18n from 'telegraf-i18n';

export const locales = new I18n({
  defaultLanguage: 'uk',
  defaultLanguageOnMissing: true,
  useSession: true,
  directory: path.resolve(__dirname, '../../locales'),
});
