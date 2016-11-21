module.exports = {
  entry: {
    'd3-tip': './src/index.js'
  },
  output: {
    path: __dirname,
    filename: "./index.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
    ]
  }
};
