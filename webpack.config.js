const path = require('path')

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build')
  }
}
