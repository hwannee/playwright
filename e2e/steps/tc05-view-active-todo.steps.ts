import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import TodoPage from "../pages/todo-page";
import { expect } from "@playwright/test";

const todoPage = new TodoPage(page);

// Scenario: Verify only active todo items are shown.
Given('I have marked a todo item as complete', async () => {
    await todoPage.createDefaultTodos(page);
    await page.locator('.todo-list li .toggle').nth(1).check();
    await todoPage.checkNumberOfTodos(page, 3);
});

When('I view the Active list', async () => {
    await page.locator('.filters >> text=Active').click();
});

Then('Only Active \\(Not Completed) todo items are shown', async () => {
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    await expect(page.locator('.todo-list li')).toHaveText([todoPage.todoItems[0], todoPage.todoItems[2]]);
});
