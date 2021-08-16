const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../pages/calculatorPage');

// inputs have to be assigned strings
const randomOne = Math.random() * 1000;
const randomTwo = Math.random() * 1000 + 1;
const inputOne = `${randomOne.toFixed(6)}`;
const inputTwo = `${randomTwo.toFixed(6)}`;

// expected outcomes are calculated once beforehand
const addRes = `${Number(inputOne) + Number(inputTwo)}`;
const subRes = `${Number(inputOne) - Number(inputTwo)}`;
const mulRes = `${Number(inputOne) * Number(inputTwo)}`;
const divRes = `${Number(inputOne) / Number(inputTwo)}`;
const conRes = inputOne + inputTwo;

const buildVersions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // version 0 is the prototype
buildVersions.forEach(buildVersion => {
  test.describe(`Testing build No. ${buildVersion}`, () => {
    let page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      calculatorPage = new CalculatorPage(page);
    });

    test.beforeEach(async () => {
      await calculatorPage.goto();
      await calculatorPage.selectBuild(buildVersion);
    });

    test.only('required elements are visible', async () => {
      const reqElementsVisible = await calculatorPage.reqElementsVisible();
      expect(reqElementsVisible.buildField).toBe(true);
      expect(reqElementsVisible.operationField).toBe(true);
      expect(reqElementsVisible.inputOne).toBe(true);
      expect(reqElementsVisible.inputTwo).toBe(true);
      expect(reqElementsVisible.calculateButton).toBe(true);
      expect(reqElementsVisible.answerField).toBe(true);
    });

    test.only('division by zero throws an error', async () => {
      const divByZeroErrVisible = await calculatorPage.divByZeroErrVisible(inputOne);
      expect(divByZeroErrVisible).toBe(true);
    });

    test.only('non-numeric input throws an error', async () => {
      const nonNumericErrVisible = await calculatorPage.nonNumericErrVisible(inputOne);
      expect(nonNumericErrVisible).toBe(true);
    });

    test.only('integer only checkbox is working properly', async () => {
      await calculatorPage.checkIntBox();
      const result = await calculatorPage.add(inputOne, inputTwo);
      expect(result).toEqual(expect.not.stringContaining('.'));
    });

    test.only('addition is working properly', async () => {
      const result = await calculatorPage.add(inputOne, inputTwo);
      expect(result).toEqual(addRes);
    });

    test.only('substraction is working properly', async () => {
      const result = await calculatorPage.substract(inputOne, inputTwo);
      expect(result).toEqual(subRes);
    });

    test.only('multiplication is working properly', async () => {
      const result = await calculatorPage.multiply(inputOne, inputTwo);
      expect(result).toEqual(mulRes);
    });

    test.only('division is working properly', async () => {
      const result = await calculatorPage.divide(inputOne, inputTwo);
      expect(result).toEqual(divRes);
    });

    test.only('concatenation is working properly', async () => {
      const result = await calculatorPage.concatenate(inputOne, inputTwo);
      expect(result).toEqual(conRes);
    });

  });
});