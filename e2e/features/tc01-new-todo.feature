Feature: tc01-new-todo

    Feature Description: Verify a new todo item appears last on my todo list.

    @demo
    Scenario: Verify a new todo item appears last on my todo list.
        Given   I am a user
        When    I create a new todo item
        Then    it appears last on my todo list
    
