import {printType} from './dist/lib/index.js'

const o = {
a:[ {
   name:'',
   age:1,
 },
{
  name:'',
  age:[1,""],
}]

}

printType(o)