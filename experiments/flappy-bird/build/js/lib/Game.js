"use strict";
/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
require("pixi");
require("p2");
require("phaser");
var GameState_1 = require("./GameState");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(aParams) {
        var _this = _super.call(this, aParams.width, aParams.height, aParams.renderer, aParams.parent, aParams.state, aParams.transparent, aParams.antialias, aParams.physicsConfig) || this;
        /* Phaser.StateManager.add -> Create States */
        _this.state.add('GameState', GameState_1.GameState, false);
        /* Load up the GameState State */
        _this.state.start('GameState');
        return _this;
    }
    Game.prototype.init = function () {
        /* this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; */
        /* this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; */
        /* .scale.scaleMode = 2; */
        /* this.scale.refresh(); */
    };
    return Game;
}(Phaser.Game));
exports.Game = Game;
// when the page has finished loading, create our game
window.onload = function () {
    var game = new Game({
        width: 400,
        height: 600,
        renderer: Phaser.CANVAS,
        parent: 'flappy-bird',
        transparent: false,
        antialias: false
    });
};
