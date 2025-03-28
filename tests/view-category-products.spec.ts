import { test, expect } from '@playwright/test';

test.describe('Product Category Tests', () => {
	test('Verify categories are visible on the homepage.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page.locator('.left-sidebar').locator('h2').nth(0)).toHaveText('Category');
	});

	test('Selecting a category will change the page display.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.locator('#accordian').locator('.panel').nth(0).locator('.panel-heading').locator('h4').locator('i').click();
		await page.locator('#Women').locator('li').nth(0).locator('a').click();

		await expect(page).toHaveTitle('Automation Exercise - Dress Products');
		await expect(page.locator('body').locator('section').locator('.features_items').locator('h2').nth(0)).toContainText('Women - Dress Products');
	});

	test('Selecting a new category will change the page display.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('#accordian').locator('.panel').nth(0).locator('.panel-heading').locator('h4').locator('i').click();
		await page.locator('#Women').locator('li').nth(0).locator('a').click();

		await page.locator('#accordian').locator('.panel').nth(1).locator('.panel-heading').locator('h4').locator('i').click();
		await page.locator('#Men').locator('li').nth(0).locator('a').click();

		await expect(page).toHaveTitle('Automation Exercise - Tshirts Products');
		await expect(page.locator('body').locator('section').locator('.features_items').locator('h2').nth(0)).toContainText('Men - Tshirts Products');
	});
});
