import { test as myTest } from "@playwright/test"
import TodoPage from "../pages/todo-page"

type myType = {
    todoPage: TodoPage;
}

const todoFixture = myTest.extend<myType>({
    todoPage: async ({ page }, use) => {
        await use(new TodoPage(page));
    }
})

export const test = todoFixture;