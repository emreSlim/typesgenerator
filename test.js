const { printType } = require('typesgenerator');

console.log('\n-- test results --\n');

const o = {
  name: 'john doe',
  hobbies: [
    { name: 'coding', outdoor: false },
    { name: 'cycling', outdoor: true },
  ],
  age: 35,
  score: [0, 'A', ['1st']],
};

printType(o, 'Person');
