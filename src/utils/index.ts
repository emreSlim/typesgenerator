//  suffix \x1b[0m for reset,  \x1b[4 for bg and \x1b[3 for fg color
export function logWarning(...args: any) {
  console.log('\x1b[33m', 'Warning:', ...args, '\x1b[0m');
}

export function logError(...args: any) {
  console.log('\x1b[41m', '\x1b[37m', 'Error:', ...args, '\x1b[0m');
}

export function isArgumentAKey(str: string) {
  return str.startsWith('-');
}

export function isKeyPlain(key: string) {
  return !/\W/.test(key);
}

export function toTitleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const withNullCheck = (type: string) =>
  type === 'null' || type === 'undefined' ? 'unknown' : type;

export const replaceAll = (
  str: string,
  subStr: string | RegExp,
  repStr: string
) => {
  return str.split(subStr).join(repStr);
};
