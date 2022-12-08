Feature: 1 new todo

    Feature Description: Use Playwright and the utilities available in tophatmonocle/playwright
        to complete the test cases listed below using the following example todomvc app;
        https://todomvc.com/examples/react/#/

    @demo
    Scenario: Verify a new todo item appears last on my todo list
        Given   I am a user
        When    I create a new todo item
        Then    it appears last on my todo list
    
