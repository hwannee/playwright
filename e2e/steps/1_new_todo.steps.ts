import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import { expect, Page } from "@playwright/test"

const TODO_ITEMS = [
  'Setup environment',
  'Add first feature',
  'Add first step definitions',
  'Test and debug',
  'Add more features and steps',
  'Add reports'
]

Given('I am a user', async () => {
  // Make sure .new-todo object is visible
  expect(page.isVisible('.new-todo'))
});

When('I create a new todo item', async () => {
  // Create 1st todo.
  await page.locator('.new-todo').fill(TODO_ITEMS[0]);
  await page.locator('.new-todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.view label')).toHaveText([
    TODO_ITEMS[0]
  ]);

  // Create 2nd todo.
  await page.locator('.new-todo').fill(TODO_ITEMS[1]);
  await page.locator('.new-todo').press('Enter');

  // Make sure the list now has two todo items.
  await expect(page.locator('.view label')).toHaveText([
    TODO_ITEMS[0],
    TODO_ITEMS[1]
  ]);

  await checkNumberOfTodosInLocalStorage(page, 2);
});

Then('it appears last on my todo list', async () => {
  await page.locator('./new-todo')
  await checkTodosInLocalStorage(page, TODO_ITEMS[1]);
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  await expect.poll(() => {
    return page.evaluate(() => JSON.parse(localStorage['react-todos']).length);
  }).toBe(expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  await expect.poll(() => {
    return page.evaluate(() => JSON.parse(localStorage['react-todos'])[1].title);
  }).toBe(title);
}