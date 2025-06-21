import { createI18nFixture } from 'playwright-i18next-fixture';
import en from '@i18n/en.json';
import ja from '@i18n/ja.json';
import zhTW from '@i18n/zh-TW.json';

export const i18nFixture = createI18nFixture({
  options: {
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    resources: {
      en,
      zhTW,
      ja,
    },
    ns: ['translation'],
    defaultNS: 'translation',
  },
  // Run as auto fixture to be available through all tests
  auto: true,
});
