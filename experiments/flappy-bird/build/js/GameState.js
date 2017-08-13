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
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* game objects */
    /* environment */
    /* ui */
    GameState.prototype.init = function () {
        /* init game objects */
        /* ui */
    };
    GameState.prototype.create = function () {
        /* create the game objects */
    };
    GameState.prototype.update = function () {
    };
    return GameState;
}(Phaser.State));
exports.GameState = GameState;
