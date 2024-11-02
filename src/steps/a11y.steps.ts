import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { AxeResults, Result } from 'axe-core';
import { fixture } from '../support/pageFixture';
import { createHtmlReport } from 'axe-html-reporter';
import { writeFileSync } from 'fs';

async function injectAxe(page: Page) {
    await page.addScriptTag({
        path: require.resolve('axe-core/axe.min.js'),
    });
}

async function checka11y(page: Page): Promise<AxeResults> {
    return await page.evaluate(async () => {
        return await (window as any).axe.run();
    });
}

Given('I got to a site that is accessible', async function () {
    await fixture.page.goto('https://www.a11yproject.com/');
});

When('I run the a11y check', async function () {
    await injectAxe(fixture.page);
});

Then('I should not see violations', async function () {
    const results: AxeResults = await checka11y(fixture.page);
    const reportHtml = createHtmlReport({
        results,
        options: {
            projectKey: 'Accessibility Testing',
        },
    });

    writeFileSync('reports/a11y-report.html', reportHtml);

    if (results.violations.length > 0) {
        const seriousViolations: Result[] = results.violations.filter(v => v.impact === 'serious');
        if (seriousViolations.length > 0) {
            throw new Error(`A11y issues found: ${JSON.stringify(seriousViolations, null, 2)}`);
        }
    }
});
