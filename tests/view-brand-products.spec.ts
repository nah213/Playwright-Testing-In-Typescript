import { test, expect } from '@playwright/test';

test.describe('Product Brand Tests', () => {
	test('Verify brands are visible on the homepage.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await expect(page.locator('.left-sidebar').locator('.brands_products').locator('h2').nth(0)).toHaveText('Brands');
	});

	test('Selecting a brand will change the page display.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.locator('.left-sidebar').locator('.brands_products').locator('.brands-name').locator('a').nth(0).click();

		await expect(page).toHaveTitle('Automation Exercise - Polo Products');
		await expect(page.locator('body').locator('section').locator('.features_items').locator('h2').nth(0)).toContainText('Brand - Polo Products');
	});

	test('Selecting a new brand will change the page display.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('.left-sidebar').locator('.brands_products').locator('.brands-name').locator('a').nth(0).click();

		await page.locator('.left-sidebar').locator('.brands_products').locator('.brands-name').locator('a').nth(1).click();

		await expect(page).toHaveTitle('Automation Exercise - H&M Products');
		await expect(page.locator('body').locator('section').locator('.features_items').locator('h2').nth(0)).toContainText('Brand - H&M Products');
	});
});
