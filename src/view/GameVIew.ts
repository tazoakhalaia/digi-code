import { Application, Container, Graphics } from "pixi.js";

export class GameView {
  private app = new Application();
  private graphics?: Graphics;
  public container = new Container();

  async init() {
    await this.app.init({
      width: window.innerWidth - 50,
      height: window.innerHeight - 50,
      antialias: true,
      backgroundAlpha: 0.3,
    });

    const canvas = document.getElementById("app");
    this.graphics = new Graphics()
      .rect(0, 0, window.innerWidth - 50, window.innerHeight - 50)
      .stroke("black");
    this.container.addChild(this.graphics);

    this.app.stage.addChild(this.container);
    if (canvas) canvas.appendChild(this.app.canvas);
  }
}
