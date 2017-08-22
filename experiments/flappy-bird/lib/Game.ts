/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>


import 'pixi';
import 'p2';
import 'phaser';


import { GameState } from './GameState'


interface IGameConstructor {
  width: string | number;
  height: string | number;
  renderer?: number;
  parent: string;
  state?: any;
  transparent?: boolean;
  antialias?: boolean;
  physicsConfig?: any;
}

export class Game extends Phaser.Game {

  constructor(aParams: IGameConstructor) {
		super(aParams.width,
      aParams.height,
      aParams.renderer,
      aParams.parent,
      aParams.state,
      aParams.transparent,
      aParams.antialias,
      aParams.physicsConfig);

    /* Phaser.StateManager.add -> Create States */
    this.state.add('GameState', GameState, false);


    /* Load up the GameState State */
    this.state.start('GameState');
  }

  init() {
    /* this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; */
    /* this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; */
    /* .scale.scaleMode = 2; */
    /* this.scale.refresh(); */
  }

}


// when the page has finished loading, create our game
window.onload = () => {
var game = new Game({
  width: 405,
  height: 600,
  renderer: Phaser.CANVAS,
  parent: 'flappy-bird',
  transparent: false,
  antialias: false
  });
}
