import { isKeyPlain, logWarning, toTitleCase } from '../utils';

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
  object: any,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string,
  indentation: string
) => {
  let typeString = '';
  
  if (Object.keys(object).length > 0) {
    let modelString = '{\n';

    if ( //if values of the object are same type
      Object.values(object).find(
        (value) =>
          typeof value!=='object' || value instanceof Array || value == null 
      )
    ) {
      for (let key in object) {
        const value = object[key];
        if (!isKeyPlain(key)) key = `"${key}"`;
        const subInterfaceName = declarationName + toTitleCase(key);

        


        if (typeof value !== 'object' || value instanceof Array) {
        
          const subInterface = getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            indentation + '  '
          );
          
          modelString += `${indentation}  ${key}: ${withNullCheck(subInterface)};\n`;
        } else {
          const subInterface = getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            ''
          );
          subInterfaces.set(subInterfaceName, subInterface);
          modelString += `${indentation}  ${key}: ${subInterfaceName};\n`;
        }
        if (!modelString.trim().endsWith(';')) modelString += ';\n';
      }
    } else {
      const values = Object.values(object) as any[];

      const valueModelKeys = new Set(Object.keys(values[0]));

      if (
        values.length < 2 ||
        values.find((value) =>
          Object.keys(value).find((valueKey) => !valueModelKeys.has(valueKey))
        )
      ) {
        for (let key in object) {
          const value = object[key];
          const subInterfaceName = declarationName + toTitleCase(key);

          const subInterface = getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            '  '
          );

          if (typeof value !== 'object' || value instanceof Array) {
            modelString += `${indentation}  ${key}: ${subInterface};\n`;
          } else {
            subInterfaces.set(subInterfaceName, subInterface);
            modelString += `${indentation}  ${key}: ${subInterfaceName};\n`;
          }
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

        const parentKeyName = declarationName
          .slice(declarationName.lastIndexOf(a[a.length - 1]))
          .toLowerCase();
        modelString += `${indentation}  [${parentKeyName}Key: string]: {\n`;

        for (let key in item) {
          const valueType = Array.from(item[key]).join(' | ');
          modelString += `${indentation + '    '}${key}: ${withNullCheck(
            valueType
          )};\n`;
        }
        modelString += `${indentation}  };\n`;
      }
    }

    typeString = declaration + modelString  + '};\n\n';
  } else {
    typeString = `Object;\n\n`;
  }
  return typeString;
};

const handleArray = (
  array: Array<any>,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string
) => {
  
  let typeString = '';
  const item = array[0];
  if (!(item instanceof Array) && item != null && item instanceof Object) {

    const subInterfaceName =  declarationName.trim().endsWith('s')?declarationName.slice(0,-1): declarationName + 'Item';
    
    const item: any = {};

   
    array.forEach((elem) =>
      Object.keys(elem).forEach((key) => {
        if (item[key] == null) {
          item[key] = new Set<any>();
        }
        const subSubInterfaceName = subInterfaceName + toTitleCase(key)
        const subSubInterface = getInterface(elem[key], subSubInterfaceName, subInterfaces, false)

        if(elem[key]==null || typeof elem[key]!=='object' || elem[key] instanceof Array){
          item[key].add(
            subSubInterface
            ); //fill the datum object with all the possible keys
        }else{
          
   
          item[key].add(
            subSubInterfaceName
            ); //fill the datum object with all the possible keys
          subInterfaces.set(subSubInterfaceName,subSubInterface)
        }

       
      })
    );
    let subInterface = '{\n';

    for (let key in item) {
      const valueType = Array.from(item[key]).map((t:string)=>(t.trim().endsWith(';'))?t.trim().slice(0,-1):t.trim()).join(' | ');
      subInterface += `  ${key}: ${withNullCheck(valueType)};\n`;
    }
    subInterface += '};\n\n';
    subInterfaces.set(subInterfaceName, subInterface);
    typeString = `${subInterfaceName}[]`;
  } else {
    const itemTypes = new Set<string>();
    array.forEach((elem) => {
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
    typeString = declaration + itemTypesString + '[]';
  }

  return typeString;
};

export const printType = (object: object, declarationName: string) =>
  console.log(getInterface(object, declarationName));

const withNullCheck = (typ: string) =>
  typ === 'null' || typ === 'undefined' ? 'unknown' : typ;
