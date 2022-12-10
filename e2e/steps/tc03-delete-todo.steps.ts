import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import { expect, Page } from "@playwright/test"
import { test } from "../fixtures/todo-fixture" // fixture doesn't work with cucumber BDD
import TodoPage from "../pages/todo-page";
import { TIMEOUT } from "dns";

const todoPage = new TodoPage(page);

// Scenario: Verify a todo item gets removed when deleted using red X # e2e\features\tc03-delete-item.feature:6
Given('I have created a todo items', async () => {
    await todoPage.createDefaultTodos(page);
});

When('I delete a todo item using the red X', async () => {
    const todoItems = page.locator('.todo-list li');
    const firstTodo = todoItems.nth(0);  // First item
    firstTodo.hover();  // Mouse hover to make X button visible
    const btnDestroy = page.waitForSelector('.destroy');
    (await btnDestroy).click(); // Delete
});

Then('the todo item is removed from my todo list', async () => {
    await todoPage.checkNumberOfTodos(page, 2);  // Confirm 2 out of 3 todos
});