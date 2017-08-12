/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


export class Player extends Phaser.Sprite {

  /* VARIABLES */
  private bodyRectangle: Phaser.Rectangle;
  private typePlayer: number;
  private computerMoveUp: boolean;
  private computerMoveDown: boolean;

  /* INPUT */
  private moveUpKey: Phaser.Key;
  private moveDownKey: Phaser.Key;

  public getTypePlayer(): number { return this.typePlayer; }
  public getPos(): Phaser.Point { return this.position; }
  public setPos(_pos: Phaser.Point): void{ this.position = _pos; }
  public setMoveUp(_mu: boolean): void { this.computerMoveUp = _mu; }
  public setMoveDown(_md: boolean): void { this.computerMoveDown = _md; }

  constructor(game: Phaser.Game, x: number, y: number, type: number) {
    super(game, x-4, y);

    /* VARIABLES */
    this.bodyRectangle = new Phaser.Rectangle(x, y, 8, 30);
    this.typePlayer = type;
    this.computerMoveUp = false;
    this.computerMoveDown = false;

    /* INPUT */
    if (this.typePlayer == 1) {
      this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    }

    else if (this.typePlayer == 2) {
      this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    }

    /* PHYSICS */
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(8, 30);

    /* finally add the new object to the game and return it */
    game.add.existing(this);

  }

  /*
   * UPDATE() IS CALLED DURING THE CORE GAME LOOP
   * AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
   * BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
   */
  update(): void {

    if (this.typePlayer == 1) {
      if (this.moveUpKey.isDown && this.position.y > 30) { this.body.velocity.y -= 60; }
      else if (this.moveDownKey.isDown && this.position.y < (488 - this.body.height)) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
        if (this.position.y < 0) { this.position.y = 0; }
        if (this.position.y > (488 - this.body.height)) { this.position.y = 488 - this.body.height; }
      }
    }

    else if (this.typePlayer == 2) {
      if (this.moveUpKey.isDown && this.position.y > 30) { this.body.velocity.y -= 60; }
      else if (this.moveDownKey.isDown && this.position.y < 440) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
        if (this.position.y < 0) { this.position.y = 0; }
        if (this.position.y > (488 - this.body.height)) { this.position.y = 488 - this.body.height; }
      }
    }

    else if (this.typePlayer == 3) {
      if (this.computerMoveUp && this.position.y > 30) { this.body.velocity.y -= 60; }
      else if (this.computerMoveDown && this.position.y < 440) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
        if (this.position.y < 0) { this.position.y = 0; }
        if (this.position.y > (488 - this.body.height)) { this.position.y = 488 - this.body.height; }
      }
    }

    /* update the body rectangle position */
    this.bodyRectangle = new Phaser.Rectangle(this.body.position.x, this.body.position.y, 8, 30);

  }

  render(): void {

    /* render the rectangle */
    this.game.debug.geom(this.bodyRectangle,'#ffffff');

  }


}
