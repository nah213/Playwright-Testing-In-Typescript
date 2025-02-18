import { test, expect } from '@playwright/test';

test.describe('Products Quantity In Cart Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting view product on a product sends the user to the product details page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await page.locator('[href="/product_details/1"]').click();

		await expect(page).toHaveTitle('Automation Exercise - Product Details');
	});

	test('Adding more than one of a product to the cart.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.locator('[href="/product_details/1"]').click();

		await page.locator('#quantity').fill('4');
		await page.getByRole('button', { name: ' Add to cart ' }).click();
		await page.getByRole('link', { name: 'View Cart' }).click();
		
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_quantity').locator('button')).toHaveText('4');
	});
});
