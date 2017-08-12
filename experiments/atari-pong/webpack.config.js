var path = require('path');

// Phaser webpack config
var phaserPath = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserPath, 'build/custom/phaser-split.js');
var pixi = path.join(phaserPath, 'build/custom/pixi.js');
var p2 = path.join(phaserPath, 'build/custom/p2.js');

module.exports = {
  entry: './lib/Game.ts',
  output: {
    filename: './build/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
      { test: /p2\.js/, loader: 'expose-loader?p2' }
    ]
  }
}
