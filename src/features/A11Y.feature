@A11y
Feature: A11y

    Scenario: Validate A11y
        Given I navigate to Tesla
        When I run the a11y check
        Then I should not see violations