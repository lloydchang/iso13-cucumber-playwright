@wip
Feature: Data Validity
  As a data quality analyst
  I want to ensure data conforms to business rules
  So that it is valid and reliable

  Scenario: Ensure data matches required formats
    Given a dataset with email addresses
    When I validate each email format
    Then all should match the pattern user@example.com

  Scenario: Validate data adheres to business logic
    Given a dataset with event start and end dates
    When I check each event
    Then the end date should be after the start date

  Scenario: Confirm data values are within predefined code sets
    Given a dataset with country codes
    When I validate each code
    Then all should be within the ISO 3166-1 alpha-2 standard
