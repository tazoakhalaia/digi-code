import type { ShapeModels } from "../models";

const increaseGravityBtn = document.getElementById("increaseGravity")!;
const decreaseGravityBtn = document.getElementById("decreaseGravity")!;
const gravityText = document.getElementById("gravityValue")!;
let gravityValue = 1;

export function increaseGravity(shapeModel: ShapeModels) {
  increaseGravityBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    gravityValue++;
    shapeModel.setGravity(gravityValue);
    gravityText.textContent = gravityValue.toString();
  });
}

export function decreaseGravity(shapeModel: ShapeModels) {
  decreaseGravityBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    gravityValue = Math.max(0, gravityValue - 1);
    shapeModel.setGravity(gravityValue);
    gravityText.textContent = gravityValue.toString();
  });
}
