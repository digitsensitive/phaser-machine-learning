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
var Bird_1 = require("./Bird");
var Pipe_1 = require("./Pipe");
var neuvol = new Neuroevolution({
    network: [2, [2], 1],
    population: 50
});
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
        this.game.stage.backgroundColor = '#71c5cf';
        /* ui */
        this.score = -1;
        this.scoreText = [];
        this.scoreText.push(this.game.add.text(this.game.world.centerX - 14, 30, "0", { font: "40px Connection", fill: "#000" }));
        this.scoreText.push(this.game.add.text(this.game.world.centerX - 16, 30, "0", { font: "40px Connection", fill: "#fff" }));
    };
    GameState.prototype.create = function () {
        /* create birds */
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
            var nextHoll;
            var dontGoFurthere = false;
            this.pipes.forEach(function (item) {
                if (item != undefined) {
                    if (item.getPosition().x + 30 > this.birds[0].getPosition().x && dontGoFurthere == false) {
                        nextHoll = (item.getHolePosition() * 60 + 60) / 600;
                        dontGoFurthere = true;
                    }
                }
            }, this);
            var inputs = [this.birds[i].getPosition().y / 600, nextHoll];
            var res = this.gen[i].compute(inputs);
            if (res > 0.5) {
                this.birds[i].flap();
            }
            if (this.birds[i].getPosition().y < 0 || this.birds[i].getPosition().y > 600) {
                this.birds[i].alive = false;
            }
            this.game.physics.arcade.overlap(this.birds[i], this.pipes, this.hitPipe, null, this);
            if (!this.birds[i].alive) {
                this.birds.splice(i, 1);
                neuvol.networkScore(this.gen[i], this.scoreNE);
                if (this.isItEnd()) {
                    this.restartGame();
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
            if (i != this.hole && i != this.hole + 1) {
                this.addOnePipe(400, i * 60, this.hole);
            }
        }
    };
    GameState.prototype.hitPipe = function () {
        /* If the bird has already hit a pipe, do nothing
           It means the bird is already falling off the screen */
        for (var i = 0; i < this.birds.length; i++) {
            if (this.birds[i].alive == false) {
                return;
            }
            /* Set the alive property of the bird to false */
            this.birds[i].alive = false;
        }
        /* Prevent new pipes from appearing */
        //this.game.time.events.remove(this.timer);
        /* Go through all the pipes, and stop their movement */
        //this.pipes.forEach(function(p) {
        //    p.body.velocity.x = 0;
        //}, this);
    };
    GameState.prototype.isItEnd = function () {
        if (this.birds.length == 0) {
            return true;
        }
        return false;
    };
    GameState.prototype.restartGame = function () {
        this.game.state.restart();
    };
    return GameState;
}(Phaser.State));
exports.GameState = GameState;
