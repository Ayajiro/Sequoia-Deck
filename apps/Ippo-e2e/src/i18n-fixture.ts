import { test as base } from '@playwright/test';
import { createI18nFixture } from 'playwright-i18next-fixture';
import { resources } from './i18n-resources.js';

const i18nFixture = createI18nFixture({
  options: {
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    resources: {
      en: resources.en,
      'zh-TW': resources['zh-TW'],
      ja: resources.ja,
    },
    // The namespace is 'translation'
    ns: ['translation'],
    defaultNS: 'translation',
  },
  // Run as auto fixture to be available through all tests
  auto: true,
});

export const test = base.extend(i18nFixture);
export { expect } from '@playwright/test'; 