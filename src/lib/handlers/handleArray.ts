import { toTitleCase, withNullCheck } from '../../utils';
import { getInterface } from '../getInterface';

export const handleArray = (
  array: Array<any>,
  declarationName: string,
  subInterfaces: Map<string, string>,
  declaration: string
) => {
  let typeString = '';
  const item = array[0];

  if (!(item instanceof Array) && item != null && item instanceof Object) {
    //if elements are object
    const subInterfaceName = declarationName.trim().endsWith('s')
      ? declarationName.slice(0, -1)
      : declarationName + 'Item';

    const item: { [key: string]: Set<any> } = {};

    for (let elem of array) {
      for (let [k, v] of Object.entries(elem)) {
        if (item[k] == null) {
          item[k] = new Set<any>();
        }

        const subSubInterfaceName = subInterfaceName + toTitleCase(k);
        const subSubInterface = getInterface(
          v,
          subSubInterfaceName,
          subInterfaces,
          false
        );
        if (v == null || typeof v !== 'object' || v instanceof Array) {
          item[k].add(subSubInterface); //fill the datum object with all the possible keys
        } else {
          item[k].add(subSubInterfaceName); //fill the datum object with all the possible keys
          subInterfaces.set(subSubInterfaceName, subSubInterface);
        }
      }
    }

    let subInterface = '{\n';

    for (let key in item) {
      const valueType = Array.from(item[key])
        .map((t: string) =>
          t.trim().endsWith(';') ? t.trim().slice(0, -1) : t.trim()
        )
        .join(' | ');
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
