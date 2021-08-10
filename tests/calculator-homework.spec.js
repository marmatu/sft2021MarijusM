const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../pages/calculatorPage');

const inputOne = '6';
const inputTwo = '3';

const addRes = `${Number(inputOne) + Number(inputTwo)}`;
const subRes = `${Number(inputOne) - Number(inputTwo)}`;
const mulRes = `${Number(inputOne) * Number(inputTwo)}`;
const divRes = `${Number(inputOne) / Number(inputTwo)}`;
const conRes = inputOne + inputTwo;

const buildVersions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
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
      const reqElementsVisible = await calculatorPage.reqElementsVisible();
      expect(reqElementsVisible).toBe(true);
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