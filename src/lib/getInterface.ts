import { isKeyPlain, logWarning, toTitleCase } from '../utils';

export type InterfaceGenerator = (
  data: any,
  declarationName: string,
  subInterfaces?: Map<string, string>,
  isFirstStack?: boolean
) => string;

export const getInterface: InterfaceGenerator = (
  data,
  declarationName,
  subInterfaces = new Map(),
  isFirstStack = true
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
      codeString = declaration + 'unknown';
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
      if (data == null) codeString = declaration + 'unknown';
      else if (data instanceof Array) {
        const item = data[0];
        if (
          !(item instanceof Array) &&
          item != null &&
          item instanceof Object
        ) {
          const subInterfaceName = declarationName + 'Item';
          const subInterface = getInterface(
            item,
            subInterfaceName,
            subInterfaces,
            false
          );
          subInterfaces.set(subInterfaceName, subInterface);

          codeString += `${subInterfaceName}[]`;
        } else {
          codeString =
            declaration +
            getInterface(item, declarationName, subInterfaces, false) +
            '[]';
        }
      } else if (data.constructor.name === 'Object') {
        if (Object.keys(data).length > 0) {
          let modelString = '{\n';
          for (let key in data) {
            const value = data[key];
            const subInterfaceName = declarationName + toTitleCase(key);
            if (!isKeyPlain(key)) key = `"${key}"`;
            if (
              !(value instanceof Array) &&
              value != null &&
              value instanceof Object
            ) {
              const subInterface = `${getInterface(
                value,
                subInterfaceName,
                subInterfaces,
                false
              )}`;
              subInterfaces.set(subInterfaceName, subInterface);
              modelString += `  ${key}: ${subInterfaceName};\n`;
            } else {
              modelString += `  ${key}: ${getInterface(
                value,
                subInterfaceName,
                subInterfaces,
                false
              )};\n`;
            }
            codeString = declaration + modelString + '};\n\n';
          }
        } else {
          codeString = `Object;\n\n`;
        }
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
      subInterfaceString += `export type ${k} = ${v}`;
    });
    declarationName === 'Type' &&
      logWarning(
        'Type Name was not given. Type generated with dummy name: "Type"'
      );
  }

  return subInterfaceString + codeString;
};
