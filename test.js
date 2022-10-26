const { printType } = require('typesgenerator');
const sampleJson = require('./person.json');

console.log('\n-- test results --\n');

printType(sampleJson, 'Person');
