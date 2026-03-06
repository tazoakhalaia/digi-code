import { Rectangle } from "pixi.js";
import { ShapeModels } from "../models";
import { GameView } from "../view";
import { decreaseGravity, increaseGravity } from "../functions";
import { colors, shapes } from "../constants";

export class GameController {
  private app = new GameView();
  private shapeModel = new ShapeModels();

  private startFalling = false;

  private spawnRate = 1;

  private increaseShape = document.getElementById("increaseShapes")!;
  private decreaseShape = document.getElementById("decreaseShapes")!;
  private shapesText = document.getElementById("shapesPerSecond")!;
  private alertText = document.getElementById("alert")!;

  init() {
    this.app.init();
    this.containerEvent();
    this.increaseShapes();
    increaseGravity(this.shapeModel);
    decreaseGravity(this.shapeModel);
  }

  increaseShapes() {
    this.increaseShape.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.startFalling) return;
      this.spawnRate++;
      this.shapesText.textContent = this.spawnRate.toString();
    });

    this.decreaseShape.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.startFalling) return;
      this.spawnRate = Math.max(1, this.spawnRate - 1);
      this.shapesText.textContent = this.spawnRate.toString();
    });
  }

  randomShape(x: number, y: number) {
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
      if (this.startFalling) return;
      this.startFalling = true;
      this.alertText.innerHTML =
        "You can change shapes count and enable container click after all shape stop falling";
      const { x, y } = e.global;

      this.randomShape(x, y);

      let count = 1;

      const spawnInterval = setInterval(() => {
        if (count >= this.spawnRate) {
          clearInterval(spawnInterval);
          this.startFalling = false;
          this.alertText.innerHTML = "";
          return;
        }

        this.randomShape(x + count * 20, y + count * 20);
        count++;
      }, 1000);
    });
  }
}
