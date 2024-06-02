import { makeAutoObservable, toJS } from "mobx";
import Snake from "./Snake";
import Apple from "./Apple";

export type Point = { x: number; y: number };

export default class SnakeGameLogic {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  unitPx: number;
  snake: Snake;
  apple: Apple;
  timer: NodeJS.Timeout | undefined;
  score: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    makeAutoObservable(this);
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }
    this.context = context;
    this.unitPx = 25;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.timer;
    this.init();
  }

  init() {
    console.log("snakegame init");
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();
    this.snake.drawSnake();
    this.apple.drawApple();
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.snake.moveSnake();
    }, 200);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  drawGrid() {
    this.context.strokeStyle = "gray";
    for (let i = 0; i < this.canvas.width; i += this.unitPx) {
      this.context.beginPath();
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.canvas.height);
      this.context.stroke();
    }

    for (let i = 0; i < this.canvas.height; i += this.unitPx) {
      this.context.beginPath();
      this.context.moveTo(0, i);
      this.context.lineTo(this.canvas.width, i);
      this.context.stroke();
    }
  }

  checkCollision() {
    const head = toJS(this.snake.points[0]);
    const headCell = [head.x / this.unitPx, head.y / this.unitPx];
    const appleCell = [
      Math.floor(this.apple.x / this.unitPx),
      Math.floor(this.apple.y / this.unitPx)
    ];

    if (head.x < 0 || head.x >= this.canvas.width) {
      console.log("collision with wall");
      this.stopTimer();
    }
    if (head.y < 0 || head.y >= this.canvas.height) {
      console.log("collision with wall");
      this.stopTimer();
    }

    const body = this.snake.points.slice(1);
    if (body.some((segment) => segment.x === head.x && segment.y === head.y)) {
      console.log("collision with body");
      this.stopTimer();
    }

    if (headCell[0] === appleCell[0] && headCell[1] === appleCell[1]) {
      this.eatApple();
      this.snake.points.push({ x: head.x, y: head.y });
    }
  }

  eatApple() {
    this.score++;
    console.log("score:", this.score);
    this.apple.drawApple();
  }
}
