Feature: tc03-delete-todo

    Feature Description: Verify a todo item gets updated with the new changes.

    @demo
    Scenario: Verify a todo item gets removed when deleted using red X
        
        Given   I have created todo items.
        When    I delete a todo item using the red X
        Then    the todo item is removed from my todo list