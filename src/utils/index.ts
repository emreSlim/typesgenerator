import * as path from 'path'
import * as fs from 'fs'
import { getInterface } from '../lib/getInterface'


//  suffix \x1b[0m for reset,  \x1b[4 for bg and \x1b[3 for fg color
export function logWarning(...args:any){
  console.log('\x1b[33m','Warning:',...args,'\x1b[0m')
}

export function logError(...args:any){
console.log('\x1b[41m','\x1b[37m','Error:',...args,'\x1b[0m')
}

export function isArgumentAKey(str: string) {
  return str.startsWith('-');
}

export function isKeyPlain(key:string){
  return !/\W/.test(key)
}

export function toTitleCase(string:string) {
  return string[0].toUpperCase() + string.slice(1);
}



export function createInterfaceFile(data:any,typeName:string,sourcePath:string,targetPath:string){
  const string = getInterface(JSON.parse(data), typeName);
  if (!targetPath) targetPath = path.dirname(sourcePath);
  const inputFileName = path.basename(sourcePath, '.json');
  const outFileName =
    typeName?.toLowerCase() ?? inputFileName.toLowerCase();
  const outputPath: string = path.resolve(
    targetPath,
    outFileName + '.ts'
  );
  fs.writeFile(outputPath, string, { encoding: 'utf-8' }, () => {
    console.log('Type file generated successfully:', outputPath);
  });
}

