import { makeAutoObservable } from "mobx";
import { Difficulty } from "./Game";

class PuzzleGenerator {
  solution: number[][];
  puzzle: number[][];

  constructor() {
    // Initialize the solution and puzzle grids with zeros
    this.solution = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
    makeAutoObservable(this);
  }

  generatePuzzle(difficulty: Difficulty): void {
    this.generateSolution();
    this.createPuzzle(difficulty);
  }

  generateSolution(): void {
    let attempts = 0;
    const maxAttempts = 5; // Set a limit to prevent infinite loops

    do {
      attempts++;
      // Reset the grid
      this.solution = Array.from({ length: 9 }, () => Array(9).fill(0));
      // Attempt to fill the grid
      this.fillSolutionGrid();
    } while (!this.validateGrid() && attempts < maxAttempts);

    if (!this.validateGrid()) {
      throw new Error(
        "Failed to generate a valid grid after multiple attempts."
      );
    }
  }

  isSafe(row: number, col: number, num: number): boolean {
    // Check row and column
    for (let x = 0; x < 9; x++) {
      if (this.solution[row][x] === num || this.solution[x][col] === num) {
        return false;
      }
    }

    // Check 3x3 subgrid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.solution[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  fillSolutionGrid(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.solution[row][col] === 0) {
          // Shuffle numbers 1-9 to add randomness
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          this.shuffleArray(numbers);

          for (let num of numbers) {
            if (this.isSafe(row, col, num)) {
              this.solution[row][col] = num;

              if (this.fillSolutionGrid()) {
                return true;
              }

              this.solution[row][col] = 0; // Backtrack
            }
          }
          return false; // Trigger backtracking
        }
      }
    }
    return true; // Grid is fully filled
  }

  validateGrid(): boolean {
    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      const rowSet = new Set<number>();
      const colSet = new Set<number>();
      for (let j = 0; j < 9; j++) {
        const rowNum = this.solution[i][j];
        const colNum = this.solution[j][i];

        // Check for zeros or duplicates in the row
        if (rowNum === 0 || rowSet.has(rowNum)) {
          return false;
        }
        rowSet.add(rowNum);

        // Check for zeros or duplicates in the column
        if (colNum === 0 || colSet.has(colNum)) {
          return false;
        }
        colSet.add(colNum);
      }
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const boxSet = new Set<number>();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const num = this.solution[row + i][col + j];
            if (num === 0 || boxSet.has(num)) {
              return false;
            }
            boxSet.add(num);
          }
        }
      }
    }

    // All checks passed
    return true;
  }

  createPuzzle(difficulty: Difficulty): void {
    // Determine the number of cells to remove based on difficulty
    let maxEmptyCells: number;
    switch (difficulty) {
      case "Easy":
        maxEmptyCells = 40;
        break;
      case "Medium":
        maxEmptyCells = 50;
        break;
      case "Hard":
        maxEmptyCells = 60;
        break;
      default:
        maxEmptyCells = 50;
    }

    // Copy the solution grid to start with
    this.puzzle = this.solution.map((row) => row.slice());

    // Create an instance of PuzzleSolver
    const solver = new PuzzleSolver();

    // List of all cell positions
    const cellPositions = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        cellPositions.push({ row, col });
      }
    }

    // Shuffle the cell positions to randomize removal
    this.shuffleArray(cellPositions);

    let cellsRemoved = 0;

    for (let { row, col } of cellPositions) {
      if (cellsRemoved >= maxEmptyCells) {
        break;
      }

      const backup = this.puzzle[row][col];
      this.puzzle[row][col] = 0;

      // Reset solution count in solver
      solver.solutionCount = 0;

      // Solve the puzzle to count the number of solutions
      const gridCopy = this.puzzle.map((r) => r.slice());
      solver.solveGrid(gridCopy);

      if (solver.solutionCount !== 1) {
        // More than one solution; revert the change
        this.puzzle[row][col] = backup;
      } else {
        cellsRemoved++;
      }
    }
  }
}

class PuzzleSolver {
  solutionCount: number;

  constructor() {
    this.solutionCount = 0;
  }

  isSafeInGrid(
    grid: number[][],
    row: number,
    col: number,
    num: number
  ): boolean {
    // Check row and column
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num) {
        return false;
      }
    }

    // Check 3x3 subgrid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  solveGrid(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isSafeInGrid(grid, row, col, num)) {
              grid[row][col] = num;

              if (this.solveGrid(grid)) {
                // Do not return immediately; we need to find all solutions
              }

              grid[row][col] = 0; // Backtrack
            }
          }
          return false; // Trigger backtracking
        }
      }
    }
    // A solution is found
    this.solutionCount++;
    return false; // Continue searching for more solutions
  }
}

const puzzleGenerator = new PuzzleGenerator();
// puzzleGenerator.generatePuzzle("medium");

export default puzzleGenerator;
