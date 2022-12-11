import { Given, When, Then } from "@cucumber/cucumber"
import { page } from "./world"
import TodoPage from "../pages/todo-page";
import { expect } from "@playwright/test";

const todoPage = new TodoPage(page);

// Scenario: Verify completed todos with green mark and strikethrough. 
Given('I have created todo items..', async () => {
    await todoPage.createDefaultTodos(page);
});

When('I mark a todo item as completed', async () => {
    // Check first item.
    const firstTodo = page.locator('.todo-list li').nth(0);
    await firstTodo.locator('.toggle').check();
});

Then('it is marked with a green check mark', async () => {
    const firstTodo = page.locator('.todo-list li').nth(0);
    // Assert completed class.
    expect(firstTodo).toHaveClass('completed');
});

Then('it is crossed off my todo list with a Strikethrough', async () => {
    const firstTodoText = page.locator('.todo-list li').nth(0).getByText(todoPage.todoItems[0]);
    const strike = await firstTodoText.evaluate((todo) => {
        return window.getComputedStyle(todo).textDecorationLine;
    });
    expect(strike).toBe('line-through')
});