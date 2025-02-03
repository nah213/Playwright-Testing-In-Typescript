import { test, expect, chromium } from '@playwright/test';

test.describe('Incorrect Login User Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the signup/login header link in the header sends the user to the signup/login page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
	});

	test('After filling in name and email with incorrect values and selecting login the user is presented with error message.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await page.locator('[data-qa="login-email"]').fill('test@test.com');
		await page.locator('[data-qa="login-password"]').fill('Password123');
		await page.locator('[data-qa="login-button"]').click();

		await expect(page.locator('[action="/login"]').locator('p')).toHaveText('Your email or password is incorrect!', { useInnerText: true });
	});
});
