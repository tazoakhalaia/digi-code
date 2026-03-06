import { Graphics, Ticker, type Container } from "pixi.js";

export class ShapeModels {
  private ticker = new Ticker();
  private shapes: Graphics[] = [];
  private gravity = 0.5;
  private groundY = window.innerHeight;

  constructor() {
    this.ticker.start();
    this.ticker.add(() => this.gravityFall());
  }

  gravityFall() {
    this.shapes.forEach((shape) => {
      const velocityY = (shape as any).velocityY || 0;
      let newVelocity = velocityY + this.gravity;
      let newY = shape.y + newVelocity;
      const bounds = shape.getLocalBounds();

      if (newY + bounds.height > this.groundY) {
        newY = this.groundY - bounds.height;
        newVelocity = 0;
      }

      shape.y = newY;
      (shape as any).velocityY = newVelocity;
    });
  }

  createShape(
    shapeType: string,
    container: Container,
    color: string,
    x: number,
    y: number,
  ) {
    const shape = new Graphics();
    switch (shapeType) {
      case "circle":
        shape.circle(0, 0, 50).fill(color);
        break;

      case "square":
        shape.rect(-50, -50, 100, 100).fill(color);
        break;

      case "triangle":
        shape.poly([0, -50, 50, 50, -50, 50]).fill(color);
        break;

      case "cloud":
        shape.circle(0, 0, 30).fill(color);
        shape.circle(-25, -10, 25).fill(color);
        shape.circle(25, -10, 25).fill(color);
        shape.circle(0, -25, 20).fill(color);
        break;

      default:
        throw new Error("Invalid shape type");
    }

    shape.position.set(x, y);
    container.addChild(shape);
    this.shapes.push(shape);

    shape.eventMode = "dynamic";
    shape.cursor = "pointer";
    shape.on("pointerdown", (e) => {
      e.stopPropagation();
      container.removeChild(shape);
    });
  }
}
