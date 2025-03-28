import { test, expect } from '@playwright/test';

test.describe('Removing Product From Cart Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Cart can be displied after adding an item.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();

		await page.getByRole('link', { name: 'View Cart' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Checkout')
	});

	test('Item can be removed from cart by selecting the x.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();

		await page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_delete').locator('i').click();

		await expect(page.locator('#empty_cart')).toBeVisible();
	});
});
