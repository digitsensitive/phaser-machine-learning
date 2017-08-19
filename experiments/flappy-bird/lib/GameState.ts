/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/

import * as NE from '../node_modules/neuroevolution-typescript/main';

import { Bird } from './Bird';
import { Pipe } from './Pipe';

const neuvol: NE.Neuroevolution = new NE.Neuroevolution({
  network: [2, [2], 1],
  population: 50
});

export class GameState extends Phaser.State {

  /* neuroevolution */
  private gen: any[];
  private scoreNE: number;
  private maxScore: number;

  /* game objects */
  private birds: Bird[];
  private pipes: Phaser.Group;

  /* variables */
  private timer: Phaser.TimerEvent;
  private hole: number;
  private dead: number;

  /* ui */
  private score: number;
  private scoreText: Phaser.Text[];

  preload() {
    this.game.load.image("bird", "../assets/sprites/bird.png");
    this.game.load.image("pipe", "../assets/sprites/pipe.png");
  }

  init() {

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
    this.scoreText.push(this.game.add.text(this.game.world.centerX-14, 30, "0", {font: "40px Connection", fill: "#000"}));
    this.scoreText.push(this.game.add.text(this.game.world.centerX-16, 30, "0", {font: "40px Connection", fill: "#fff"}));

  }

  create(): void {

    /* create birds */
    this.gen = neuvol.nextGeneration();
    for (let i in this.gen) {
    	let b = new Bird(this.game, 80, this.game.world.centerY, 'bird');
    	this.birds.push(b);
    }

    /* create the game objects */
    //this.bird = new Bird(this.game, 80, this.game.world.centerY, 'bird');

    /* timer for creating pipes */
    this.addRowOfPipes();
    this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

  }

  update(): void {

    for (let i = 0; i < this.birds.length; i++) {
      if (this.birds[i].alive) {
        var nextHoll;
        var dontGoFurthere = false;

        this.pipes.forEach(function(item) {

          if (item != undefined) {
            if (item.getPosition().x + 30 > this.birds[0].getPosition().x && dontGoFurthere == false) {
              nextHoll = (item.getHolePosition()*60)/600;
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
          neuvol.networkScore(this.gen[i], this.scoreNE);

          if(this.isItEnd()){
            this.restartGame();
          }
        }
      }
    }

    this.scoreNE++;
  	this.maxScore = (this.scoreNE > this.maxScore) ? this.scoreNE : this.maxScore;

  }

  private addOnePipe(x, y, hole): void {

    /* create a pipe at the position x and y */
    let pipe = new Pipe(this.game, x, y, 'pipe', hole);

    /* add pipe to group */
    this.pipes.add(pipe);

  }

  private addRowOfPipes(): void {

    /* update the score */
    this.score += 1;
    this.scoreText[0].text = this.scoreText[1].text = ""+this.score;

    // Randomly pick a number between 1 and 5
    // This will be the hole position
    this.hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (let i = 0; i < 10; i++) {
      if (i != this.hole && i != (this.hole + 1)) {
        this.addOnePipe(400, i * 60, this.hole);
      }

    }

  }

  private hitPipe(_bird) {
    _bird.alive = false;
  }

  private isItEnd(): boolean {

    for (let i in this.birds) {

    		if(this.birds[i].alive){
    			return false;
    		}

    }

    return true;

  }

  private restartGame(): void {
    this.game.state.restart();
  }

}
