const { test, expect } = require('@playwright/test');


test('valid login', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');

  await page.locator('button[type="submit"]').click();
  
  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});


test('invalid password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('wrongPassword');

  await page.locator('button[type="submit"]').click();
  
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});


test('invalid username', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('wrongUser');
  await page.locator('#password').fill('SuperSecretPassword!');

  await page.locator('button[type="submit"]').click();
  
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});


test('empty fields', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('');
  await page.locator('#password').fill('');

  await page.locator('button[type="submit"]').click();
  
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});