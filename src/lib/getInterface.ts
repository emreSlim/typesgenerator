import { isKeyPlain, logWarning, toTitleCase } from '../utils';

export type InterfaceGenerator = (
  data: any,
  declarationName: string,
  subInterfaces?: Map<string, string>,
  isFirstStack?: boolean,
  indentation?:string
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
      subInterfaceString += `export type ${k} = ${v}`;
    });
    declarationName === 'Type' &&
      logWarning(
        'Type Name was not given. Type generated with dummy name: "Type"'
      );
  }
  return subInterfaceString + codeString;
};

const handleObject = (
  data: Array<any>,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string,
  indentation:string
) => {
  let codeString = '';
  if (Object.keys(data).length > 0) {
    let modelString = '{\n';

    if (
      Object.values(data).find(
        (value) =>
          value instanceof Array || value == null || !(value instanceof Object)
      )
    ) {
      for (let key in data) {
        const value = data[key];
        const subInterfaceName = declarationName + toTitleCase(key);
        if (!isKeyPlain(key)) key = `"${key}"`;
        const i_f = getInterface(
          value,
          subInterfaceName,
          subInterfaces,
          false,
          indentation+'  '
        )
        modelString += `${indentation}  ${key}: ${withNullCheck(i_f)}`;

        if (!modelString.trim().endsWith(';')) modelString += ';\n';
      }
    } else {
      const values = Object.values(data);

      const valueModelKeys = new Set(Object.keys(values[0]));

      if (
        values.length < 2 ||
        values.find((value) =>
          Object.keys(value).find((valueKey) => !valueModelKeys.has(valueKey))
        )
      ) {
        for (let key in data) {
          const value = data[key];
          const subInterfaceName = declarationName + toTitleCase(key);

          const subInterface = `${getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            '  '
          )}`;

          subInterfaces.set(subInterfaceName, subInterface);
          modelString += `${indentation}  ${key}: ${subInterfaceName};\n`;
        }
      } else {
        const item: any = {};

        for (let value of values) {
          for (let key in value) {
            if (item[key] == null) item[key] = new Set<string>();
            item[key].add(
              getInterface(value[key], declarationName, subInterfaces, false)
            );
          }
        }

        const a = declarationName.match(/[A-Z]/g);

        const parentKeyName = declarationName.slice(
          declarationName.lastIndexOf(a[a.length - 1])
        ).toLowerCase();
        modelString += `${indentation}  [${parentKeyName}Key: string]: {\n`;

        for (let key in item) {
          const valueType = Array.from(item[key]).join(' | ')
          modelString += `${indentation + '    '}${key}: ${withNullCheck(valueType)};\n`;
        }
        modelString += `${indentation}  };\n`;
      }
    }

    codeString = declaration + modelString + indentation + '};\n';
  } else {
    codeString = `Object;\n\n`;
  }
  return codeString;
};

const handleArray = (
  data: Array<any>,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string
) => {
  let codeString = '';
  const item = data[0];
  if (!(item instanceof Array) && item != null && item instanceof Object) {
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
      const valueType = Array.from(item[key]).join(' | ')
      subInterface += `  ${key}: ${withNullCheck(valueType)};\n`;
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
      itemTypesString = '(' + itemTypesString + ')';
    }
    codeString = declaration + itemTypesString + '[]';
  }

  return codeString;
};

export const printType = (data: object, declarationName: string) =>
  console.log(getInterface(data, declarationName));


const withNullCheck = (typ:string) => typ==='null'||typ==='undefined' ?'unknown':typ