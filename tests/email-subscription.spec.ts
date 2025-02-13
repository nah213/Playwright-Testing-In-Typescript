import { test, expect } from '@playwright/test';

test.describe('Email Subscription Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Verify Subscription input is aviable on the homepage.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page.locator('#footer').locator('h2')).toHaveText('Subscription');
		await expect(page.locator('#susbscribe_email')).toBeVisible();
	});

	test('After filling email then selecting submit the user presented with success message.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('#susbscribe_email').fill('test@test.com');
		await page.locator('#subscribe').click();

		await expect(page.locator('#success-subscribe')).toBeVisible();
	});
});
