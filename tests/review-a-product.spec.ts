import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test.describe('Reviewing a Product Tests', () => {
	test('Selecting Products to you to the All Products page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await expect(page).toHaveTitle('Automation Exercise - All Products');
	});

	test('Review Product visible on product page.', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();

		await page.getByRole('link', { name: 'View Product' }).nth(0).click();

		await expect(page.getByText('Write Your Review')).toBeVisible();
	});

	test('User is able to write a review', async ({ page }) => {
		await page.goto('https://automationexercise.com');
		await page.getByRole('link', { name: ' Products' }).click();
		await page.getByRole('link', { name: 'View Product' }).nth(0).click();
		await page.locator('#name').fill('Test User');
		await page.locator('#email').fill(`test+${uuidv4()}@test.com`);
		await page.locator('#review').fill('This is a test review.');

		await page.locator('#button-review').click();

		await expect(page.locator('section').locator('.alert-success')).toHaveText('Thank you for your review.');
		await expect(page.getByText('Thank you for your review.')).toBeVisible();
	});
});
