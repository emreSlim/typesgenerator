import { isKeyPlain, toTitleCase, withNullCheck } from '../../utils';
import { getInterface } from '../getInterface';


export const handleObject = (
  object: any,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string,
  indentation: string
) => {
  let typeString = '';

  if (Object.keys(object).length > 0) {
    let modelString = '{\n';

    if (objectHasNullOrArrayValues(object)) {
      for (let [key, value] of Object.entries(object)) {
        if (!isKeyPlain(key)) key = `"${key}"`;

        const subInterfaceName = declarationName + toTitleCase(key);

        if (value==null || typeof value !== 'object' || value instanceof Array) {
          const subInterface = getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            indentation + '  '
          );

          modelString += `${indentation}  ${key}: ${withNullCheck(
            subInterface
          )};\n`;
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

      if (!areObjectValuesSameType(object)) {

        for (let [key,value] of Object.entries(object)) {
          const subInterfaceName = declarationName + toTitleCase(key);

          const subInterface = getInterface(
            value,
            subInterfaceName,
            subInterfaces,
            false,
            '  '
          );

          if (value==null || typeof value !== 'object' || value instanceof Array) {
            modelString += `${indentation}  ${key}: ${subInterface};\n`;
          } else {
            subInterfaces.set(subInterfaceName, subInterface);
            modelString += `${indentation}  ${key}: ${subInterfaceName};\n`;
          }
        }
      } else {
        //if value objects are of same type
        const item: {[key:string]:Set<string>} = {};

        for (let value of Object.values(object)) {
          for (let [k,v] of Object.entries(value) ) {

            if (item[k] == null) item[k] = new Set<string>();
            item[k].add(
              getInterface(v, declarationName, subInterfaces, false)
            );
          }
        }
        
        modelString += `${indentation}  [${getParenyKeyName(declarationName)}Key: string]: {\n`;

        for (let [key,value] of Object.entries(item)) {
          const valueType = Array.from(value).join(' | ');

          modelString += `${indentation + '    '}${key}: ${withNullCheck(
            valueType
          )};\n`;
        }
        modelString += `${indentation}  };\n`;
      }
    }

    typeString = declaration + modelString + '};\n\n';
  } else {
    typeString = `Object;\n\n`;
  }
  return typeString;
};


const getParenyKeyName = (str:string) => {
  const a = str.match(/[A-Z]/g);

 return str
    .slice(str.lastIndexOf(a[a.length - 1]))
    .toLowerCase();
}

const areObjectValuesSameType = (object:any) => {
  const values = Object.values(object);
  if (values.length < 3) {
    return false;
  } else if (values.findIndex((v) => v == null)!=-1) {
    return false;
  } else {
    const sampleVal = values.find((v) => v != null);

    const valueModelKeys = new Set(
      sampleVal != null ? Object.keys(sampleVal) : []
    );

    return !values.find(
      (value) =>
        value != null &&
        Object.keys(value).find((valueKey) => !valueModelKeys.has(valueKey))
    );
  }
};

const objectHasNullOrArrayValues = (object: any) => {
  return !!Object.values(object).find(
    (value) =>
      typeof value !== 'object' || value instanceof Array || value == null
  );
};

