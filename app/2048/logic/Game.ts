import { makeAutoObservable } from "mobx";
import TileClass from "./TileClass";
import CellClass from "./CellClass";

class TFEGameLogic {
  gridContainer: HTMLDivElement | null = null;
  cells: CellClass[] = [];
  tiles: TileClass[] = [];
  isInitialized = false;
  gameOver = false;

  constructor() {
    makeAutoObservable(this);
    this.initCells();
  }

  initCells() {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        this.cells.push(new CellClass(x, y));
      }
    }
  }

  setTiles(tiles: TileClass[]) {
    this.tiles = tiles;
  }

  spawnRandomTile() {
    const emptyCell = this.getRandomEmptyCell();
    if (!emptyCell) {
      return;
    }

    const randomTileValue = Math.random() < 0.5 ? 2 : 4;
    const tileEl = document.createElement("div");

    const newTile = new TileClass(
      emptyCell.x,
      emptyCell.y,
      randomTileValue,
      tileEl
    );

    this.gridContainer!.appendChild(tileEl);
    emptyCell.tile = newTile;
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter((cell) => !cell.tile);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  initializeGame(gridContainer: HTMLDivElement) {
    this.gridContainer = gridContainer;
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.initKeyboardListeners();
      this.spawnRandomTile();
      this.spawnRandomTile();
    }
  }

  initKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      if (this.gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          this.moveUp();
          break;
        case "ArrowDown":
          this.moveDown();
          break;
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
      }
    });
  }

  moveUp() {
    this.slideTiles(this.getGridCellsByColumn());
  }

  moveDown() {
    this.slideTiles(this.getGridCellsByColumn().map((col) => col.reverse()));
  }

  moveLeft() {
    this.slideTiles(this.getGridCellsByRow());
  }

  moveRight() {
    this.slideTiles(this.getGridCellsByRow().map((row) => row.reverse()));
  }

  getGridCellsByColumn() {
    return this.cells.reduce((cellGrid: CellClass[][], cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  getGridCellsByRow() {
    return this.cells.reduce((cellGrid: CellClass[][], cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }

  slideTiles(cellGrid: CellClass[][]) {
    let hasMoved = false;
    cellGrid.forEach((colOrRow) => {
      for (let i = 1; i < colOrRow.length; i++) {
        const cell = colOrRow[i];
        if (!cell.tile) continue; // Skip empty cells

        let lastValidCell = null;
        for (let j = i - 1; j >= 0; j--) {
          const targetCell = colOrRow[j];

          if (targetCell.canAccept(cell.tile)) {
            lastValidCell = targetCell;
          } else {
            break; // Stop if we hit a cell that can't accept the tile
          }
        }

        if (lastValidCell && cell.tile) {
          // A MOVE IS POSSIBLE
          if (lastValidCell.tile) {
            // MERGE
            lastValidCell.mergeIn(cell.tile);
          } else {
            // SLIDE WITHOUT MERGING
            lastValidCell.tile = cell.tile;
            lastValidCell.tile.setX(lastValidCell.x);
            lastValidCell.tile.setY(lastValidCell.y);
          }
          cell.tile = null;
          hasMoved = true;
        }
      }
    });
    if (hasMoved) {
      this.spawnRandomTile();
      this.checkGameOver();
    }
  }

  checkGameOver() {
    if (this.cells.some((cell) => !cell.tile)) {
      return;
    }
    const isMergePossible = this.cells.some((cell) => {
      const neighbors = this.getNeighbors(cell);
      return neighbors.some(
        (neighbor) => neighbor.tile?.value === cell.tile?.value
      );
    });

    if (!isMergePossible) {
      document.getElementById("TFE-game-over")!.style.display = "flex";
      this.gameOver = true;
    }
  }

  getNeighbors(cell: CellClass) {
    const neighbors = [];
    if (cell.x > 0)
      neighbors.push(
        this.cells.filter((c) => c.x === cell.x - 1 && c.y === cell.y)[0]
      );
    if (cell.x < 3)
      neighbors.push(
        this.cells.filter((c) => c.x === cell.x + 1 && c.y === cell.y)[0]
      );
    if (cell.y > 0)
      neighbors.push(
        this.cells.filter((c) => c.x === cell.x && c.y === cell.y - 1)[0]
      );
    if (cell.y < 3)
      neighbors.push(
        this.cells.filter((c) => c.x === cell.x && c.y === cell.y + 1)[0]
      );
    return neighbors;
  }

  restartGame() {
    this.cells.forEach((cell) => {
      if (cell.tile) {
        cell.tile.tileEl.remove();
        cell.tile = null;
      }
    });
    this.gameOver = false;
    document.getElementById("TFE-game-over")!.style.display = "none";
    this.spawnRandomTile();
    this.spawnRandomTile();
  }
}

const TFEGameState = new TFEGameLogic();
export default TFEGameState;