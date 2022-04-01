const path = require('path')

module.exports = {
  mode:'production',
  entry:{
    dist:'/src/lib/index.ts',
    bin:'/src/bin/index.ts'
  },
  module:{
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output:{
    path:__dirname,
    filename:"[name]/index.js",
    library:"typegenerator",
    libraryTarget:"commonjs2",
  },

  target:'node',
  resolve:{
    extensions:['.ts','.js']
  }
};