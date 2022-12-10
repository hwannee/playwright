import { expect, Page } from "@playwright/test";
import { TODO_ITEMS } from "../test-data/todo-test-data";

export default class TodoPage {
    todoItems: string[];

    constructor(page: Page) {
        this.todoItems = TODO_ITEMS;
    }

    async checkNumberOfTodos(page: Page, expected: number) {
        await expect.poll(() => {
            return page.evaluate(() => JSON.parse(localStorage['react-todos']).length);
        }).toBe(expected);
    }

    async checkTodosAtIndex(page: Page, title: string, index: number) {
        await expect.poll(() => {
            console.log(() => JSON.parse(localStorage['react-todos'])[index].title);
            return page.evaluate((index) => JSON.parse(localStorage['react-todos'])[index].title, index);
        }).toBe(title);
    }

    async createDefaultTodos(page: Page) {
        for (const item of this.todoItems) {
            await page.locator('.new-todo').fill(item);
            await page.locator('.new-todo').press('Enter');
        }
    }

    async checkTodosContain(page: Page, title: string) {
        await expect.poll(() => {
            return page.evaluate(() => JSON.parse(localStorage['react-todos']).map((i: { title: any; }) => i.title));
        }).toContain(title);
    }

}