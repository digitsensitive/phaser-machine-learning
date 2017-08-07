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
  private scorePaddleOne: number;
  private scorePaddleTwo: number;
  private scoreTextPaddleOne: Phaser.Text;
  private scoreTextPaddleTwo: Phaser.Text;

  private p1: number = 9;
  private p2: number = 10;

  /*
   * FIRST FUNCTION CALLED WHEN THE STATE STARTS UP
   * ROUTE THE GAME AWAY TO ANOTHER STATE IF NECESSARY, PREPARE VARIABLES OR OBJECTS
   */
  init() {

    /* init game objects */
    this.paddleOne = undefined;
    this.paddleTwo = undefined;
    this.ball = undefined;

    /* ui */
    this.scorePaddleOne = 0;
    this.scorePaddleTwo = 0;
    this.scoreTextPaddleOne = this.game.add.text(200, 30, ""+this.scorePaddleOne, {font: "28px Finger Paint", fill: "#fff"});
    this.scoreTextPaddleTwo = this.game.add.text(580, 30, ""+this.scorePaddleTwo, {font: "28px Finger Paint", fill: "#fff"});

    /* create and init our center line */
    this.centerLine = this.game.add.graphics(0,0);

    /* set the characteristics of the line */
    this.centerLine.lineStyle(4, 0xffffff, 0.6);
    this.centerLine.moveTo(this.world.centerX,0);//moving position of graphic if you draw mulitple lines
    this.centerLine.lineTo(this.world.centerX,this.world.height);
    this.centerLine.endFill();

  }


  /*
   * IS CALLED AFTER INIT()
   * USE THIS TO LOAD YOUR GAME ASSETS. DON'T CREATE OBJECTS HERE IF THEY REQUIRE ASSETS
   */
  preload(): void {


  }

  /*
   * LOADUPDATE() IS CALLED DURING LOADER PROCESS -> AFTER PRELOAD()
   * ONLY HAPPENS IF ASSETS LOAD UP IN PRELOAD() METHOD
   */
  loadUpdate() { }

  /*
   * LOADRENDER() IS CALLED DURING LOADER PROCESS -> AFTER LOADUPDATE()
   * ONLY HAPPENS IF ASSETS LOAD UP IN PRELOAD() METHOD
   * IN CONTRAST TO RENDER() YOU MUST HERE BE SURE THE ASSETS EXISTS
   */
  loadRender() { }

  /*
   * CREATE() IS CALLED AFTER PRELOAD()
   * CREATE YOUR OBJECTS HERE
   */
  create(): void {
    this.paddleOne = new Player(this.game, 160, this.game.world.centerY, 3);
    this.paddleTwo = new Player(this.game, 620, this.game.world.centerY, 3);
    this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, 6, -6);
  }



  /*
   * UPDATE() IS CALLED DURING THE CORE GAME LOOP
   * AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
   * BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
   */
  update(): void {

    /* if the ball hits the left wall */
    if (this.ball.getPos().x < 0) {
      this.scorePaddleTwo++;
      this.scoreTextPaddleTwo.destroy();
      this.scoreTextPaddleTwo = this.game.add.text(580, 30, ""+this.scorePaddleTwo, {font: "28px Finger Paint", fill: "#fff"});
      this.ball.restart(1);
    }

    /* if the ball hits the right wall */
    if (this.ball.getPos().x > this.game.width - 8) {
      this.scorePaddleOne++;
      this.scoreTextPaddleOne.destroy();
      this.scoreTextPaddleOne = this.game.add.text(200, 30, ""+this.scorePaddleOne, {font: "28px Finger Paint", fill: "#fff"});
      this.ball.restart(2);
    }

    /* collision check */
    this.game.physics.arcade.overlap(this.paddleOne, this.ball, this.paddleBallCollision, null, this);
    this.game.physics.arcade.overlap(this.paddleTwo, this.ball, this.paddleBallCollision, null, this);

    /* if paddle one simple computer ai */
    if (this.paddleOne.getTypePlayer() == 3) {
      if (this.paddleOne.getPos().y > this.ball.getPos().y+this.p1) {
        this.paddleOne.setMoveUp(true);
        this.paddleOne.setMoveDown(false);
      }

      else if (this.paddleOne.getPos().y < this.ball.getPos().y-this.p1) {
        this.paddleOne.setMoveDown(true);
        this.paddleOne.setMoveUp(false);
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

  paddleBallCollision(_paddle, _ball): void {
    _ball.setVeloX(-_ball.getVeloX());
  }

  /*
   * PRERENDER() IS CALLED AFTER ALL GAME OBJECTS HAVE BEEN UPDATED, BUT BEFORE ANY RENDERING TAKES PLACE
   */
  preRender() { }

  /*
   * NEARLY ALL OBJECTS IN PHASER RENDER AUTOMATICALLY
   * RENDER() IS CALLED AFTER THE GAME RENDERER AND PLUGINS HAVE RENDERED, SO HERE DO FINAL POST-PRECESSING STYLE EFFECTS
   * HAPPENS BEFORE POSTRENDER()
   */
  render() {
    this.paddleOne.render();
    this.paddleTwo.render();
    this.ball.render();
  }

  /*
   * PAUSED() WILL BE CALLED IF THE CORE GAME LOOP IS PAUSED
   */
  paused() { }

  /*
   * PAUSEUPDATE() IS CALLED WHILE THE GAME IS PAUSED INSTEAD OF PREUPDATE, UPDATE AND POSTUPDATE
   */
  pauseUpdate() { }

  /*
   * IF GAME IS SET TO SCALEMODE RESIZE, THEN BROWSER WILL CALL RESIZE() EACH TIME RESIZE HAPPENS
   */
  resize() { }

  /*
   * RESUMED() IS CALLED WHEN THE CORE GAME LOOP RESUMES FROM A PAUSED STATE
   */
  resumed() { }

  /*
   * SHUTDOWN() WILL BE CALLED WHEN THE STATE IS SHUTDOWN (i.e. YOU SWITCH TO ANOTHER STATE FROM THIS ONE)
   */
  shutdown() {;
  }

}
