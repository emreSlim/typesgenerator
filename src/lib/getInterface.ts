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
      if (data == null) codeString = declaration + 'null';
      else if (data instanceof Array) {
        const item = data[0];
        if (
          !(item instanceof Array) &&
          item != null &&
          item instanceof Object
        ) {
          const subInterfaceName = declarationName + 'Item';
          const item: any = {};
          data.forEach((elem) =>
            Object.keys(elem).forEach((key) => {
              if (item[key] == null) {
                item[key] = new Set<any>();
              }
              item[key].add(
                getInterface(elem[key], subInterfaceName, subInterfaces, false)
              ); //fill the datum object with all the possible keys
            })
          );

          let subInterface = '{\n';

          for (let key in item) {
            subInterface += `${key}: ${Array.from(item[key]).join(' | ')};\n`;
          }
          subInterface += '};\n\n';
          subInterfaces.set(subInterfaceName, subInterface);

          codeString += `${subInterfaceName}[]`;
        } else {
          const itemTypes = new Set<string>();
          data.forEach((elem) => {
            const itemType = getInterface(
              elem,
              declarationName,
              subInterfaces,
              false
            );
            itemType != 'unknown' && itemTypes.add(itemType);
          });

          let itemTypesString = Array.from(itemTypes).join(' | ');

          if (itemTypes.size > 1) {
            itemTypesString = '('+(itemTypesString)+(')');
          }
          codeString = declaration+(itemTypesString)+('[]');
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

export const printType = (data: object, declarationName: string) =>
  console.log(getInterface(data, declarationName));
