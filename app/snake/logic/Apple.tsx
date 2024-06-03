import { makeAutoObservable } from "mobx";
import Game from "./Game";
import Snake from "./Snake";

export default class Apple {
  x: number;
  y: number;
  game: Game;
  snake: Snake;
  unitPx: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(game: Game) {
    makeAutoObservable(this);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.snake = this.game.snake;
    this.unitPx = this.game.unitPx;
    this.canvas = this.game.canvas;
    this.context = this.game.context;
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
        Math.floor(Math.random() * (this.canvas.width / this.unitPx)) *
        this.unitPx;
      randomY =
        Math.floor(Math.random() * (this.canvas.height / this.unitPx)) *
        this.unitPx;

      // Check if the generated position collides with the snake
      isColliding = this.snake.points.some(
        (segment) => segment.x === randomX && segment.y === randomY
      );
    }

    this.setX(randomX);
    this.setY(randomY);
  }

  drawApple(random: boolean) {
    if (random) {
      this.randomizeApplePosition();
    }

    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(
      this.x + this.unitPx / 2,
      this.y + this.unitPx / 2,
      10,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }
}
