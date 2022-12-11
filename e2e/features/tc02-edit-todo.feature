Feature: tc02-edit-todo

    Feature Description: Verify a todo item gets updated with the new changes.

    @demo
    Scenario: Verify a todo item gets updated with the new changes.
        
        Given   I have created todo items
        When    I edit a todo item
        Then    the todo item gets updated with the new changes
