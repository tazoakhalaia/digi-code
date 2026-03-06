import { Application, Container } from "pixi.js";

export class GameView {
  private app = new Application();
  private container = new Container();

  async init() {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      backgroundColor: 0x1099bb,
    });

    this.app.stage.addChild(this.container);
    document.body.appendChild(this.app.canvas);
  }
}
