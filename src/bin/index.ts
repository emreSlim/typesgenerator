#!/usr/bin/env node

import * as fs from 'fs'
import {getInterface} from '../lib/getInterface'


const args:string[] = process.argv.slice(2)

let sourcePath,targetPath,typeName :string;

for(let i=0;i<args.length;i++){
  let arg = args[i]
  const nextArg = args[i+1]

  if(isArgumentKey(arg) && !isArgumentKey(nextArg)){
    arg = arg.toLowerCase();
      switch(arg){
        case '-s':
        case '--source-path':
          sourcePath = nextArg;break;
        case '-t':
        case '--target-path':
          targetPath = nextArg;break;
          case '-n':
            case '--type-name':
              typeName = nextArg;break;
      }
      i++;//skip next
  }else{continue}
}

function isArgumentKey(str:string){
  return str.startsWith('-')
}

try{
if(sourcePath){

  if(fs.existsSync(sourcePath)){
   fs.readFile(sourcePath,'utf-8',(err:NodeJS.ErrnoException,data:string)=>{
      if(err){
        throw err;
      }else{
        !typeName && logWarning('Type Name is not given. Type generated with dummy name.')
        const string = getInterface(JSON.parse(data),typeName)
        console.log(string)
      }
   })
    
  }else{
    throw new Error("given source path doesn't exist");
  }
}else{
  throw new Error("source path to JSON not given");
}
}catch(e){
  logError(e.message)
}


//  suffix \x1b[0m for reset,  \x1b[4 for bg and \x1b[3 for fg color

function logWarning(...args:any){
    console.log('\x1b[33m','Warning:',...args,'\x1b[0m')
}

function logError(...args:any){
  console.log('\x1b[41m','\x1b[37m','Error:',...args,'\x1b[0m')
}