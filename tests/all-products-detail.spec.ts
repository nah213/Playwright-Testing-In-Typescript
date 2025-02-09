import { test, expect } from '@playwright/test';

test.describe('All Products And Product Detal Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the products link in the header sends the user to the all products page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: ' Products' }).click();

		await expect(page).toHaveTitle('Automation Exercise - All Products');
	});

	test('Selecting view product on a product sends the user to the product details page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await page.locator('[href="/product_details/1"]').click();

		await expect(page).toHaveTitle('Automation Exercise - Product Details');
		await expect(page.locator('.product-information').locator('h2')).toHaveText('Blue Top');
		await expect(page.locator('.product-information').locator('p').nth(0)).toHaveText('Category: Women > Tops');
		await expect(page.locator('.product-information').locator('span').locator('span')).toHaveText('Rs. 500');
		await expect(page.locator('.product-information').locator('p').nth(1)).toHaveText('Availability: In Stock');
		await expect(page.locator('.product-information').locator('p').nth(2)).toHaveText('Condition: New');
		await expect(page.locator('.product-information').locator('p').nth(3)).toHaveText('Brand: Polo');
	});
});
