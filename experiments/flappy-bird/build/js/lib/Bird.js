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
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(game, x, y, name) {
        var _this = _super.call(this, game, x, y, name) || this;
        /* SPRITE */
        _this.anchor.setTo(0, 0);
        _this.scale.setTo(3);
        /* ANIMATIONS */
        _this.anim = [];
        _this.anim.push(game.add.tween(_this).to({ angle: -20 }, 100));
        /* INPUT */
        _this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        _this.jumpKey.onDown.add(_this.jump, _this);
        /* PHYSICS */
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(_this);
        _this.body.gravity.y = 1000;
        _this.body.setSize(17, 12);
        /* finally add the new object to the game and return it */
        game.add.existing(_this);
        return _this;
    }
    /* GETTER AND SETTER */
    Bird.prototype.getPosition = function () { return this.position; };
    Bird.prototype.update = function () {
        if (this.angle < 20)
            this.angle += 1;
    };
    Bird.prototype.jump = function () {
        if (this.alive) {
            this.body.velocity.y = -350;
            this.anim[0].start();
        }
    };
    Bird.prototype.flap = function () {
        if (this.alive) {
            this.body.velocity.y = -350;
            this.anim[0].start();
        }
    };
    return Bird;
}(Phaser.Sprite));
exports.Bird = Bird;
