const { test, expect } = require('@playwright/test');
const { clickWithHealing } = require('../agent/selfHealing');


test('Valid Login', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await clickWithHealing(page, '#login-button');
  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});


test('Invalid Password', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('wrongPassword');
  await clickWithHealing(page, '#login-button');
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});


test('Invalid Username', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('wrongUser');
  await page.locator('#password').fill('SuperSecretPassword!');
  await clickWithHealing(page, '#login-button');
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});


test('Empty Fields', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('');
  await page.locator('#password').fill('');
  await clickWithHealing(page, '#login-button');
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});