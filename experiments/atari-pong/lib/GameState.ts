/**
* @author       Digitsensitive <digit.sensitivee@gmail.com>
* @copyright    2017 Digitsensitive
* @license      Digitsensitive
*/

import * as NE from '../node_modules/neuroevolution-typescript/main';

import { Player } from './Player'
import { Ball } from './Ball'


const neuvol: NE.Neuroevolution = new NE.Neuroevolution({
  network: [4, [2], 1],
  population: 50
});

var generation: number = 0;

export class GameState extends Phaser.State {

  /* neuroevolution */
  private gen: any[];

  /* game objects */
  private paddlesLeft: Player[];
  private aiPaddle: Player;
  private ball: Ball;

  /* environment */
  private centerLine: Phaser.Graphics;

  /* ui */
  private scores: number[] = [];
  private scoreTexts: Phaser.Text[] = [];

  /* variables */
  private p1: number = 9;
  private p2: number = 4;

  init() {

    /* init neuroevolution */
    this.gen = [];

    /* init game objects */
    this.paddlesLeft = [];
    this.aiPaddle = undefined;
    this.ball = undefined;

    /* ui */
    this.scores = [0, 0];
    this.scoreTexts = [];
    this.scoreTexts.push(this.game.add.text(200, 30, ""+this.scores[0], {font: "64px Connection", fill: "#fff"}));
    this.scoreTexts.push(this.game.add.text(560, 30, ""+this.scores[1], {font: "64px Connection", fill: "#fff"}));
    this.scoreTexts.push(this.game.add.text(550, 450, "0", {font: "28px Connection", fill: "#000"}));
    this.scoreTexts.push(this.game.add.text(550, 450, "0", {font: "28px Connection", fill: "#fff"}));

    /* create and init our center line */
    this.centerLine = this.game.add.graphics(0,0);

    /* set the characteristics of the line */
    this.centerLine.lineStyle(4, 0xFFFFFF, 1);
    for (var y = 0; y < this.game.world.height; y += 8 * 2) {
        this.centerLine.moveTo(this.game.world.centerX, y);
        this.centerLine.lineTo(this.game.world.centerX, y + 8);
    }

  }

  create(): void {

    /* create texts */
    generation++;
    this.scoreTexts[2].text = "Generation: "+generation;
    this.scoreTexts[3].text = "Generation: "+generation;

    /* create the game objects */
    this.gen = neuvol.nextGeneration();
    for (let i in this.gen) {
    	let p = new Player(this.game, 160, this.game.world.centerY, 4);
    	this.paddlesLeft.push(p);
    }

    this.aiPaddle = new Player(this.game, this.game.world.centerX + (400-160), this.game.world.centerY, 3);
    this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, 4, -2);

  }

  update(): void {

    /* neuroevolution integration paddles left */
    for (let i = 0; i < this.paddlesLeft.length; i++) {
      if (this.paddlesLeft[i].alive) {

        var inputs = [
          this.paddlesLeft[i].getPos().y / this.game.world.height,
          this.ball.getPos().y / this.game.world.height,
          this.ball.getPos().x - this.paddlesLeft[i].getPos().x,
          this.ball.getPos().y - this.paddlesLeft[i].getPos().y];

        var res = this.gen[i].compute(inputs);

        if (res > 0.5) {
          this.paddlesLeft[i].goUp();
        }

        else {
          this.paddlesLeft[i].goDown();
        }


        this.aiMovePaddle();

        /* collision check */
        this.game.physics.arcade.collide(this.paddlesLeft[i], this.ball, this.collisionPaddleBall, null, this);
        this.game.physics.arcade.collide(this.aiPaddle, this.ball, this.collisionAIPaddleBall, null, this);

        /* check if ball is coming from the left */
        /* reset boolean, if so */
        if (this.ball.getVel().x > 0) {
          if (!this.paddlesLeft[i].getHit()) {
            this.paddlesLeft[i].alive = false;
          }
        }

        else {
          this.paddlesLeft[i].setHit(false);
        }

        if (!this.paddlesLeft[i].alive) {
          neuvol.networkScore(this.gen[i], this.paddlesLeft[i].getScore());

          if (this.isItEnd()) {
            this.restartGame();
          }
        }
      }
    }

    /* if the ball hits the left or right wall */
    if (this.ball.getPos().x < 0 || this.ball.getPos().x > this.game.width - 8) {
      this.restartGame();
    }

  }

  render() {

    /* render game objects */
    for (let i = 0; i < this.paddlesLeft.length; i++) {
      if (this.paddlesLeft[i].alive) {
        this.paddlesLeft[i].render();
      }
    }

    this.aiPaddle.render();
    this.ball.render();

  }

  private aiMovePaddle(): void {

  if (this.aiPaddle.getTypePlayer() == 3) {
    if (this.aiPaddle.getPos().y > this.ball.getPos().y+this.p2) {
      this.aiPaddle.setMoveUp(true);
    }

    else if (this.aiPaddle.getPos().y < this.ball.getPos().y-this.p2) {
      this.aiPaddle.setMoveDown(true);
    }

    else {
      this.aiPaddle.setMoveUp(false);
      this.aiPaddle.setMoveDown(false);
    }
  }

}

  private collisionPaddleBall(_paddle, _ball): void {

    /* inverse the x-velocity */
    if (_ball.getVel().x < 0) {
      _ball.setVelX(-_ball.getVel().x);
      _paddle.setScore();
      _paddle.setHit(true);
    }

  }

  private collisionAIPaddleBall(_paddle, _ball): void {

    /* inverse the x-velocity */
    _ball.setVelX(-_ball.getVel().x);

  }


  private isItEnd(): boolean {

    for (let i in this.paddlesLeft) {

        if(this.paddlesLeft[i].alive){
          return false;
        }

    }

    return true;

  }

  private restartGame(): void {
    this.game.state.restart();
  }

}
