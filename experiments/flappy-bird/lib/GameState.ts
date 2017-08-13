/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

import { Bird } from './Bird';
import { Pipe } from './Pipe';

export class GameState extends Phaser.State {

  /* game objects */
  private bird: Bird;
  private pipes: Phaser.Group;

  /* variables */
  private timer: Phaser.TimerEvent;

  /* ui */
  private score: number;
  private scoreText: Phaser.Text[];

  preload() {
    this.game.load.image("bird", "../assets/sprites/bird.png");
    this.game.load.image("pipe", "../assets/sprites/pipe.png");
  }

  init() {

    /* init game objects */
    this.bird = undefined;
    this.pipes = this.game.add.group();

    /* variables */
    this.timer = undefined;
    this.game.stage.backgroundColor = '#71c5cf';

    /* ui */
    this.score = -1;
    this.scoreText = [];
    this.scoreText.push(this.game.add.text(this.game.world.centerX-14, 30, "0", {font: "40px Connection", fill: "#000"}));
    this.scoreText.push(this.game.add.text(this.game.world.centerX-16, 30, "0", {font: "40px Connection", fill: "#fff"}));

  }

  create(): void {

    /* create the game objects */
    this.bird = new Bird(this.game, 80, this.game.world.centerY, 'bird');

    /* timer for creating pipes */
    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

  }

  update(): void {

    if (this.bird.getPosition().y < 0 || this.bird.getPosition().y > 600) {
        this.restartGame();
    }

    this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);


  }

  private addOnePipe(x, y): void {

    /* create a pipe at the position x and y */
    let pipe = new Pipe(this.game, x, y, 'pipe');

    /* add pipe to group */
    this.pipes.add(pipe);

  }

  private addRowOfPipes(): void {

    /* update the score */
    this.score += 1;
    this.scoreText[0].text = this.scoreText[1].text = ""+this.score;

    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (let i = 0; i < 10; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60);
      }
    }
  }

  private hitPipe(): void {
    /* If the bird has already hit a pipe, do nothing
       It means the bird is already falling off the screen */
    if (this.bird.alive == false) {
      return;
    }

    /* Set the alive property of the bird to false */
    this.bird.alive = false;

    /* Prevent new pipes from appearing */
    this.game.time.events.remove(this.timer);

    /* Go through all the pipes, and stop their movement */
    this.pipes.forEach(function(p) {
        p.body.velocity.x = 0;
    }, this);
  }

  private restartGame(): void {
    this.game.state.restart();
  }


}
