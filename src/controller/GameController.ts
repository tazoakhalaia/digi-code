import { Rectangle } from "pixi.js";
import { ShapeModels } from "../models";
import { GameView } from "../view";

export class GameController {
  private app = new GameView();
  private shapeModel = new ShapeModels();

  private spawnRate = 1;
  private gravityValue = 1;

  private increaseShape = document.getElementById("increaseShapes")!;
  private decreaseShape = document.getElementById("decreaseShapes")!;
  private shapesText = document.getElementById("shapesPerSecond")!;

  private increaseGravityValue = document.getElementById("increaseGravity")!;
  private decreaseGravity = document.getElementById("decreaseGravity")!;
  private gravityText = document.getElementById("gravityValue")!;

  init() {
    this.app.init();
    this.containerEvent();
    this.increaseShapes();
    this.increaseGravity();
  }

  increaseShapes() {
    this.increaseShape.addEventListener("click", () => {
      this.spawnRate++;
      this.shapesText.textContent = this.spawnRate.toString();
    });

    this.decreaseShape.addEventListener("click", () => {
      this.spawnRate = Math.max(1, this.spawnRate - 1);
      this.shapesText.textContent = this.spawnRate.toString();
    });
  }

  increaseGravity() {
    this.increaseGravityValue.addEventListener("click", () => {
      this.gravityValue++;
      this.gravityText.textContent = this.gravityValue.toString();
    });

    this.decreaseGravity.addEventListener("click", () => {
      this.gravityValue = Math.max(0, this.gravityValue - 1);
      this.gravityText.textContent = this.gravityValue.toString();
    });
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
