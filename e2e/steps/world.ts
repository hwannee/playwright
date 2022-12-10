import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';

let page: Page;
let browser: Browser;

setDefaultTimeout(60000);

Before(async () => {
    try {
        browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://todomvc.com/examples/react/#/");
        console.log('captured site title as ${await page.tite()}');
    }
    catch (error) {
        console.log('chrome navigation to demo site failed due to ${error}');
        throw new Error('chrome navigation to demo site failed due to ${error}');
    }
    return page;
});

After(async () => {
    await browser.close();
});

export { page, browser };
