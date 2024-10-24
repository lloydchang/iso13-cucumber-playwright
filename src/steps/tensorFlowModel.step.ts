import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as tf from '@tensorflow/tfjs';
import { createSimpleModel, predictValue } from '../support/model/simpleModel';

let model: tf.LayersModel;
let prediction: number;

Given('I have trained a simple TensorFlow model', async () => {
  model = await createSimpleModel();
});

When('I input the value {int}', async (input: number) => {
  prediction = await predictValue(model, input);
});

Then('the prediction should be close to {int}', (expectedValue: number) => {
  expect(prediction).toBeCloseTo(expectedValue, 0.5);
});