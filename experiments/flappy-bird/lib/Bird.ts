/**
* @author       Digitsensitive <digit.sensitivee@gmail.com>
* @copyright    2017 Digitsensitive
* @license      Digitsensitive
*/


export class Bird extends Phaser.Sprite {

  /* INPUT */
  private jumpKey: Phaser.Key;

  /* ANIMATIONS */
  private anim: Phaser.Tween[];

  /* GETTER AND SETTER */
  public getPosition(): Phaser.Point { return this.position; }

  constructor(game: Phaser.Game, x: number, y: number, name: string) {
    super(game, x, y, name);

    /* SPRITE */
    this.anchor.setTo(0, 0);
    this.scale.setTo(3);

    /* ANIMATIONS */
    this.anim = [];
    this.anim.push(game.add.tween(this).to({angle: -20}, 100));

    /* INPUT */
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.jumpKey.onDown.add(this.jump, this);

    /* PHYSICS */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this);
    this.body.gravity.y = 1000;
    this.body.setSize(17, 12);


    /* finally add the new object to the game and return it */
    game.add.existing(this);

  }

  update(): void {

    if (this.angle < 20)
        this.angle += 1;

  }

  private jump(): void {

  //  if (this.alive) {
  //    this.body.velocity.y = -350;
  //    this.anim[0].start();
  //  }

  }

  public flap(): void {

    if (this.alive) {
      this.body.velocity.y = -350;
      this.anim[0].start();
    }

  }


}
