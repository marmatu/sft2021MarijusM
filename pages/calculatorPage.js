const buildFieldSelector = 'select[name="selectBuild"]';
const operationFieldSelector = 'select[name="selectOperation"]';
const inputOneSelector = 'input[name="number1"]';
const inputTwoSelector = 'input[name="number2"]';
const calculateButtonSelector = 'input:has-text("Calculate")';
const answerFieldSelector = '#numberAnswerField';
const intBoxSelector = 'input[name="intSelection"]';

const divideByZeroErrorSel = 'text=Divide by zero error!';
const nonNumericErrorSel = 'text=Number 2 is not a number';

const addValue = '0';
const substractValue = '1';
const multiplyValue = '2';
const divideValue = '3';
const concatenateValue = '4';

const calculatorUrl = 'https://testsheepnz.github.io/BasicCalculator';

exports.CalculatorPage = class CalculatorPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(calculatorUrl);
  }

  async selectBuild(buildVersion) {
    this.page.selectOption(buildFieldSelector, buildVersion);
  }

  async fillInputFields(inputOne, inputTwo) {
    await this.page.fill(inputOneSelector, inputOne);
    await this.page.fill(inputTwoSelector, inputTwo);
  }

  async add(inputOne, inputTwo) {
    await this.page.selectOption(operationFieldSelector, addValue);
    await this.fillInputFields(inputOne, inputTwo);
    await this.page.click(calculateButtonSelector);
    const result = await this.page.inputValue(answerFieldSelector);
    return result;
  }

  async substract(inputOne, inputTwo) {
    await this.page.selectOption(operationFieldSelector, substractValue);
    await this.fillInputFields(inputOne, inputTwo);
    await this.page.click(calculateButtonSelector);
    const result = await this.page.inputValue(answerFieldSelector);
    return result;
  }

  async multiply(inputOne, inputTwo) {
    await this.page.selectOption(operationFieldSelector, multiplyValue);
    await this.fillInputFields(inputOne, inputTwo);
    await this.page.click(calculateButtonSelector);
    const result = await this.page.inputValue(answerFieldSelector);
    return result;
  }

  async divide(inputOne, inputTwo) {
    await this.page.selectOption(operationFieldSelector, divideValue);
    await this.fillInputFields(inputOne, inputTwo);
    await this.page.click(calculateButtonSelector);
    const result = await this.page.inputValue(answerFieldSelector);
    return result;
  }

  async concatenate(inputOne, inputTwo) {
    await this.page.selectOption(operationFieldSelector, concatenateValue);
    await this.fillInputFields(inputOne, inputTwo);
    await this.page.click(calculateButtonSelector);
    const result = await this.page.inputValue(answerFieldSelector);
    return result;
  }

  async reqElementsVisible() {
    const reqElementsVisible = {
      buildField: await this.page.isVisible(buildFieldSelector),
      operationField: await this.page.isVisible(operationFieldSelector),
      inputOne: await this.page.isVisible(inputOneSelector),
      inputTwo: await this.page.isVisible(inputTwoSelector),
      calculateButton: await this.page.isVisible(calculateButtonSelector),
      answerField: await this.page.isVisible(answerFieldSelector),
      intBox: await this.page.isVisible(intBoxSelector)
    };
    return reqElementsVisible;
  }

  async divByZeroErrVisible(input) {
    await this.page.selectOption(operationFieldSelector, divideValue);
    await this.fillInputFields(input, '0');
    await this.page.click(calculateButtonSelector);
    const divByZeroErrVisible = await this.page.isVisible(divideByZeroErrorSel);
    return divByZeroErrVisible;
  }

  async nonNumericErrVisible(input) {
    await this.page.selectOption(operationFieldSelector, addValue);
    await this.fillInputFields(input, 'text');
    await this.page.click(calculateButtonSelector);
    const nonNumericErrVisible = await this.page.isVisible(nonNumericErrorSel);
    return nonNumericErrVisible;
  }

  async checkIntBox() {
    await this.page.check(intBoxSelector);
  }
};