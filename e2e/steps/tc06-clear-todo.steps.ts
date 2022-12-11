import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import TodoPage from "../pages/todo-page";
import { expect } from "@playwright/test";

const todoPage = new TodoPage(page);

// Scenario: Verify completed item gets removed from todo list and moved to the completed list.
Given('I have marked a todo item as complete.', async () => {
    await todoPage.createDefaultTodos(page);
    await page.locator('.todo-list li .toggle').nth(0).check();
    await todoPage.checkNumberOfTodos(page, 3);
    await expect(page.locator('.clear-completed')).toHaveText('Clear completed');
});

Then('the todo item is moved to the Completed list', async () => {
    await page.locator('.filters >> text=Completed').click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toHaveText([todoPage.todoItems[0]]);
});

When('I click “Clear Completed”', async () => {
    await page.locator('.clear-completed').click();
});

Then('the completed todo item is removed from my todo list', async () => {
    await page.locator('.filters >> text=All').click();
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li')).toHaveText([todoPage.todoItems[1], todoPage.todoItems[2]]);
});

Then('the Completed list should be empty', async () => {
    await page.locator('.filters >> text=Completed').click();
    await expect(page.locator('.todo-list li')).toHaveCount(0);
});
