import { makeAutoObservable, toJS } from "mobx";
import Snake from "./Snake";
import Apple from "./Apple";

export type Point = { x: number; y: number };

class SnakeGameLogic {
  isInitialized: boolean = false;
  isRunning: boolean = false;
  isPaused: boolean = false;
  gridVisible: boolean = true;
  context: CanvasRenderingContext2D | null;
  gameSize: "large" | "small" = "large";
  canvas: HTMLCanvasElement | null;
  canvasWidth: number;
  canvasHeight: number;
  unitPx: number;
  snake: Snake;
  apple: Apple;
  timer: NodeJS.Timeout | undefined;
  frameSpeed: number;
  score: number = 0;
  endGameMessage: string = "Collided with wall";
  buttonText = "Start";

  constructor() {
    makeAutoObservable(this);
    this.canvas = null;
    this.context = null;
    this.gameSize = "small";
    this.canvasWidth = this.gameSize === "small" ? 300 : 600;
    this.canvasHeight = this.gameSize === "small" ? 300 : 600;
    this.unitPx = this.gameSize === "small" ? 12 : 24;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.timer;
    this.frameSpeed = 140;
    this.isRunning = false;
    this.isPaused = false;
    this.gridVisible = true;
  }

  initializeGame(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }
    this.context = context;
    this.gameSize = window.innerWidth < 645 ? "small" : "large";
    setTimeout(() => {
      this.welcomeScreen();
    }, 10);
    this.canvasHeight = window.innerWidth < 645 ? 300 : 600;
    this.canvasWidth = window.innerWidth < 645 ? 300 : 600;
    this.unitPx = window.innerWidth < 645 ? 12 : 24;

    // add event listener for window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth < 645 && this.gameSize === "large") {
        // make game small
        this.canvas!.remove();
        this.gameSize = "small";
        this.canvasWidth = 300;
        this.canvasHeight = 300;
        this.unitPx = 12;

        this.redrawCanvas();
      } else if (window.innerWidth >= 645 && this.gameSize === "small") {
        // make game large
        this.canvas!.remove();
        this.gameSize = "large";
        this.canvasWidth = 600;
        this.canvasHeight = 600;
        this.unitPx = 24;

        this.redrawCanvas();
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.snake.changeDirection("up");
          break;
        case "ArrowDown":
          this.snake.changeDirection("down");
          break;
        case "ArrowLeft":
          this.snake.changeDirection("left");
          break;
        case "ArrowRight":
          this.snake.changeDirection("right");
          break;
      }
    });

    this.isInitialized = true;
  }

  redrawCanvas() {
    // Create and configure new canvas
    const canvas = document.createElement("canvas");
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    canvas.style.border = "2px solid gray";
    canvas.style.borderRadius = "0.25rem";

    // Prepend new canvas to DOM
    document.getElementById("canvas-container")!.prepend(canvas);

    // Set new canvas and context
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;

    // Clear and set the canvas background
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (!this.isRunning) {
      this.welcomeScreen();
      return;
    }

    // Redraw grid if visible
    if (this.gridVisible) {
      this.drawGrid();
    }

    // Recalculate and redraw snake points
    this.snake.recalculatePoints();
    this.snake.drawSnake();

    // Redraw apple
    this.apple.recalculatePosition();
    this.apple.drawApple(false);

    if (this.isPaused) {
      this.pauseGame();
    }
  }

  welcomeScreen() {
    this.context!.fillStyle = "black";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // "Snake Game"
    this.context!.fillStyle = "white";
    this.context!.font =
      this.gameSize === "small" ? "30px sans-serif" : "48px sans-serif";
    const snakeGameText = "Snake Game";
    const snakeGameTextWidth = this.context!.measureText(snakeGameText).width;
    this.context!.fillText(
      snakeGameText,
      (this.canvasWidth - snakeGameTextWidth) / 2,
      this.canvasHeight / 2 - 50
    );

    // "Press Enter to start"
    this.context!.font =
      this.gameSize === "small" ? "16px sans-serif" : "24px sans-serif";
    const startText = "Press Enter or click button to start";
    const startTextWidth = this.context!.measureText(startText).width;
    this.context!.fillText(
      startText,
      (this.canvasWidth - startTextWidth) / 2,
      this.canvasHeight / 2
    );
  }

  startGame() {
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.score = 0;
    this.endGameMessage = "Collided with wall";

    this.buttonText = "Pause";
    this.isRunning = true;
    this.context!.fillStyle = "black";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.gridVisible) this.drawGrid();
    this.snake.drawSnake();
    this.apple.drawApple(true);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.snake.canDirect = true;
      if (!this.checkCollision()) {
        this.snake!.moveSnake();
      }
    }, this.frameSpeed);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setIsGridVisible(visible: boolean) {
    this.gridVisible = visible;

    if (this.isRunning && !this.isPaused) {
      if (visible) {
        this.drawGrid();
      } else {
        this.eraseGrid();
      }
    }
  }

  toggleGrid() {
    if (this.gridVisible) {
      this.eraseGrid();
    } else {
      this.drawGrid();
    }
  }

  drawGrid() {
    this.gridVisible = true;
    this.context!.strokeStyle = "gray";
    for (let i = 0; i < this.canvasWidth; i += this.unitPx) {
      this.context!.beginPath();
      this.context!.moveTo(i, 0);
      this.context!.lineTo(i, this.canvasHeight);
      this.context!.stroke();
    }

    for (let i = 0; i < this.canvasHeight; i += this.unitPx) {
      this.context!.beginPath();
      this.context!.moveTo(0, i);
      this.context!.lineTo(this.canvasWidth, i);
      this.context!.stroke();
    }
  }

  eraseGrid() {
    this.gridVisible = false;
    this.context!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context!.fillStyle = "black";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.snake.drawSnake();
    this.apple.drawApple(false);
  }

  checkCollision(): boolean {
    const head = toJS(this.snake!.points[0]);
    const headCell = [head.x / this.unitPx, head.y / this.unitPx];
    const appleCell = [
      Math.floor(this.apple!.x / this.unitPx),
      Math.floor(this.apple!.y / this.unitPx)
    ];

    if (
      head.x < 0 ||
      head.x >= this.canvasWidth ||
      head.y < 0 ||
      head.y >= this.canvasHeight
    ) {
      this.endGameMessage = "Collided with wall";
      this.endGame();
      return true;
    }

    const body = this.snake!.points.slice(1);
    if (body.some((segment) => segment.x === head.x && segment.y === head.y)) {
      this.endGameMessage = "Collided with body";
      this.endGame();
      return true;
    }

    if (headCell[0] === appleCell[0] && headCell[1] === appleCell[1]) {
      this.eatApple();
      this.snake!.points.push({ x: head.x, y: head.y });
      return false;
    }

    return false;
  }

  eatApple() {
    this.score++;
    this.apple!.drawApple(true);
  }

  pauseGame() {
    if (!this.isRunning) {
      return;
    }

    this.stopTimer();
    this.isPaused = true;
    this.buttonText = "Resume";

    // add translucent overlay
    this.context!.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // add 'Paused' text on top
    this.context!.fillStyle = "white";
    this.context!.font =
      this.gameSize === "small" ? "20px sans-serif" : "32px sans-serif";
    const pausedText = "Paused";
    const pausedTextWidth = this.context!.measureText(pausedText).width;
    this.context!.fillText(
      pausedText,
      (this.canvasWidth - pausedTextWidth) / 2,
      this.canvasHeight / 2 - 50
    );

    // add 'Press Enter to resume' text on bottom
    this.context!.font =
      this.gameSize === "small" ? "16px sans-serif" : "24px sans-serif";
    const resumeText = "Press Enter or click button resume";
    const resumeTextWidth = this.context!.measureText(resumeText).width;
    this.context!.fillText(
      resumeText,
      (this.canvasWidth - resumeTextWidth) / 2,
      this.canvasHeight / 2
    );
  }

  resumeGame() {
    this.isRunning = true;
    this.isPaused = false;
    this.buttonText = "Pause";

    // Clear the pause overlay
    this.context!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Redraw the grid, snake, and apple

    this.context!.fillStyle = "black";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.gridVisible) this.drawGrid();
    this.snake!.drawSnake();
    this.apple!.drawApple(false);

    this.startTimer();
  }

  endGame() {
    this.stopTimer();
    this.isRunning = false;
    this.buttonText = "Restart";
    this.context!.fillStyle = "black";
    this.context!.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    // "Game Over"
    this.context!.fillStyle = "white";
    this.context!.font =
      this.gameSize === "small" ? "30px sans-serif" : "48px sans-serif";
    const gameOverText = "Game Over";
    const gameOverTextWidth = this.context!.measureText(gameOverText).width;
    this.context!.fillText(
      gameOverText,
      (this.canvasWidth - gameOverTextWidth) / 2,
      this.canvasHeight / 2 - 50
    );

    // end game message (how did you die?)
    this.context!.font =
      this.gameSize === "small" ? "16px sans-serif" : "24px sans-serif";
    const endGameMessageWidth = this.context!.measureText(
      this.endGameMessage
    ).width;
    this.context!.fillText(
      this.endGameMessage,
      (this.canvasWidth - endGameMessageWidth) / 2,
      this.canvasHeight / 2
    );

    // final score text
    this.context!.font = "24px sans-serif";
    this.context!.fillStyle = "yellow"; // Set the text color to yellow
    const scoreText = `Final score: ${this.score}`;
    const scoreTextWidth = this.context!.measureText(scoreText).width;
    this.context!.fillText(
      scoreText,
      (this.canvasWidth - scoreTextWidth) / 2,
      this.canvasHeight / 2 + 50
    );
  }
}

const snakeGameState = new SnakeGameLogic();
export default snakeGameState;
