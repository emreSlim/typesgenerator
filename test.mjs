import {printType} from './dist/lib/index.js'

const o = {
  name:'test',
  arr:[{name:[{value:"imran"}]},{name:null,age:25}]
}

printType(o)