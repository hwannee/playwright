Feature: tc05-view-active-todo

    Feature Description: Verify only active todo items are shown.

    @demo
    Scenario: Verify only active todo items are shown.

        Given   I have marked a todo item as complete
        When    I view the Active list
        Then    Only Active (Not Completed) todo items are shown
