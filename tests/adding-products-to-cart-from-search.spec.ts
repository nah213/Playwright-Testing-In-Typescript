import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Adding Products To Cart From Search Tests', () => {
	const userEmailAddress = `test+${uuidv4()}@test.com`;
	const userPassword = 'Password123#';
	const fistName = 'New';
	const lastName = 'User';
	const addressLine1 = '123 Main St';
	const addressLine2 = 'Apt 123';
	const state = 'Navada';
	const city = 'Las Vegas';
	const zipCode = '89101';
	const country = 'United States';
	const phoneNumber = '555-555-5555';

	test.beforeAll(async () => {
		const browser = await chromium.launch();
		const context = await browser.newContext();
		const page = await context.newPage();

		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(userEmailAddress);
		await page.locator('[data-qa="signup-button"]').click();
		await page.locator('#id_gender1').click();
		await page.locator('#password').fill(userPassword);
		await page.locator('#days').selectOption({ label: '1' });
		await page.locator('#months').selectOption({ label: 'January' });
		await page.locator('#years').selectOption({ label: '2021' });
		await page.locator('#newsletter').check();
		await page.locator('#optin').check();
		await page.locator('#first_name').fill(fistName);
		await page.locator('#last_name').fill(lastName);
		await page.locator('#company').fill('Company');
		await page.locator('#address1').fill(addressLine1);
		await page.locator('#address2').fill(addressLine2);
		await page.locator('#country').selectOption({ label: country });
		await page.locator('#state').fill(state);
		await page.locator('#city').fill(city);
		await page.locator('#zipcode').fill(zipCode);
		await page.locator('#mobile_number').fill(phoneNumber);
		await page.locator('[data-qa="create-account"]').click();

		await browser.close();
	});

	test('Selecting Products to you to the All Products page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await expect(page).toHaveTitle('Automation Exercise - All Products');
	});

	test('Searching for a product sends the user to the searched produts page with matching products visible.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		
		await page.locator('#search_product').fill('T-Shirt');
		await page.locator('#submit_search').click();

		await expect(page.locator('section', { hasNot: page.locator('#advertisement') }).locator('.padding-right').locator('.title')).toHaveText('Searched Products');	
		await expect(page.locator('.productinfo')).toHaveCount(3);
	});

	test('Products added to cart from searched products are visible in the cart.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.locator('#search_product').fill('T-Shirt');
		await page.locator('#submit_search').click();
		await page.locator('[data-product-id="28"]').nth(0).hover();
		await page.locator('[data-product-id="28"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.locator('[data-product-id="29"]').nth(0).hover();
		await page.locator('[data-product-id="29"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.locator('[data-product-id="30"]').nth(0).hover();
		await page.locator('[data-product-id="30"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();

		await page.getByRole('link', { name: ' Cart' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Checkout');
		await expect(page.locator('#cart_info_table').locator('tbody').locator('tr')).toHaveCount(3);
	});

	test('Products added to cart from searched products are still visible in the cart after login in.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.locator('#search_product').fill('T-Shirt');
		await page.locator('#submit_search').click();
		await page.locator('[data-product-id="28"]').nth(0).hover();
		await page.locator('[data-product-id="28"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.locator('[data-product-id="29"]').nth(0).hover();
		await page.locator('[data-product-id="29"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.locator('[data-product-id="30"]').nth(0).hover();
		await page.locator('[data-product-id="30"]').nth(0).locator('i').click();
		await page.getByRole('button', { name: 'Continue Shopping' }).click();
		await page.getByRole('link', { name: ' Cart' }).click();
		await page.getByRole('link', { name: ' Signup / Login' }).click();
		await page.locator('[data-qa="login-email"]').fill(userEmailAddress);
		await page.locator('[data-qa="login-password"]').fill(userPassword);
		await page.locator('[data-qa="login-button"]').click();

		await page.getByRole('link', { name: ' Cart' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Checkout');
		await expect(page.locator('#cart_info_table').locator('tbody').locator('tr')).toHaveCount(3);
	});
});
