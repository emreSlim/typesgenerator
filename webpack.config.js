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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  output:{
    path:__dirname,
    filename:"[name]/index.js"
  },
  target:'node',
  resolve:{
    extensions:['.ts','.js']
  }
};