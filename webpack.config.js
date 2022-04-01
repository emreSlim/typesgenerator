const path = require('path')

module.exports = {
  mode:'production',
  entry:{
    lib:'/src/lib/index.js',
    bin:'/src/bin/index.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  }
};