import lib from './dist/lib/index.js';

const { printType } = lib;

const o = {
  name: 'john doe',
  hobbies: [
    { name: 'coding', outdoor: false },
    { name: 'Cycling', outdoor: true },
  ],
  age: 35,
};

printType(o, 'Person');
