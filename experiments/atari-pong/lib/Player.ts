/**
* @author       Digitsensitive <digit.sensitivee@gmail.com>
* @copyright    2017 Digitsensitive
* @license      Digitsensitive
*/


export class Player extends Phaser.Sprite {

  /* VARIABLES */
  private bodyRectangle: Phaser.Rectangle;
  private typePlayer: number;
  private computerMoveUp: boolean;
  private computerMoveDown: boolean;
  private score: number;
  private hit: boolean;

  /* INPUT */
  private moveUpKey: Phaser.Key;
  private moveDownKey: Phaser.Key;

  /* GETTER AND SETTER */
  public getTypePlayer(): number { return this.typePlayer; }
  public getPos(): Phaser.Point { return this.position; }
  public setPos(_pos: Phaser.Point): void { this.position = _pos; }
  public setMoveUp(_mu: boolean): void { this.computerMoveUp = _mu; }
  public setMoveDown(_md: boolean): void { this.computerMoveDown = _md; }
  public getScore(): number { return this.score; }
  public setScore(): void { this.score += 1; }
  public getHit(): boolean { return this.hit; }
  public setHit(_h: boolean): void { this.hit = _h; }

  constructor(game: Phaser.Game, x: number, y: number, type: number) {
    super(game, x-4, y);

    /* VARIABLES */
    this.bodyRectangle = new Phaser.Rectangle(x, y, 8, 30);
    this.typePlayer = type;
    this.computerMoveUp = false;
    this.computerMoveDown = false;
    this.score = 0;
    this.hit = true;

    /* INPUT */
    /* Player One */
    if (this.typePlayer == 1) {
      this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    }

    /* Player Two */
    else if (this.typePlayer == 2) {
      this.moveUpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
      this.moveDownKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    }

    /* Simple AI */
    else if (this.typePlayer == 3) {}

    /* Reinforcement Learning */
    else if (this.typePlayer == 4) {}

    /* PHYSICS */
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this);
    this.body.setSize(8, 30);
    this.body.collideWorldBounds = true;

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
      if (this.moveUpKey.isDown) { this.body.velocity.y -= 60; }
      else if (this.moveDownKey.isDown) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
      }
    }

    else if (this.typePlayer == 2) {
      if (this.moveUpKey.isDown) { this.body.velocity.y -= 60; }
      else if (this.moveDownKey.isDown) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
      }
    }

    else if (this.typePlayer == 3) {
      if (this.computerMoveUp) { this.body.velocity.y -= 60; }
      else if (this.computerMoveDown) { this.body.velocity.y += 60; }
      else {
        this.body.velocity.y = 0;
      }
    }

    this.body.velocity.x = 0;
    /* update the body rectangle position */
    this.bodyRectangle = new Phaser.Rectangle(this.body.position.x, this.body.position.y, 8, 30);

  }

  render(): void {

    /* render the rectangle */
    this.game.debug.geom(this.bodyRectangle,'#ffffff');

  }

  public goUp(): void {

    if (this.position.y > 30) { this.body.velocity.y -= 60; }
    else {
      this.body.velocity.y = 0;
    }

  }

  public goDown(): void {

    if (this.position.y < 440) { this.body.velocity.y += 60; }
    else {
      this.body.velocity.y = 0;
    }

  }

}
