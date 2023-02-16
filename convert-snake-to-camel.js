function firstLetterUpperCase(input) {
  const firstLetter = input.at(0);
  const firstLetterUpperCase = firstLetter.toUpperCase();
  const stringWithoutFirstLetter = input.substr(1);
  return `${firstLetterUpperCase}${stringWithoutFirstLetter}`;
}

function convertSnakeToCamel(input) {
  const parts = input.split('_');
  const result = parts.map((part, index) => index > 0 ? firstLetterUpperCase(part) : part);
  return result.join('');
}

function testResult(input, value, expect) {
  console.log('input:', input, 'output:', value);
  if (value === expect) return true;
  throw new Error(`Era esperado ${expect} e foi obtido ${value}`);
}

const input1 = 'snake_case'
const input2 = 'java_script'
const input3 = 'ds_nome'
const input4 = 'nr_saldo_conta'
const input5 = 'cd_historico_conta'

const test1 = convertSnakeToCamel(input1);
const test2 = convertSnakeToCamel(input2);
const test3 = convertSnakeToCamel(input3);
const test4 = convertSnakeToCamel(input4);
const test5 = convertSnakeToCamel(input5);

testResult(input1, test1, 'snakeCase');
testResult(input2, test2, 'javaScript');
testResult(input3, test3, 'dsNome');
testResult(input4, test4, 'nrSaldoConta');
testResult(input5, test5, 'cdHistoricoConta');
