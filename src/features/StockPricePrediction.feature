@ssp
Feature: Stock Price Prediction
    As a financial analyst
    I want to predict the stock price for a given historical or future date
    so that I can make informed decisions and provide insights into market trends.

    Scenario: Predict future stock price based on user-provided date
        Given I have trained the stock price predictor with historical data
        When I predict the stock price for a future date "Dec 31 2024"
        Then the predicted price should be displayed

    Scenario: Predict stock price for a specific historical date
        Given I have trained the stock price predictor with historical data
        When I predict the stock price for a historical date "Nov 11 2024"
        Then the predicted price should be displayed

    @wip
    Scenario: Predict stock price for multiple future dates
        Given I have trained the stock price predictor with historical data
        When I predict the stock prices for future dates "Jan 01 2025", "Jan 02 2025", and "Jan 03 2025"
        Then the predicted future prices should be logged to the console and be valid numbers

    @wip
    Scenario: Determine accuracy of stock price predictions
        Given I have historical data that was not used for training
        When I predict the stock price for historical dates in the test set
        Then the model's accuracy should be logged to the console