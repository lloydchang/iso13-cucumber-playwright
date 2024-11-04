import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Tesla website', async function () {
    await this.page.goto('https://www.tesla.com/');
});

When('I click on the Model Y', async function () {
    await this.page.getByRole('link', { name: 'Order Model Y' }).click();
});

When('I click on the order button', async function () {
    await this.page.getByRole('button', { name: 'Order Now' }).click();
});

Then('I should see the order form', async function () {
    await expect(this.page.getByRole('button', { name: 'Order with Card' })).toBeVisible({ timeout: 10000 });
});
