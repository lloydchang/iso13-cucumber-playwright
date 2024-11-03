@k6PerformanceTesting
Feature: k6 Performance Testing
  As an Engineer
  I want to be able to load test API endpoints
  So I can validate the performance

  Scenario: Perform load test on GET /posts endpoint
    Given I run a load test for "GET /posts" with 2 virtual users for 5 seconds
    Then the test should complete successfully
    And the average response time should be below 60ms
    And the success rate should be 100%