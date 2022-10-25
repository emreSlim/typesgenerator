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
