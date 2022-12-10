import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import { expect, Page } from "@playwright/test"
import { test } from "../fixtures/todo-fixture" // fixture doesn't work with cucumber BDD
import TodoPage from "../pages/todo-page";

const todoPage = new TodoPage(page);

// Scenario: Verify a todo item gets updated with the new changes. 
Given('I have created a todo item', async () => {
    await todoPage.createDefaultTodos(page);
});

When('I edit a todo item', async () => {
    const todoItems = page.locator('.todo-list li');
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.locator('.edit')).toHaveValue(todoPage.todoItems[1]);
    await secondTodo.locator('.edit').fill('Ask questions');
    await secondTodo.locator('.edit').press('Enter');

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
        todoPage.todoItems[0],
        'Ask questions',
        todoPage.todoItems[2]
    ]);
});

Then('the todo item gets updated with the new changes', async () => {
    await todoPage.checkTodosContain(page, 'Ask questions');
});
