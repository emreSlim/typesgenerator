import {
  isKeyPlain,
  logWarning,
  replaceAll,
  toTitleCase,
  withNullCheck,
} from '../utils';
import { handleArray } from './handlers/handleArray';
import { handleObject } from './handlers/handleObject';

export type InterfaceGenerator = (
  data: any,
  declarationName: string,
  subInterfaces?: Map<string, string>,
  isFirstStack?: boolean,
  indentation?: string
) => string;

export const getInterface: InterfaceGenerator = (
  data,
  declarationName,
  subInterfaces = new Map(),
  isFirstStack = true,
  indentation = ''
) => {
  if (declarationName == null) {
    declarationName = 'Type';
  } else if (declarationName.length) {
    declarationName = toTitleCase(declarationName);
  }

  let codeString = '';
  const declaration = isFirstStack ? `export type ${declarationName} = ` : '';
  switch (typeof data) {
    case 'boolean':
      codeString = declaration + 'boolean';
      break;
    case 'number':
      codeString = declaration + 'number';
      break;
    case 'string':
      codeString = declaration + 'string';
      break;
    case 'undefined':
      codeString = declaration + 'undefined';
      break;
    case 'function':
      {
        const args: string[] = data.toString().split(/\(|\)/)[1].split(',');
        codeString =
          declaration +
          `(${args
            .map((arg) => (arg ? arg + ': any' : ''))
            .join()}) => unknown;\n\n`;
      }
      break;
    case 'object':
      if (data == null) codeString = declaration + 'null';
      else if (data instanceof Array) {
        codeString += handleArray(
          data,
          declarationName,
          subInterfaces,
          declaration
        );
      } else if (data.constructor.name === 'Object') {
        codeString += handleObject(
          data,
          declarationName,
          subInterfaces,
          declaration,
          indentation
        );
      } else {
        codeString =
          declaration +
          data.constructor.name +
          '  //add the argument(s) if type is Generic';
      }
      break;
    default:
      codeString = declaration + 'unknown';
  }

  let subInterfaceString = '';
  if (isFirstStack) {
    subInterfaces.forEach((v, k) => {
      if (!isKeyPlain(k)) k = `"${k}"`;
      subInterfaceString += `\nexport type ${k} = ${v}`;
    });
    declarationName === 'Type' &&
      logWarning(
        'Type Name was not given. Type generated with dummy name: "Type"'
      );
  }

  return replaceAll(
    replaceAll(subInterfaceString + codeString, /\n+/g, '\n'),
    '\nexport',
    '\n\nexport'
  );
};

export const printType = (object: object, declarationName: string) =>
  console.log(getInterface(object, declarationName).trim());
