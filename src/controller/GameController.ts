import { GameView } from "../view";

export class GameController {
  private app = new GameView();

  init() {
    this.app.init();
  }
}
