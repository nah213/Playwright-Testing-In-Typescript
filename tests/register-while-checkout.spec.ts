import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Register User While Checking Out Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting Cart displayes the cart page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();

		await page.getByRole('link', { name: 'View Cart' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Checkout');
	});

	test('Account Created page displayed after creating an account from the cart page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();
		await page.locator('.check_out').click();
		await page.getByRole('link', { name: 'Register / Login' }).click();
		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(`test+${uuidv4()}@test.com`);
		await page.locator('[data-qa="signup-button"]').click();
		await page.locator('#id_gender1').click();
		await page.locator('#password').fill('Password123#');
		await page.locator('#days').selectOption({ label: '1' });
		await page.locator('#months').selectOption({ label: 'January' });
		await page.locator('#years').selectOption({ label: '2021' });
		await page.locator('#newsletter').check();
		await page.locator('#optin').check();
		await page.locator('#first_name').fill('New');
		await page.locator('#last_name').fill('User');
		await page.locator('#company').fill('Company');
		await page.locator('#address1').fill('123 Main St');
		await page.locator('#address2').fill('Apt 123');
		await page.locator('#country').selectOption({ label: 'United States' });
		await page.locator('#state').fill('Navada');
		await page.locator('#city').fill('Las Vegas');
		await page.locator('#zipcode').fill('89101');
		await page.locator('#mobile_number').fill('555-555-5555');

		await page.locator('[data-qa="create-account"]').click();

		await expect(page).toHaveTitle('Automation Exercise - Account Created');
	});

	test('User is logged in after creating an account from the cart page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();
		await page.locator('.check_out').click();
		await page.getByRole('link', { name: 'Register / Login' }).click();
		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(`test+${uuidv4()}@test.com`);
		await page.locator('[data-qa="signup-button"]').click();
		await page.locator('#id_gender1').click();
		await page.locator('#password').fill('Password123#');
		await page.locator('#days').selectOption({ label: '1' });
		await page.locator('#months').selectOption({ label: 'January' });
		await page.locator('#years').selectOption({ label: '2021' });
		await page.locator('#newsletter').check();
		await page.locator('#optin').check();
		await page.locator('#first_name').fill('New');
		await page.locator('#last_name').fill('User');
		await page.locator('#company').fill('Company');
		await page.locator('#address1').fill('123 Main St');
		await page.locator('#address2').fill('Apt 123');
		await page.locator('#country').selectOption({ label: 'United States' });
		await page.locator('#state').fill('Navada');
		await page.locator('#city').fill('Las Vegas');
		await page.locator('#zipcode').fill('89101');
		await page.locator('#mobile_number').fill('555-555-5555');
		await page.locator('[data-qa="create-account"]').click();

		await page.locator('[data-qa="continue-button"]').click();

		await expect(page.locator('.fa-user').locator('xpath=..')).toHaveText('Logged in as New User', { useInnerText: true });
	});

	test('The Shipping and Payment information for the new user are displayed on the checkout page.', async ({ page }) => {
		const fistName = 'New';
		const lastName = 'User';
		const addressLine1 = '123 Main St';
		const addressLine2 = 'Apt 123';
		const state = 'Navada';
		const city = 'Las Vegas';
		const zipCode = '89101';
		const country = 'United States';
		const phoneNumber = '555-555-5555';
		await page.goto('https://automationexercise.com');
		const productName = await page.locator('.features_items').locator('.col-sm-4').nth(0).locator('.productinfo').locator('p').textContent() ?? '';
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();
		await page.locator('.check_out').click();
		await page.getByRole('link', { name: 'Register / Login' }).click();
		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(`test+${uuidv4()}@test.com`);
		await page.locator('[data-qa="signup-button"]').click();
		await page.locator('#id_gender1').click();
		await page.locator('#password').fill('Password123#');
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
		await page.locator('[data-qa="continue-button"]').click();
		await page.getByRole('link', { name: ' Cart' }).click();

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

	test('Order Placed page is displayed after an order has been completed.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.locator('[data-product-id="1"]').nth(0).hover();
		await page.locator('[data-product-id="1"]').nth(1).locator('i').click();
		await page.getByRole('link', { name: 'View Cart' }).click();
		await page.locator('.check_out').click();
		await page.getByRole('link', { name: 'Register / Login' }).click();
		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(`test+${uuidv4()}@test.com`);
		await page.locator('[data-qa="signup-button"]').click();
		await page.locator('#id_gender1').click();
		await page.locator('#password').fill('Password123#');
		await page.locator('#days').selectOption({ label: '1' });
		await page.locator('#months').selectOption({ label: 'January' });
		await page.locator('#years').selectOption({ label: '2021' });
		await page.locator('#newsletter').check();
		await page.locator('#optin').check();
		await page.locator('#first_name').fill('New');
		await page.locator('#last_name').fill('User');
		await page.locator('#company').fill('Company');
		await page.locator('#address1').fill('123 Main St');
		await page.locator('#address2').fill('Apt 123');
		await page.locator('#country').selectOption({ label: 'United States' });
		await page.locator('#state').fill('Navada');
		await page.locator('#city').fill('Las Vegas');
		await page.locator('#zipcode').fill('89101');
		await page.locator('#mobile_number').fill('555-555-5555');
		await page.locator('[data-qa="create-account"]').click();
		await page.locator('[data-qa="continue-button"]').click();
		await page.getByRole('link', { name: ' Cart' }).click();
		await page.locator('.check_out').click();
		await page.locator('[name="message"]').fill('This is a test message');
		await page.locator('[href="/payment"]').click();
		await page.locator('[data-qa="name-on-card"]').fill('New User');
		await page.locator('[data-qa="card-number"]').fill('4242424242424242');
		await page.locator('[data-qa="cvc"]').fill('123');
		await page.locator('[data-qa="expiry-month"]').fill('12');
		await page.locator('[data-qa="expiry-year"]').fill('2027');
		
		await page.locator('#submit').click();

		await expect(page).toHaveTitle('Automation Exercise - Order Placed');
	});
});
