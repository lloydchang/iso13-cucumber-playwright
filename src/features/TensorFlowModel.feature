@VerifyPrediction
Feature: Verify Predictions Pre-trained TensorFlow Model

  Scenario: Train and test a simple TensorFlow model
    Given I have trained a simple TensorFlow model
    When I input the value 5
    Then the prediction should be close to 9
