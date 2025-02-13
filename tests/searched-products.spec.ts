import { test, expect } from '@playwright/test';

test.describe('Searched Products Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the products link in the header sends the user to the all products page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: ' Products' }).click();

		await expect(page).toHaveTitle('Automation Exercise - All Products');
	});

	test('Searching for a product sends the user to the searched products page with matching products visible.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		
		await page.locator('#search_product').fill('GRAPHIC DESIGN MEN T SHIRT - BLUE');
		await page.locator('#submit_search').click();

		await expect(page.locator('section', { hasNot: page.locator('#advertisement') }).locator('.padding-right').locator('.title')).toHaveText('Searched Products');
		await expect(page.locator('.productinfo')).toHaveCount(1);
		await expect(page.locator('.productinfo').locator('p')).toHaveText('GRAPHIC DESIGN MEN T SHIRT - BLUE');
	});
});
