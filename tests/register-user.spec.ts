import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Register User Tests', () => {
	test('Browsing to https://automationexercise.com loads the home page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await expect(page).toHaveTitle('Automation Exercise');
	});

	test('Selecting the signup/login header link in the header sends the user to the signup/login page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');

		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
	});

	test('After filling in name and email then selecting signup the user is sent to the singup page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();

		await page.locator('[data-qa="signup-name"]').fill('New User');
		await page.locator('[data-qa="signup-email"]').fill(`test+${uuidv4()}@test.com`);
		await page.locator('[data-qa="signup-button"]').click();

		await expect(page).toHaveTitle('Automation Exercise - Signup');
	});

	test('After filling out the singup page and selecting create account the user is sent to account created page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
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

	test('The continue button on the account created page sends user back to home page and the user is logged in.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
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

		await expect(page).toHaveTitle('Automation Exercise');
		await expect(page.locator('.fa-user').locator('xpath=..')).toHaveText('Logged in as New User', { useInnerText: true });
	});

	test('Selecting the delete account link in the header sends the user to the account deleted page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
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

		await page.getByRole('link', { name: ' Delete Account' }).click();

		await expect(page.locator('[data-qa="account-deleted"]')).toHaveText('ACCOUNT DELETED!', { useInnerText: true });
	});

	test('The continue button on the account deleted page sends user back to home page and the user is not logged in.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Signup / Login' }).click();
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
		await page.getByRole('link', { name: ' Delete Account' }).click();

		await page.locator('[data-qa="continue-button"]').click();

		await expect(page).toHaveTitle('Automation Exercise');
		await expect(page.locator('.fa-user')).toBeHidden();
	});
});
