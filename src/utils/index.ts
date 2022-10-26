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

export const getNameFromNonPlainKey = (str: string) => {
  return str.split(/\W+/).join('');
};

export const mergeInterfaces = (str1: string, str2: string) => {
  const mainMap = getMapFromInterfaceString(str1);
  const map2 = getMapFromInterfaceString(str2);

  map2.forEach((typ, key) => {
    if (mainMap.has(key)) {
      let oldTyp = mainMap.get(key) as string;
      if (oldTyp != typ) {
        oldTyp += `| ${typ}`;
      }
      mainMap.set(key, oldTyp);
    } else {
      mainMap.set(key, typ);
    }
  });
  return getInterfaceStringFromMap(mainMap);
};

const getMapFromInterfaceString = (str: string) => {
  const map = new Map<string, string>();
  str = replaceAll(str, /\{|\}/, '');

  str
    .trim()
    .split(';')
    .forEach((line) => {
      line = line.trim();
      if (!line) return;
      const lastIndex = line.lastIndexOf(':');
      const key = line.slice(0, lastIndex);
      const typ = line.slice(lastIndex + 1, line.length);

      map.set(key.trim(), typ?.trim());
    });

  return map;
};

const getInterfaceStringFromMap = (map: Map<string, string>) => {
  let str = '{\n';
  map.forEach((typ, key) => {
    str += `  ${key}`;
    str += `: ${typ};\n`;
  });
  str += '}\n';
  return str;
};
