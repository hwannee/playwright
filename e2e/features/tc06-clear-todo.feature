Feature: tc06-clear-todo

    Feature Description: Verify completed item gets removed from todo list and moved to the completed list.

    @demo
    Scenario: Verify completed item gets removed from todo list and moved to the completed list.
        
        # Issue: The original step has a problem in the last step.  
        #        Once "Clear completed" clicked, Completed list will get empty
        # 
        # Given   I have marked a todo item as complete.
        # When    I click “Clear Completed”
        # Then    the completed todo item is removed from my todo list
        # And     the todo item is moved to the Completed list

        # Fix: The step of 'The todo item is moved to the Completed list' should be located here!
        #      Last And step should check the list is empty
        # 
        Given   I have marked a todo item as complete.
        Then    the todo item is moved to the Completed list
        When    I click “Clear Completed”
        Then    the completed todo item is removed from my todo list
        And     the Completed list should be empty