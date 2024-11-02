@k6
Feature: Load testing API with k6

  Scenario: Perform load test on GET /posts endpoint
    Given I run a load test for "GET /posts" with 2 virtual users for 5 seconds
    Then the test should complete successfully
    And the average response time should be below 50ms
    And the success rate should be 100%