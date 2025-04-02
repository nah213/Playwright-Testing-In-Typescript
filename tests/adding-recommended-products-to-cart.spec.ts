import { test, expect } from '@playwright/test';

test.describe('Adding Recommended Products To Cart Tests', () => {
	test('Recommended items are at the bottom of the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page.locator('.recommended_items').locator('h2').nth(0)).toHaveText('recommended items');
		await expect(page.locator('#recommended-item-carousel')).toBeVisible();
	});

	test('Adding recommended product to the cart.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		const productName = await page.locator('#recommended-item-carousel').locator('.col-sm-4').nth(0).locator('.productinfo').locator('p').textContent() ?? '';
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();

		await expect(page.locator('#cart_info_table').locator('tbody').locator('tr')).toHaveCount(1);
		await expect(page.locator('#cart_info_table').locator('tbody').locator('tr').locator('td').nth(1)).toContainText(productName);
	});
});
