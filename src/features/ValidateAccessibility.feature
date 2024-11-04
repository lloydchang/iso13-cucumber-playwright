@ValidateAccessibility @a11y
Feature: Validate Accessibility
  As a a11y team
  We want to ensure that the website is accessible to all users
  So we can provide a better user experience for everyone

  #a11y - Accessibility
  #a11y reports are generated in /artifacts/acceessibilityReport.html

  Scenario: Validate A11y
    Given I go to a site that is accessible
    When I run the a11y check
    Then I should not see violations