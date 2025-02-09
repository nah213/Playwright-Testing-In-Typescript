import { test, expect } from '@playwright/test';

test.describe('Test Case Page Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the test cases header link in the header sends the user to the test cases page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: new RegExp(' Test Cases') }).click();

		await expect(page).toHaveTitle('Automation Practice Website for UI Testing - Test Cases');
	});
});
