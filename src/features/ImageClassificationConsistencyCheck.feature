@ImageClassificationConsistencyCheck
Feature: Image Classification Consistency Check
  To ensure that the pre-trained image classification model behaves consistently
  and can accurately predict known labels for specific images.

  Scenario: Validate Class Label Consistency for Specific Images
    Given a pre-trained image classification model is loaded
    When I input a set of known images
    Then the predicted labels should match the expected labels with at least 90% accuracy
