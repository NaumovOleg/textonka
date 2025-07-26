import I18n from 'telegraf-i18n';
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import uk from '../../locales/uk.json';

const i18n = new I18n({
  defaultLanguage: 'uk',
  defaultLanguageOnMissing: true,
  useSession: true,
  // directory: path.resolve(__dirname, localesPaths),
});

i18n.loadLocale('ru', ru);
i18n.loadLocale('en', en);
i18n.loadLocale('uk', uk);

export const locales = i18n;
