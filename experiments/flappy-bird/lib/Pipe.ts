/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


export class Pipe extends Phaser.Sprite {

  /* VARIABLES */
  private holePosition: number;

  /* GETTER AND SETTER */
  public getHolePosition(): number { return this.holePosition; }
  public getPosition(): Phaser.Point { return this.position; }

  constructor(game: Phaser.Game, x: number, y: number, frame: number, name: string, hole: number) {
    super(game, x, y, name, frame);

    /* VARIABLES */
    this.holePosition = hole;

    /* SPRITE */
    this.anchor.setTo(0, 0);
    this.scale.setTo(3);

    /* PHYSICS */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this);
    this.body.setSize(20, 20);
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
