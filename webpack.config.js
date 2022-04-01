const path = require('path')

module.exports = {
  mode:'production',
  entry:{
    dist:'/src/lib/index.js',
    bin:'/src/bin/index.js'
  },
  output:{
    path:__dirname,
    filename:"[name]/index.js"
  },
  target:'node'
};