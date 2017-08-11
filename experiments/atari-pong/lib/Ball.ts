/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


export class Ball extends Phaser.Sprite {

  /* VARIABLES */
  private bodyRectangle: Phaser.Rectangle;

  /* GETTER AND SETTER FUNCTIONS */
  public getPos(): Phaser.Point { return this.position; }
  public getVel(): Phaser.Point { return this.body.velocity; }
  public setVelX(_velX: number): void { this.body.velocity.x = _velX; }

  constructor(game: Phaser.Game, x: number, y: number, vx: number, vy: number) {
    super(game, x, y);

    /* VARIABLES */
    this.bodyRectangle = new Phaser.Rectangle(x, y, 8, 8);

    /* PHYSICS */
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(8, 8);
    this.body.velocity.setTo(vx, vy);

    /* finally add the new object to the game and return it */
    game.add.existing(this);

  }

  update(): void {

    /* update the position */
    this.position.x += this.body.velocity.x;
    this.position.y += this.body.velocity.y;

    /* if the ball hits the upper or lower wall */
    if (this.position.y < 0 || this.position.y > this.game.height - this.body.height) {
      this.body.velocity.y = -this.body.velocity.y;
    }

    /* update the body rectangle position */
    this.bodyRectangle = new Phaser.Rectangle(this.body.position.x, this.body.position.y, 8, 8);

  }

  render(): void {

    /* render the rectangle */
    this.game.debug.geom(this.bodyRectangle,'#ffffff');

  }

  public restart(_player: number): void {

    /* reset the position */
    this.position.x = this.game.world.centerX;
    this.position.y = Math.floor(Math.random() * 488) + 1;

    /* reset the velocity */
    let velX = 6;
    let velY = 6 * (Math.random() < 0.5 ? -1 : 1);

    if (_player == 1) {
      this.body.velocity.x = -velX;
      this.body.velocity.y = velY;
    }

    else if (_player == 2) {
      this.body.velocity.x = velX;
      this.body.velocity.y = -velY;
    }

  }

}
