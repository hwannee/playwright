import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import { expect, Page } from "@playwright/test"
import TodoPage from "../pages/todo-page";

const todoPage = new TodoPage(page);

// Scenario: Verify a new todo item appears last on my todo list
Given('I am a user', async () => {
  // Make sure .new-todo object is visible
  expect(page.isVisible('.new-todo'))
});

When('I create a new todo item', async () => {
  // Create 1st todo.
  await page.locator('.new-todo').fill(todoPage.todoItems[0]);
  await page.locator('.new-todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.view label')).toHaveText([
    todoPage.todoItems[0]
  ]);

  // Create 2nd todo.
  await page.locator('.new-todo').fill(todoPage.todoItems[1]);
  await page.locator('.new-todo').press('Enter');

  // Make sure the list now has two todo items.
  await expect(page.locator('.view label')).toHaveText([
    todoPage.todoItems[0],
    todoPage.todoItems[1]
  ]);

  await todoPage.checkNumberOfTodos(page, 2);
});

Then('it appears last on my todo list', async () => {
  await page.locator('./new-todo')
  await todoPage.checkTodosAtIndex(page, todoPage.todoItems[1], 1);
  // await checkTodosAtIndex(page, todoPage.todoItems[1], 1);
});

// async function checkTodosAtIndex(page: Page, title: string, index: number) {
//   await expect.poll(() => {
//       return page.evaluate((index) => JSON.parse(localStorage['react-todos'])[index].title, index);
//   }).toBe(title);
// }


