import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { fixture } from './pageFixture';
import { CustomWorld } from './world';

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(10 * 2000);

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
    context = await browser.newContext();
    const page: Page = await context.newPage();
    fixture.page = page;
    this.page = page;
});

After(async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
        const img = await fixture.page.screenshot({
            path: `./reports/screenshots/${pickle.name}.png`,
            type: 'png',
        });
        this.attach(img, 'image/png');
    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});