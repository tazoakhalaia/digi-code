import { Rectangle } from "pixi.js";
import { ShapeModels } from "../models";
import { GameView } from "../view";

export class GameController {
  private app = new GameView();
  private shapeModel = new ShapeModels();

  init() {
    this.app.init();
    this.containerEvent();
  }

  randomShape(x: number, y: number) {
    const shapes = ["cloud", "circle", "square", "triangle"];
    const colors = ["red", "cyan", "green", "blue"];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.shapeModel.createShape(
      randomShape,
      this.app.container,
      randomColor,
      x,
      y,
    );
  }

  containerEvent() {
    this.app.container.eventMode = "dynamic";

    this.app.container.hitArea = new Rectangle(
      0,
      0,
      window.innerWidth - 50,
      window.innerHeight - 50,
    );

    this.app.container.on("pointerdown", (e) => {
      const { x, y } = e.global;
      this.randomShape(x, y);
    });
  }
}
