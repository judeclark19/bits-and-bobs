import { makeAutoObservable } from "mobx";
import Game, { Point } from "./Game";

export default class Snake {
  game: Game;
  canvas: HTMLCanvasElement;
  unitPx: number;
  context: CanvasRenderingContext2D;
  timer: NodeJS.Timeout | undefined;
  points: Point[] = [];
  bodyLength: number = 5;
  direction: "up" | "down" | "left" | "right" = "right";

  constructor(game: Game) {
    makeAutoObservable(this);
    this.game = game;
    this.unitPx = this.game.unitPx;
    this.canvas = this.game.canvas;
    this.context = this.game.context;
    this.timer = this.game.timer;
    this.points = this.init();

    // event listener for keydown
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (this.direction === "down") return;
          this.direction = "up";
          break;
        case "ArrowDown":
          if (this.direction === "up") return;
          this.direction = "down";
          break;
        case "ArrowLeft":
          if (this.direction === "right") return;
          this.direction = "left";
          break;
        case "ArrowRight":
          if (this.direction === "left") return;
          this.direction = "right";
          break;
      }
    });
  }
  init(): Point[] {
    const centerY =
      Math.floor(this.canvas.height / 2 / this.unitPx) * this.unitPx;
    const startX = (this.bodyLength - 1) * this.unitPx;
    return Array.from({ length: this.bodyLength }, (_, i) => ({
      x: startX - i * this.unitPx,
      y: centerY
    }));
  }

  drawSnake() {
    this.points.forEach(({ x, y }, i) => {
      this.context.fillStyle = i === 0 ? "lime" : "green";
      this.context.beginPath();
      this.context.arc(
        x + this.unitPx / 2,
        y + this.unitPx / 2,
        10,
        0,
        2 * Math.PI
      );
      this.context.fill();
    });
  }

  eraseSnake() {
    this.points.forEach(({ x, y }) => {
      this.context.fillStyle = "black";
      this.context.beginPath();
      this.context.arc(
        x + this.unitPx / 2,
        y + this.unitPx / 2,
        11,
        0,
        2 * Math.PI
      );
      this.context.fill();
    });
  }

  moveSnake() {
    this.eraseSnake();

    const head = this.points[0];
    let newHead: Point = { x: head.x, y: head.y };

    switch (this.direction) {
      case "up":
        newHead.y -= this.unitPx;
        break;
      case "down":
        newHead.y += this.unitPx;
        break;
      case "left":
        newHead.x -= this.unitPx;
        break;
      case "right":
        newHead.x += this.unitPx;
        break;
    }

    this.points.unshift(newHead);
    this.points.pop();

    // this.game.init();
    this.game.checkCollision();
    this.drawSnake();
  }

  // checkCollision() {
  //   const head = this.points[0];
  //   if (head.x < 0 || head.x >= this.canvas.width) {
  //     console.log("collision with wall");
  //     this.game.stopTimer();
  //   }
  //   if (head.y < 0 || head.y >= this.canvas.height) {
  //     console.log("collision with wall");
  //     this.game.stopTimer();
  //   }

  //   const body = this.points.slice(1);
  //   if (body.some((segment) => segment.x === head.x && segment.y === head.y)) {
  //     console.log("collision with body");
  //     this.game.stopTimer();
  //   }

  //   // collision with apple
  //   const apple = this.game.apple;
  //   if (head.x === apple.x && head.y === apple.y) {
  //     console.log("collision with apple");
  //     this.game.eatApple();
  //     this.points.push({ x: head.x, y: head.y });
  //   }
  // }
}
