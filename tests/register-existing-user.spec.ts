import { test, expect, chromium } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Register Existing User Tests', () => {
	const userEmailAddress = `test+${uuidv4()}@test.com`;
	const userPassword = 'Password123#';

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

		await browser.close();
	});

	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the signup/login header link in the header sends the user to the signup/login page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
	});

	test('After filling in name and email with existing email then selecting login the user is presented with an error.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(userEmailAddress);
		await page.locator('[data-qa="signup-button"]').click();

		await expect(page.locator('[action="/signup"]').locator('p')).toHaveText('Email Address already exist!', { useInnerText: true });
	});
});
