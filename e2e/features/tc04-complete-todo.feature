Feature: tc04-complete-todo

    Feature Description: Verify completed todos with green mark and strikethrough.

    @demo
    Scenario: Verify completed todos with green mark and strikethrough.

        Given   I have created todo items..
        When    I mark a todo item as completed
        Then    it is marked with a green check mark
        And     it is crossed off my todo list with a Strikethrough
