# Typesgenerator

Typesgenerator helps in creating typescript types/interfaces from JSON or JavaScript-object.

## Installation and Usage

- ### As Package: To use a function for printing type:

```bash
npm i -D typesgenerator
```

Below is usage example for printing the type from the javascript/json object:

```js
import { printType } from 'typesgenerator';

const object = {
  name: 'john doe',
  hobbies: [
    { name: 'coding', outdoor: false },
    { name: 'cycling', outdoor: true },
  ],
  age: 35,
  score: [0, 'A', ['1st']],
};

printType(object, 'Person');

//console output:
/*
export type PersonHobbie = {
  name: string;
  outdoor: boolean;
};

export type Person = {
  name: string;
  hobbies: PersonHobbie[];
  age: number;
  score: (number | string | string[])[];
};
*/
```

- ### As CLI: To create a typescript file from JSON:

```bash
npm i -g typesgenerator
```

Below is the usage example that will create a new file containing types:

```bash
tg -n <Type name> -s <path-to-json> -t <path-to-target-directory>
```

Below are the suppored arguments:

- `-n` or `-N` or `--type-name` : Name to be given to type
- `-s` or `-S` or `--source-path` : path to the json
- (optional )`-t` or `-T` or `--target-path` : path to the type-file to be generated

GitHub: https://github.com/emreSlim/typescript-types-generator

Issues: https://github.com/emreSlim/typescript-types-generator/issues
