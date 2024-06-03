import { makeAutoObservable, toJS } from "mobx";
import Snake from "./Snake";
import Apple from "./Apple";

export type Point = { x: number; y: number };

export default class SnakeGameLogic {
  isRunning: boolean = false;
  isPaused: boolean = false;
  gridVisible: boolean = true;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  unitPx: number;
  snake: Snake;
  apple: Apple;
  timer: NodeJS.Timeout | undefined;
  score: number = 0;
  endGameMessage: string = "Collided with wall";
  buttonText = "Start";

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
    this.isRunning = false;
    this.isPaused = false;
    this.gridVisible = true;

    this.welcomeScreen();
  }

  welcomeScreen() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // "Snake Game"
    this.context.fillStyle = "white";
    this.context.font = "48px sans-serif";
    const snakeGameText = "Snake Game";
    const snakeGameTextWidth = this.context.measureText(snakeGameText).width;
    this.context.fillText(
      snakeGameText,
      (this.canvas.width - snakeGameTextWidth) / 2,
      this.canvas.height / 2 - 50
    );

    // "Press Enter to start"
    this.context.font = "24px sans-serif";
    const startText = "Press Enter to start";
    const startTextWidth = this.context.measureText(startText).width;
    this.context.fillText(
      startText,
      (this.canvas.width - startTextWidth) / 2,
      this.canvas.height / 2
    );
  }

  startGame() {
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.score = 0;
    this.endGameMessage = "Collided with wall";

    this.buttonText = "Pause";
    this.isRunning = true;
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gridVisible) this.drawGrid();
    this.snake.drawSnake();
    this.apple.drawApple(true);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (!this.checkCollision()) {
        this.snake!.moveSnake();
      }
    }, 140);
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

  eraseGrid() {
    this.gridVisible = false;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
      head.x >= this.canvas.width ||
      head.y < 0 ||
      head.y >= this.canvas.height
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
    if (this.isPaused || !this.isRunning) {
      return;
    }

    this.stopTimer();
    this.isPaused = true;
    this.buttonText = "Resume";

    // add translucent overlay
    this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // add 'Paused' text on top
    this.context.fillStyle = "white";
    this.context.font = "32px sans-serif";
    const pausedText = "Paused";
    const pausedTextWidth = this.context.measureText(pausedText).width;
    this.context.fillText(
      pausedText,
      (this.canvas.width - pausedTextWidth) / 2,
      this.canvas.height / 2 - 50
    );

    // add 'Press Enter to resume' text on bottom
    this.context.font = "24px sans-serif";
    const resumeText = "Press Enter to resume";
    const resumeTextWidth = this.context.measureText(resumeText).width;
    this.context.fillText(
      resumeText,
      (this.canvas.width - resumeTextWidth) / 2,
      this.canvas.height / 2
    );
  }

  resumeGame() {
    this.isRunning = true;
    this.isPaused = false;
    this.buttonText = "Pause";

    // Clear the pause overlay
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Redraw the grid, snake, and apple

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gridVisible) this.drawGrid();
    this.snake!.drawSnake();
    this.apple!.drawApple(false);

    this.startTimer();
  }

  endGame() {
    this.stopTimer();
    this.isRunning = false;
    this.buttonText = "Restart";
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // "Game Over"
    this.context.fillStyle = "white";
    this.context.font = "48px sans-serif";
    const gameOverText = "Game Over";
    const gameOverTextWidth = this.context.measureText(gameOverText).width;
    this.context.fillText(
      gameOverText,
      (this.canvas.width - gameOverTextWidth) / 2,
      this.canvas.height / 2 - 50
    );

    // end game message (how did you die?)
    this.context.font = "24px sans-serif";
    const endGameMessageWidth = this.context.measureText(
      this.endGameMessage
    ).width;
    this.context.fillText(
      this.endGameMessage,
      (this.canvas.width - endGameMessageWidth) / 2,
      this.canvas.height / 2
    );

    // final score text
    this.context.font = "24px sans-serif";
    this.context.fillStyle = "yellow"; // Set the text color to yellow
    const scoreText = `Final score: ${this.score}`;
    const scoreTextWidth = this.context.measureText(scoreText).width;
    this.context.fillText(
      scoreText,
      (this.canvas.width - scoreTextWidth) / 2,
      this.canvas.height / 2 + 50
    );
  }
}
