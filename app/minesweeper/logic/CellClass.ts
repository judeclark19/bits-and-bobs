import { makeAutoObservable } from "mobx";
import MinesweeperGameLogic from "./Game";

class MinesweeperCell {
  game: typeof MinesweeperGameLogic;
  cellElement: HTMLDivElement | null = null;
  row: number;
  col: number;
  covered: boolean;
  bomb: boolean;
  bombCount: number | null;
  flagged: boolean;

  constructor(game: typeof MinesweeperGameLogic, row: number, col: number) {
    makeAutoObservable(this);
    this.game = game;
    this.row = row;
    this.col = col;
    this.covered = true;
    this.bomb = false;
    this.bombCount = null;
    this.flagged = false;

    this.createCell();
  }

  createCell() {
    const cell = document.createElement("div");
    cell.classList.add("cell", "covered");
    cell.dataset.row = this.row.toString();
    cell.dataset.col = this.col.toString();
    this.cellElement = cell;
    this.cellElement.addEventListener("click", () => {
      if (this.game.mode === "digging" && this.covered) {
        this.uncover();
      } else if (this.game.mode === "flagging" && this.covered) {
        this.flipFlag();
      }
    });

    this.cellElement.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Suppress the right-click context menu
      if (this.covered) {
        this.flipFlag();
      }
    });

    this.game.gridContainer!.appendChild(cell);
  }

  flipFlag() {
    if (this.flagged) {
      this.flagged = false;
      this.cellElement!.textContent = "";
    } else {
      this.flagged = true;
      this.cellElement!.textContent = "🚩";
    }
  }

  placeBomb() {
    this.bomb = true;
  }

  removeBomb() {
    this.bomb = false;
  }

  getBombCount() {
    this.bombCount = 0;
    const directions = [
      [-1, 0], // top
      [-1, 1], // top right
      [0, 1], // right
      [1, 1], // bottom right
      [1, 0], // bottom
      [1, -1], // bottom left
      [0, -1], // left
      [-1, -1] // top left
    ];

    directions.forEach(([dx, dy]) => {
      const newRow = this.row + dx;
      const newCol = this.col + dy;
      if (
        newRow >= 0 &&
        newRow < 15 &&
        newCol >= 0 &&
        newCol < 10 &&
        this.game.cells[newRow][newCol].bomb
      ) {
        this.bombCount!++;
      }
    });
  }

  showBombCount() {
    const span = document.createElement("span");
    span.style.userSelect = "none";
    if (this.bombCount && this.bombCount > 0) {
      span.textContent = this.bombCount!.toString();
    }

    switch (this.bombCount) {
      case 1:
        span.style.color = "aqua";
        break;
      case 2:
        span.style.color = "lime";
        break;
      case 3:
        span.style.color = "red";
        break;
      case 4:
        span.style.color = "violet";
        break;
      case 5:
        span.style.color = "crimson";
        break;
      case 6:
        span.style.color = "turquoise";
        break;
      case 7:
        span.style.color = "indigo";
        break;
      case 8:
        span.style.color = "orange";
        break;
    }
    this.cellElement!.innerHTML = "";
    this.cellElement!.appendChild(span);
  }

  uncover() {
    if (this.flagged) return;

    this.covered = false;
    this.cellElement!.classList.remove("covered");
    if (this.bombCount && this.bombCount > 0 && !this.game.gameOver)
      this.showBombCount();

    if (this.bomb) {
      this.cellElement!.textContent = "💣";
      this.game.loseGame();
    } else if (this.bombCount === 0) {
      const directions = [
        [-1, 0], // top
        [-1, 1], // top right
        [0, 1], // right
        [1, 1], // bottom right
        [1, 0], // bottom
        [1, -1], // bottom left
        [0, -1], // left
        [-1, -1] // top left
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = this.row + dx;
        const newCol = this.col + dy;
        if (
          newRow >= 0 &&
          newRow < 15 &&
          newCol >= 0 &&
          newCol < 10 &&
          this.game.cells[newRow][newCol].covered
        ) {
          this.game.cells[newRow][newCol].uncover();
        }
      });
    }

    // count how many cells on the board are still covered
    let coveredCells = 0;
    this.game.cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.covered) {
          coveredCells++;
        }
      });
    });
    if (coveredCells === this.game.numberOfBombs) {
      this.game.winGame();
    }
  }
}

export default MinesweeperCell;
