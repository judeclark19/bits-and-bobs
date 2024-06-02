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

  drawApple() {
    let randomX = 0;
    let randomY = 0;
    let isColliding = true;

    while (isColliding) {
      randomX =
        Math.floor(Math.random() * (this.canvas.width / this.unitPx)) *
          this.unitPx +
        this.unitPx / 2;
      randomY =
        Math.floor(Math.random() * (this.canvas.height / this.unitPx)) *
          this.unitPx +
        this.unitPx / 2;

      // Check if the generated position collides with the snake
      isColliding = this.snake.points.some(
        (segment) => segment.x === randomX && segment.y === randomY
      );
    }
    this.setX(randomX);
    this.setY(randomY);
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(randomX, randomY, 10, 0, 2 * Math.PI);
    this.context.fill();
  }
}
