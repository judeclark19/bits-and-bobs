import { makeAutoObservable } from "mobx";
import Game from "./Game";
import Snake from "./Snake";

export default class Apple {
  x: number;
  y: number;
  game: typeof Game;
  snake: Snake;

  constructor(game: typeof Game) {
    makeAutoObservable(this);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.snake = this.game.snake;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  randomizeApplePosition() {
    let randomX = 0;
    let randomY = 0;
    let isColliding = true;

    while (isColliding) {
      randomX =
        Math.floor(Math.random() * (this.game.canvasWidth / this.game.unitPx)) *
        this.game.unitPx;
      randomY =
        Math.floor(
          Math.random() * (this.game.canvasHeight / this.game.unitPx)
        ) * this.game.unitPx;

      // Check if the generated position collides with the snake
      isColliding = this.snake.points.some(
        (segment) => segment.x === randomX && segment.y === randomY
      );
    }

    this.setX(randomX);
    this.setY(randomY);
  }

  recalculatePosition() {
    if (this.game.gameSize === "small") {
      this.setX(this.x / 2);
      this.setY(this.y / 2);
    } else {
      this.setX(this.x * 2);
      this.setY(this.y * 2);
    }
  }

  drawApple(random: boolean) {
    if (random) {
      this.randomizeApplePosition();
    }

    this.game.context!.fillStyle = "red";
    this.game.context!.beginPath();
    this.game.context!.arc(
      this.x + this.game.unitPx / 2,
      this.y + this.game.unitPx / 2,
      this.game.gameSize === "small" ? 4.5 : 10,
      0,
      2 * Math.PI
    );
    this.game.context!.fill();
  }
}
