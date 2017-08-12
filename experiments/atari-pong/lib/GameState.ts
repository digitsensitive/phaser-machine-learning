/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


import { Player } from './Player'
import { Ball } from './Ball'


export class GameState extends Phaser.State {

  /* game objects */
  private paddleOne: Player;
  private paddleTwo: Player;
  private ball: Ball;

  /* environment */
  private centerLine: Phaser.Graphics;

  /* ui */
  private scores: number[] = [];
  private scoreTexts: Phaser.Text[] = [];

  private p1: number = 9;
  private p2: number = 10;

  init() {

    /* init game objects */
    this.paddleOne = undefined;
    this.paddleTwo = undefined;
    this.ball = undefined;

    /* ui */
    this.scores = [0, 0];
    this.scoreTexts = [];
    this.scoreTexts.push(this.game.add.text(200, 30, ""+this.scores[0], {font: "64px Connection", fill: "#fff"}));
    this.scoreTexts.push(this.game.add.text(560, 30, ""+this.scores[1], {font: "64px Connection", fill: "#fff"}));

    /* create and init our center line */
    this.centerLine = this.game.add.graphics(0,0);

    /* set the characteristics of the line */
    this.centerLine.lineStyle(4, 0xffffff, 0.6);
    this.centerLine.moveTo(this.world.centerX, 0);//moving position of graphic if you draw mulitple lines
    this.centerLine.lineTo(this.world.centerX, this.world.height);
    this.centerLine.endFill();

  }

  create(): void {
    console.log(this.game.world.centerX);
    /* create the game objects */
    this.paddleOne = new Player(this.game, 160, this.game.world.centerY, 1);
    this.paddleTwo = new Player(this.game, this.game.world.centerX + (400-160), this.game.world.centerY, 3);
    this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, 4, -4);

  }

  update(): void {

    /* if the ball hits the left wall */
    if (this.ball.getPos().x < 0) {
      this.updateScoreAndReset(1);
    }

    /* if the ball hits the right wall */
    if (this.ball.getPos().x > this.game.width - 8) {
      this.updateScoreAndReset(0);
    }

    /* collision check */
    this.game.physics.arcade.overlap(this.paddleOne, this.ball, this.paddleBallCollision, null, this);
    this.game.physics.arcade.overlap(this.paddleTwo, this.ball, this.paddleBallCollision, null, this);

    this.aiMovePaddle();

  }

  render() {

    /* render game objects */
    this.paddleOne.render();
    this.paddleTwo.render();
    this.ball.render();

  }

  private paddleBallCollision(_paddle, _ball): void {

    /* inverse the x-velocity */
    _ball.setVelX(-_ball.getVel().x);

  }

  private updateScoreAndReset(_player: number): void {

    /* get the x and y position of the font */
    let x;
    let y;

    if (_player == 0) { x = 200; y = 30;}
    else if (_player == 1) { x = 560; y = 30;}

    /* update the score and redraw */
    this.scores[_player]++;
    this.scoreTexts[_player].destroy();
    this.scoreTexts[_player] = this.game.add.text(x, y, ""+this.scores[_player], {font: "64px Connection", fill: "#fff"});

    /* reset ball position */
    this.ball.restart(_player);

  }

  private aiMovePaddle(): void {

    /* if paddle one simple computer ai */
    if (this.paddleOne.getTypePlayer() == 3) {
      if (this.paddleOne.getPos().y > this.ball.getPos().y+this.p1) {
        this.paddleOne.setMoveUp(true);

      }

      else if (this.paddleOne.getPos().y < this.ball.getPos().y-this.p1) {
        this.paddleOne.setMoveDown(true);
      }

      else {
        this.paddleOne.setMoveUp(false);
        this.paddleOne.setMoveDown(false);
      }
    }

    /* if paddle two simple computer ai */
    if (this.paddleTwo.getTypePlayer() == 3) {
      if (this.paddleTwo.getPos().y > this.ball.getPos().y+this.p2) {
        this.paddleTwo.setMoveUp(true);
      }

      else if (this.paddleTwo.getPos().y < this.ball.getPos().y-this.p2) {
        this.paddleTwo.setMoveDown(true);
      }

      else {
        this.paddleTwo.setMoveUp(false);
        this.paddleTwo.setMoveDown(false);
      }
    }

  }

}
