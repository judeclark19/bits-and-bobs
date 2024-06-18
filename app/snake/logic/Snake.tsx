import { makeAutoObservable } from "mobx";
import Game, { Point } from "./Game";

export default class Snake {
  game: Game;
  points: Point[] = [];
  bodyLength: number = 5;
  canDirect: boolean;
  direction: "up" | "down" | "left" | "right" = "right";

  constructor(game: Game) {
    makeAutoObservable(this);
    this.game = game;
    this.points = this.init();
    this.canDirect = true;

    // event listener for keydown
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.changeDirection("up");
          break;
        case "ArrowDown":
          this.changeDirection("down");
          break;
        case "ArrowLeft":
          this.changeDirection("left");
          break;
        case "ArrowRight":
          this.changeDirection("right");
          break;
      }
    });
  }
  init(): Point[] {
    const centerY =
      Math.floor(this.game.canvasHeight / 2 / this.game.unitPx) *
      this.game.unitPx;
    const startX = (this.bodyLength - 1) * this.game.unitPx;
    return Array.from({ length: this.bodyLength }, (_, i) => ({
      x: startX - i * this.game.unitPx,
      y: centerY
    }));
  }

  changeDirection(newDirection: "up" | "down" | "left" | "right") {
    if (
      (newDirection === "up" && this.direction !== "down") ||
      (newDirection === "down" && this.direction !== "up") ||
      (newDirection === "left" && this.direction !== "right") ||
      (newDirection === "right" && this.direction !== "left")
    ) {
      this.canDirect = false;
      this.direction = newDirection;
      setTimeout(() => {
        this.canDirect = true;
      }, this.game.frameSpeed);
    }
  }

  recalculatePoints() {
    if (this.game.gameSize === "small") {
      this.points.map((point) => {
        point.x = point.x / 2;
        point.y = point.y / 2;
      });
    } else {
      this.points.map((point) => {
        point.x = point.x * 2;
        point.y = point.y * 2;
      });
    }
  }

  drawSnake() {
    this.points.forEach(({ x, y }, i) => {
      this.game.context.fillStyle = i === 0 ? "lime" : "green";
      this.game.context.beginPath();
      this.game.context.arc(
        x + this.game.unitPx / 2,
        y + this.game.unitPx / 2,
        this.game.gameSize === "small" ? 4.2 : 10,
        0,
        2 * Math.PI
      );
      this.game.context.fill();
    });
  }

  eraseSnake() {
    this.points.forEach(({ x, y }) => {
      this.game.context.fillStyle = "black";
      this.game.context.beginPath();
      this.game.context.arc(
        x + this.game.unitPx / 2,
        y + this.game.unitPx / 2,
        this.game.gameSize === "small" ? 5 : 11,
        0,
        2 * Math.PI
      );
      this.game.context.fill();
    });
  }

  moveSnake() {
    this.eraseSnake();

    const head = this.points[0];
    let newHead: Point = { x: head.x, y: head.y };

    switch (this.direction) {
      case "up":
        newHead.y -= this.game.unitPx;
        break;
      case "down":
        newHead.y += this.game.unitPx;
        break;
      case "left":
        newHead.x -= this.game.unitPx;
        break;
      case "right":
        newHead.x += this.game.unitPx;
        break;
    }

    this.points.unshift(newHead);
    this.points.pop();
    this.drawSnake();
  }
}
