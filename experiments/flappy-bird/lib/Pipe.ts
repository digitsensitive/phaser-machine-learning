/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


export class Pipe extends Phaser.Sprite {

  /* VARIABLES */

  /* GETTER AND SETTER */


  constructor(game: Phaser.Game, x: number, y: number, name: string) {
    super(game, x, y, name);

    /* VARIABLES */

    /* SPRITE */
    this.anchor.setTo(0, 0);


    /* PHYSICS */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this);
    this.body.setSize(30, 30);
    this.body.velocity.x = -200;

    /* automatically kill the pipe when it's no longer visible */
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    /* finally add the new object to the game and return it */
    game.add.existing(this);

  }



  update(): void {}

  render(): void {}

}
