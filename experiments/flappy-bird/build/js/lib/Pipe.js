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
var Pipe = (function (_super) {
    __extends(Pipe, _super);
    function Pipe(game, x, y, name, hole) {
        var _this = _super.call(this, game, x, y, name) || this;
        /* VARIABLES */
        _this.holePosition = hole;
        /* SPRITE */
        _this.anchor.setTo(0, 0);
        /* PHYSICS */
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(_this);
        _this.body.setSize(50, 60);
        _this.body.velocity.x = -200;
        /* automatically kill the pipe when it's no longer visible */
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;
        /* finally add the new object to the game and return it */
        game.add.existing(_this);
        return _this;
    }
    /* GETTER AND SETTER */
    Pipe.prototype.getHolePosition = function () { return this.holePosition; };
    Pipe.prototype.getPosition = function () { return this.position; };
    Pipe.prototype.update = function () { };
    Pipe.prototype.render = function () { };
    return Pipe;
}(Phaser.Sprite));
exports.Pipe = Pipe;
