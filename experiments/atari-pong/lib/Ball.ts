/**
* @author       Eric Kuhn <digit.sensitivee@gmail.com>
* @copyright    2017 Eric Kuhn
* @license      Eric Kuhn
*/


export class Ball extends Phaser.Sprite {

  /* VARIABLES */
  private bodyRectangle: Phaser.Rectangle;
  private vx: number;
  private vy: number;

  public getVeloX() { return this.vx; }
  public setVeloX(_vx: number) { this.vx = _vx; }

  public getPos() { return this.position; }

  constructor(game: Phaser.Game, x: number, y: number, vx: number, vy: number) {
    super(game, x, y);

    /* VARIABLES */
    this.vx = vx;
    this.vy = vy;
    this.bodyRectangle = new Phaser.Rectangle(x, y, 8, 8);

    /* PHYSICS */
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(8, 8);

    /* finally add the new object to the game and return it */
    game.add.existing(this);

  }



  /*
   * UPDATE() IS CALLED DURING THE CORE GAME LOOP
   * AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
   * BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
   */
  update(): void {

    this.position.x += this.vx;
    this.position.y += this.vy;

    /* if the ball hits the upper or lower wall */
    if (this.position.y < 0 || this.position.y > this.game.height - this.body.height) {
      this.vy = -this.vy;
    }

    this.bodyRectangle = new Phaser.Rectangle(this.body.position.x, this.body.position.y, 8, 8);

  }

  render(): void {
    this.game.debug.geom(this.bodyRectangle,'#ffffff');
  }

  public restart(_player: number): void {
    this.position.x = this.game.world.centerX;
    this.position.y = Math.floor(Math.random() * 488) + 1;

    if (_player == 1) {
      this.vx = -6;
      this.vy = 6 * (Math.random() < 0.5 ? -1 : 1);
    }

    else if (_player == 2) {
      this.vx = 3;
      this.vy = -6 * (Math.random() < 0.5 ? -1 : 1);
    }

  }


}
