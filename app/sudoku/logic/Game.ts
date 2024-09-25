import { makeAutoObservable, toJS } from "mobx";
import { runInAction } from "mobx";
import { CellClass } from "./Cell";
import { PopoverClass } from "./Popover";
import puzzleGenerator from "./PuzzleGenerator";

export type Difficulty = "Easy" | "Medium" | "Hard";

export class SudokuGameLogic {
  gameContainer: HTMLDivElement | null = null;
  gridElement: HTMLDivElement | null = null;
  //   popoverElement: HTMLDivElement | null = null;
  popover: PopoverClass | null = null;
  newGameButtons: NodeListOf<HTMLButtonElement> | null = null;
  checkButton: HTMLButtonElement | null = null;
  isInitialized = false;
  difficulty: Difficulty = "Easy";
  board: number[][] | null = null;
  solution: number[][] | null = null;
  cells: CellClass[] = [];
  activeCell: CellClass | null | undefined = null;
  popoverIsOpen = false;
  isLoading = true;
  isFetching = false;
  loadingMessage = "Creating new game...";
  constructor() {
    makeAutoObservable(this);
  }

  initializeGame(
    gameContainer: HTMLDivElement,
    difficulty: "Easy" | "Medium" | "Hard"
  ) {
    this.gameContainer = gameContainer;
    this.difficulty = difficulty;
    runInAction(() => {
      this.loadingMessage = `Creating new ${this.difficulty.toLowerCase()} game...`;
    });
    this.gridElement = gameContainer.querySelector("#sudoku-grid");
    this.popover = new PopoverClass(
      this,
      gameContainer.querySelector("#number-select") as HTMLDivElement
    );

    this.newGameButtons = gameContainer.querySelectorAll(".new-game");
    this.checkButton = gameContainer.querySelector("#check-board");
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.popover.addPopoverEventListeners();
      this.newGameButtons.forEach((button) => {
        button.addEventListener("click", this.restartGame.bind(this));
      });
      this.checkButton!.addEventListener("click", this.checkBoard.bind(this));
      this.fetchNewBoard();
      window.addEventListener("click", (event) => {
        if (!this.gridElement!.contains(event.target as Node)) {
          this.activeCell = null;
          this.cells.forEach((cell) => {
            cell.isActive = false;
            cell.cellElement!.classList.remove("active");
          });
          this.popover!.closePopover();
        }
      });
    }
  }

  //   FETCH NEW BOARD REAL API CALL
  // fetchNewBoard() {
  //   // If a fetch is already in progress, do not start another
  //   if (this.isFetching) {
  //     return;
  //   }
  //   this.isFetching = true; // Indicate that fetching has started

  //   const fetchBoard = () => {
  //     // If a fetch is already in progress, do not start another
  //     if (!this.isFetching) {
  //       return;
  //     }

  //     runInAction(() => {
  //       this.loadingMessage = `Calling dosuku API, looking for ${this.difficulty.toLowerCase()} game...`;
  //     });
  //     console.log(this.loadingMessage);

  //     fetch(
  //       "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:20){grids{value,solution,difficulty}}}"
  //     )
  //       .then((response) => response.json())
  //       .then(({ newboard }) => {
  //         // Check if fetching has been canceled after receiving response
  //         if (!this.isFetching) {
  //           return;
  //         }

  //         const matchingDifficulty = newboard.grids.find(
  //           (grid: any) => grid.difficulty === this.difficulty
  //         );

  //         if (matchingDifficulty) {
  //           this.board = matchingDifficulty.value;
  //           this.solution = matchingDifficulty.solution;
  //           this.drawBoard();
  //           runInAction(() => {
  //             this.isLoading = false;
  //           });
  //           this.isFetching = false; // Fetching is completeh
  //           console.log("set board", matchingDifficulty);
  //         } else {
  //           runInAction(() => {
  //             this.loadingMessage = `API did not return ${this.difficulty} game, fetching again...`;
  //           });
  //           console.log(this.loadingMessage);
  //           // Retry fetching if fetching hasn't been canceled
  //           if (this.isFetching) {
  //             setTimeout(fetchBoard, 100);
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching Sudoku board:", error);
  //         // Retry fetching if fetching hasn't been canceled
  //         if (this.isFetching) {
  //           setTimeout(fetchBoard, 100);
  //         } else {
  //           runInAction(() => {
  //             this.isLoading = false;
  //           });
  //         }
  //       });
  //   };

  //   runInAction(() => {
  //     this.isLoading = true;
  //   });

  //   fetchBoard();
  // }

  // FETCH NEW BOARD MOCKED
  // fetchNewBoard() {
  //   this.board = [
  //     [0, 2, 0, 3, 9, 0, 0, 0, 6],
  //     [8, 0, 0, 0, 4, 5, 0, 0, 0],
  //     [0, 0, 0, 0, 2, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 3, 0, 0, 0, 7, 8, 0],
  //     [2, 9, 0, 7, 0, 0, 0, 5, 0],
  //     [3, 0, 0, 0, 0, 0, 0, 0, 1],
  //     [9, 0, 5, 0, 0, 1, 6, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 2, 0]
  //   ];
  //   this.solution = [
  //     [5, 2, 1, 3, 9, 7, 8, 4, 6],
  //     [8, 6, 7, 1, 4, 5, 2, 3, 9],
  //     [4, 3, 9, 6, 2, 8, 5, 1, 7],
  //     [1, 7, 4, 8, 5, 2, 9, 6, 3],
  //     [6, 5, 3, 4, 1, 9, 7, 8, 2],
  //     [2, 9, 8, 7, 6, 3, 1, 5, 4],
  //     [3, 8, 2, 5, 7, 6, 4, 9, 1],
  //     [9, 4, 5, 2, 3, 1, 6, 7, 8],
  //     [7, 1, 6, 9, 8, 4, 3, 2, 5]
  //   ];
  //   this.isLoading = false;
  //   this.drawBoard();
  // }

  // FETCH NEW BOARD CUSTOM
  fetchNewBoard() {
    runInAction(() => {
      this.isLoading = true;
    });

    setTimeout(() => {
      puzzleGenerator.generatePuzzle(this.difficulty);
      runInAction(() => {
        this.board = toJS(puzzleGenerator.puzzle);
        this.solution = toJS(puzzleGenerator.solution);
        this.isLoading = false;
      });
      this.drawBoard();
    }, 0);
  }

  drawBoard() {
    if (!this.board || !this.solution) return;
    this.gridElement!.style.pointerEvents = "auto";
    for (let i = 0; i < this.board!.length; i++) {
      for (let j = 0; j < this.board![i].length; j++) {
        this.cells.push(new CellClass(this, i, j, this.board![i][j]));
      }
    }
  }

  setCellActive(row: number, col: number, value: number) {
    this.cells.forEach((cell) => {
      if (cell.row === row && cell.col === col) {
        cell.isActive = true;
        cell.cellElement!.classList.add("active");
        cell.cellElement!.classList.remove("incorrect");
        this.activeCell = cell;

        // if incorrect, set value to 0
        if (cell.cellElement!.classList.contains("incorrect")) {
          cell.value = 0;
          cell.inputElement!.value = "";
        } else {
          this.highlight(value);
        }

        cell.cellElement!.classList.remove("incorrect");
      } else {
        cell.isActive = false;
        cell.cellElement!.classList.remove("active");
      }
    });
  }

  removeActiveCell() {
    this.cells.forEach((cell) => {
      cell.isActive = false;
      cell.cellElement!.classList.remove("active");
    });
    this.activeCell = null;
  }

  highlight(value: number) {
    this.cells.forEach((cell) => {
      if (cell.value === value && value !== 0) {
        cell.cellElement!.classList.add("highlighted");
      } else {
        cell.cellElement!.classList.remove("highlighted");
      }
    });
  }

  checkBoard() {
    if (!this.board || !this.solution) return;
    let isCorrect = true;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] !== 0 &&
          this.board[i][j] !== this.solution[i][j]
        ) {
          isCorrect = false;
          const cellToMark = this.cells.find(
            (cell) => cell.row === i && cell.col === j
          );
          cellToMark!.cellElement!.classList.remove("locked");
          cellToMark!.cellElement!.classList.add("incorrect");
        }
      }
    }

    setTimeout(() => {
      if (isCorrect && this.cells.every((cell) => cell.value !== 0)) {
        this.highlight(0);
        alert("🎉 Congratulations! You solved the puzzle!");
        this.gridElement!.style.pointerEvents = "none";
      } else if (this.cells.some((cell) => cell.value !== 0) && isCorrect) {
        alert("👍 You're on the right track! Keep it up!");
      } else {
        alert("❌ Sorry, that's not correct.");
      }
    }, 0);
  }

  checkForLockedNumbers() {
    const digitsUsedNineTimes = [];
    for (let i = 1; i <= 9; i++) {
      let timesUsed = 0;
      for (let j = 0; j < this.cells.length; j++) {
        if (this.cells[j].value === i) {
          timesUsed++;
        }
        this.cells[j].cellElement!.classList.remove("locked");
      }
      if (timesUsed === 9) {
        digitsUsedNineTimes.push(i);
      }
    }

    digitsUsedNineTimes.forEach((digit) => {
      this.cells.forEach((cell) => {
        if (cell.value === digit) {
          cell.cellElement!.classList.add("locked");
        }
      });
    });

    if (
      this.cells.every((cell) => cell.value !== 0) &&
      !this.cells.some((cell) =>
        cell.cellElement!.classList.contains("incorrect")
      )
    ) {
      this.checkBoard();
    }
  }

  restartGame(e: Event) {
    this.difficulty = (e.target! as HTMLButtonElement).dataset
      .difficulty as Difficulty;
    this.cells.forEach((cell) => {
      cell.cellElement!.remove();
    });
    this.cells = [];
    runInAction(() => {
      this.loadingMessage = `Creating new ${this.difficulty.toLowerCase()} game...`;
    });
    this.fetchNewBoard();
  }
}

const sudokuGameState = new SudokuGameLogic();
export default sudokuGameState;
