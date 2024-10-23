Feature: Validate Login
    As a user
    I should be able to log into my account
    So I can do it

    Scenario: Login with valid credentaisl
        Given I log into Tesla
        When I enter my credentials
        Then I should be logged in