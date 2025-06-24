import { test as base, expect } from '@playwright/test';
import { i18nFixture } from './i18n-fixture';

const test = base.extend(i18nFixture);

test('full user flow', async ({ page, i18n }) => {
  await page.goto('/');

  // 1. Start a new task
  const taskName = `My New Task ${Date.now()}`;
  await page.getByPlaceholder(i18n.t('placeholder')).fill(taskName);
  await page.getByRole('button', { name: i18n.t('go') }).click();

  // 2. On the timer page
  await page.waitForURL(/\/timer\?task=.*/);
  await expect(page.getByRole('heading', { name: taskName })).toBeVisible();

  // 3. Let the timer run, then pause and resume
  await page.waitForTimeout(2000); // Wait for 2 seconds
  const timer = page.getByTestId('timer-display');
  await expect(timer).not.toHaveText('00:00:00');

  await page.getByRole('button', { name: i18n.t('pause') }).click();
  const pausedTime = await timer.textContent();
  await page.waitForTimeout(1500); // Wait for 1.5 seconds
  await expect(timer).toHaveText(pausedTime!);

  await page.getByRole('button', { name: i18n.t('resume') }).click();
  await page.waitForTimeout(1000); // Wait for 1 second
  await expect(timer).not.toHaveText(pausedTime!);

  // 4. Stop the timer and go back to the main page
  await page.getByRole('button', { name: i18n.t('stop') }).click();
  await page.waitForURL('/');

  // 5. Check history
  await page.getByRole('button', { name: i18n.t('history') }).click();
  await page.waitForURL('/history');
  await page.waitForTimeout(3000); // Wait for 1 second
  await expect(page.getByText(taskName)).toBeVisible();

  // 6. Clear history
  await page.getByRole('button', { name: i18n.t('clearHistory') }).click();
  await expect(page.getByText(i18n.t('noRecords'))).toBeVisible();
  await expect(page.getByText(taskName)).toBeHidden();

  // 7. Go back to home
  await page.getByRole('button', { name: i18n.t('backHome') }).click();
  await page.waitForURL('/');
});
