import { createI18n } from 'react-router-i18n';

const locales = ['en', 'fr'];

const translations = {
  en: {
    navbar: {
      search: 'Search',
      browse: 'Browse',
      preface: 'Preface',
    },
    header: {
      title: 'English-Greek Dictionary',
      subtitle: 'A Vocabulary of the Attic Language',
      author: 'S.C. Woodhouse',
    },
  },
  fr: {
    navbar: {
      search: 'Chercher',
      browse: 'Feuilleter',
      preface: 'Préface',
    },
  },
};

const I18n = createI18n(
  locales,
  translations,
);

export default I18n;
