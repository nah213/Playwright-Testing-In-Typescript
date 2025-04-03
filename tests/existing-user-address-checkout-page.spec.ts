import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Existing User Address Correct On Checkout Page Tests', () => {
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

	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('After logging in the user adds products to their cart they are able to view the cart page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
		await page.locator('[data-qa="login-email"]').fill(userEmailAddress);
		await page.locator('[data-qa="login-password"]').fill(userPassword);
		await page.locator('[data-qa="login-button"]').click();
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();

		await page.getByRole('link', { name: 'View Cart' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Checkout');
	});

	test('After logging in the user adds products to their cart they are able to procced to the view orders page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		const productName = await page.locator('.features_items').locator('.col-sm-4').nth(0).locator('.productinfo').locator('p').textContent() ?? '';
		await page.getByRole('link', { name: ' Signup / Login' }).click();
		await page.locator('[data-qa="login-email"]').fill(userEmailAddress);
		await page.locator('[data-qa="login-password"]').fill(userPassword);
		await page.locator('[data-qa="login-button"]').click();
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();

		await page.locator('.check_out').click();

		await expect(page.locator('#address_delivery').locator('.address_firstname')).toHaveText(`Mr. ${fistName} ${lastName}`);
		await expect(page.locator('#address_delivery').locator('.address_address1').nth(1)).toHaveText(addressLine1);
		await expect(page.locator('#address_delivery').locator('.address_address1').nth(2)).toHaveText(addressLine2);
		await expect(page.locator('#address_delivery').locator('.address_city')).toHaveText(`${city} ${state} ${zipCode}`);
		await expect(page.locator('#address_delivery').locator('.address_country_name')).toHaveText(country);
		await expect(page.locator('#address_delivery').locator('.address_phone')).toHaveText(phoneNumber);
		await expect(page.locator('#address_invoice').locator('.address_firstname')).toHaveText(`Mr. ${fistName} ${lastName}`);
		await expect(page.locator('#address_invoice').locator('.address_address1').nth(1)).toHaveText(addressLine1);
		await expect(page.locator('#address_invoice').locator('.address_address1').nth(2)).toHaveText(addressLine2);
		await expect(page.locator('#address_invoice').locator('.address_city')).toHaveText(`${city} ${state} ${zipCode}`);
		await expect(page.locator('#address_invoice').locator('.address_country_name')).toHaveText(country);
		await expect(page.locator('#address_invoice').locator('.address_phone')).toHaveText(phoneNumber);
		await expect(page.locator('#cart_info').locator('tbody').locator('#product-1').locator('.cart_description').locator('a')).toHaveText(productName);
	});
});
