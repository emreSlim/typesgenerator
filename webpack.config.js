const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    lib: '/src/lib/index.ts',
    bin: '/src/bin/index.ts',
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js',
    libraryTarget: 'umd',
    library: 'typesgenerator',
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
