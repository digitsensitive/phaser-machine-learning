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
var NE = require("../node_modules/neuroevolution-typescript/main");
var Bird_1 = require("./Bird");
var Pipe_1 = require("./Pipe");
var neuvol = new NE.Neuroevolution({
    network: [2, [2], 1],
    population: 50
});
var generation = 0;
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameState.prototype.preload = function () {
        this.game.load.image("bird", "../assets/sprites/bird.png");
        this.game.load.image("pipe", "../assets/sprites/pipe.png");
    };
    GameState.prototype.init = function () {
        /* init neuroevolution */
        this.gen = [];
        this.scoreNE = 0;
        this.maxScore = 0;
        /* init game objects */
        this.birds = [];
        this.pipes = this.game.add.group();
        /* variables */
        this.timer = undefined;
        this.hole = 0;
        this.dead = 0;
        this.game.stage.backgroundColor = '#56bcc8';
        /* ui */
        this.score = -1;
        this.scoreText = [];
        this.scoreText.push(this.game.add.text(this.game.world.centerX - 14, 30, "0", { font: "40px Connection", fill: "#000" }));
        this.scoreText.push(this.game.add.text(this.game.world.centerX - 16, 30, "0", { font: "40px Connection", fill: "#fff" }));
        this.scoreText.push(this.game.add.text(this.game.world.centerX - 16, 500, "0", { font: "40px Connection", fill: "#fff" }));
    };
    GameState.prototype.create = function () {
        /* create birds */
        generation++;
        this.scoreText[2].text = "" + generation;
        this.gen = neuvol.nextGeneration();
        for (var i in this.gen) {
            var b = new Bird_1.Bird(this.game, 80, this.game.world.centerY, 'bird');
            this.birds.push(b);
        }
        /* create the game objects */
        //this.bird = new Bird(this.game, 80, this.game.world.centerY, 'bird');
        /* timer for creating pipes */
        this.addRowOfPipes();
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
    };
    GameState.prototype.update = function () {
        for (var i = 0; i < this.birds.length; i++) {
            if (this.birds[i].alive) {
                var nextHoll;
                var dontGoFurthere = false;
                this.pipes.forEach(function (item) {
                    if (item != undefined) {
                        if (item.getPosition().x + 30 > this.birds[0].getPosition().x && dontGoFurthere == false) {
                            nextHoll = (item.getHolePosition() * 60) / this.game.world.height;
                            dontGoFurthere = true;
                        }
                    }
                }, this);
                var inputs = [this.birds[i].getPosition().y / this.game.world.height, nextHoll];
                var res = this.gen[i].compute(inputs);
                if (res > 0.5) {
                    this.birds[i].flap();
                }
                if (this.birds[i].getPosition().y < 0 || this.birds[i].getPosition().y > this.game.world.height) {
                    this.birds[i].alive = false;
                }
                this.game.physics.arcade.overlap(this.birds[i], this.pipes, this.hitPipe, null, this);
                if (!this.birds[i].alive) {
                    neuvol.networkScore(this.gen[i], this.scoreNE);
                    if (this.isItEnd()) {
                        this.restartGame();
                    }
                }
            }
        }
        this.scoreNE++;
        this.maxScore = (this.scoreNE > this.maxScore) ? this.scoreNE : this.maxScore;
    };
    GameState.prototype.addOnePipe = function (x, y, hole) {
        /* create a pipe at the position x and y */
        var pipe = new Pipe_1.Pipe(this.game, x, y, 'pipe', hole);
        /* add pipe to group */
        this.pipes.add(pipe);
    };
    GameState.prototype.addRowOfPipes = function () {
        /* update the score */
        this.score += 1;
        this.scoreText[0].text = this.scoreText[1].text = "" + this.score;
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        this.hole = Math.floor(Math.random() * 5) + 1;
        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 10; i++) {
            if (i != this.hole && i != (this.hole + 1) && i != (this.hole + 2)) {
                this.addOnePipe(400, i * 60, this.hole);
            }
        }
    };
    GameState.prototype.hitPipe = function (_bird) {
        _bird.alive = false;
    };
    GameState.prototype.isItEnd = function () {
        for (var i in this.birds) {
            if (this.birds[i].alive) {
                return false;
            }
        }
        return true;
    };
    GameState.prototype.restartGame = function () {
        this.game.state.restart();
    };
    GameState.prototype.render = function () {
        //   this.pipes.forEachAlive(this.renderGroup, this);
        //   for (let i = 0; i < this.birds.length; i++) {
        //        this.renderGroup(this.birds[i]);
        //   }
    };
    GameState.prototype.renderGroup = function (member) {
        // this.game.debug.body(member);
    };
    return GameState;
}(Phaser.State));
exports.GameState = GameState;
