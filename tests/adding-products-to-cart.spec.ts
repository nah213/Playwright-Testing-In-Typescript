import { test, expect } from '@playwright/test';

test.describe('Adding Products To Cart Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Adding products to the cart.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		const productOnePrice = await page.locator('.features_items').locator('.col-sm-4').nth(0).locator('.productinfo').locator('h2').textContent() ?? '';
		const productTwoPrice = await page.locator('.features_items').locator('.col-sm-4').nth(1).locator('.productinfo').locator('h2').textContent() ?? '';
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.locator('[data-product-id="2"]').nth(0).hover();
		await page.locator('[data-product-id="2"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();

		await expect(page.locator('#cart_info_table').locator('tbody').locator('tr')).toHaveCount(2);
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_price').locator('p')).toHaveText(productOnePrice);
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_quantity').locator('button')).toHaveText('1');
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-1').locator('.cart_total').locator('p')).toHaveText(productOnePrice);
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_price').locator('p')).toHaveText(productTwoPrice);
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_quantity').locator('button')).toHaveText('1');
		await expect(page.locator('#cart_info_table').locator('tbody').locator('#product-2').locator('.cart_total').locator('p')).toHaveText(productTwoPrice);
	});
});
