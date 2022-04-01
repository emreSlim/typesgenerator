#!/usr/bin/env node

const fs = require('fs')

const commands = process.argv.slice(2)

const [typeName,sourcePath,targetPath] = commands;

if(sourcePath){

  if(fs.existsSync(sourcePath)){
    console.log('exists')
  }else{
    console.log('doesnt exist')
  }
    
}