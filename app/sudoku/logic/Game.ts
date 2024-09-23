import { makeAutoObservable, toJS } from "mobx";
import { runInAction } from "mobx";
import { CellClass } from "./Cell";
import { PopoverClass } from "./Popover";

export class SudokuGameLogic {
  gameContainer: HTMLDivElement | null = null;
  gridElement: HTMLDivElement | null = null;
  //   popoverElement: HTMLDivElement | null = null;
  popover: PopoverClass | null = null;
  newGameButtons: NodeListOf<HTMLButtonElement> | null = null;
  checkButton: HTMLButtonElement | null = null;
  isInitialized = false;
  difficulty: "Easy" | "Medium" | "Hard" = "Easy";
  board: number[][] | null = null;
  solution: number[][] | null = null;
  cells: CellClass[] = [];
  activeCell: CellClass | null | undefined = null;
  popoverIsOpen = false;
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  initializeGame(
    gameContainer: HTMLDivElement,
    difficulty: "Easy" | "Medium" | "Hard"
  ) {
    this.gameContainer = gameContainer;
    this.difficulty = difficulty;
    console.log("initializeGame", this.difficulty);
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

  //   fetchNewBoard() {
  //     console.log("fetchNewBoard", this.difficulty);

  //     const fetchBoard = () => {
  //       fetch("https://sudoku-api.vercel.app/api/dosuku")
  //         .then((response) => {
  //           if (response.status === 504) {
  //             console.log("504, fetching again");
  //             setTimeout(fetchBoard, 1000);
  //           }
  //           return response.json();
  //         })
  //         .then(({ newboard }) => {
  //           const fetchedDifficulty = newboard.grids[0].difficulty;
  //           if (fetchedDifficulty === this.difficulty) {
  //             // this.board = newboard;
  //             console.log("Sudoku board fetched:", newboard);
  //             this.board = newboard.grids[0].value;
  //             this.solution = newboard.grids[0].solution;
  //             this.drawBoard();
  //             runInAction(() => {
  //               this.isLoading = false;
  //             });
  //           } else {
  //             console.log("Difficulty does not match, fetching again");
  //             setTimeout(fetchBoard, 1000); // Retry after 1 second
  //             //   fetchBoard(); // Fetch again if difficulty does not match
  //           }
  //         })
  //         .catch((error) => {
  //           // TODO: Handle api error

  //           console.error("Error fetching Sudoku board:", error);
  //         });
  //     };
  //     runInAction(() => {
  //       this.isLoading = true;
  //     });
  //     fetchBoard();

  //   }

  fetchNewBoard() {
    this.board = [
      [0, 2, 0, 3, 9, 0, 0, 0, 6],
      [8, 0, 0, 0, 4, 5, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 7, 8, 0],
      [2, 9, 0, 7, 0, 0, 0, 5, 0],
      [3, 0, 0, 0, 0, 0, 0, 0, 1],
      [9, 0, 5, 0, 0, 1, 6, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0]
    ];
    this.solution = [
      [5, 2, 1, 3, 9, 7, 8, 4, 6],
      [8, 6, 7, 1, 4, 5, 2, 3, 9],
      [4, 3, 9, 6, 2, 8, 5, 1, 7],
      [1, 7, 4, 8, 5, 2, 9, 6, 3],
      [6, 5, 3, 4, 1, 9, 7, 8, 2],
      [2, 9, 8, 7, 6, 3, 1, 5, 4],
      [3, 8, 2, 5, 7, 6, 4, 9, 1],
      [9, 4, 5, 2, 3, 1, 6, 7, 8],
      [7, 1, 6, 9, 8, 4, 3, 2, 5]
    ];
    this.isLoading = false;
    this.drawBoard();
  }

  drawBoard() {
    if (!this.board || !this.solution) return;
    // this.gridElement!.innerHTML = "";

    for (let i = 0; i < this.board!.length; i++) {
      for (let j = 0; j < this.board![i].length; j++) {
        this.cells.push(new CellClass(this, i, j, this.board![i][j]));
      }
    }
  }

  setCellActive(row: number, col: number) {
    this.cells.forEach((cell) => {
      if (cell.row === row && cell.col === col) {
        cell.isActive = true;
        cell.cellElement!.classList.add("active");
        cell.cellElement!.classList.remove("incorrect");
        this.activeCell = cell;
      } else {
        cell.isActive = false;
        cell.cellElement!.classList.remove("active");
      }
    });
  }

  checkBoard() {
    // compare this.board with this.solution
    if (!this.board || !this.solution) return;
    console.log("checkBoard", toJS(this.board), toJS(this.solution));
    let isCorrect = true;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (
          this.board[i][j] !== 0 &&
          this.board[i][j] !== this.solution[i][j]
        ) {
          isCorrect = false;
          this.cells
            .find((cell) => cell.row === i && cell.col === j)!
            .cellElement!.classList.add("incorrect");
        }
      }
    }

    setTimeout(() => {
      if (isCorrect && this.cells.every((cell) => cell.value !== 0)) {
        alert("🎉 Congratulations! You solved the puzzle!");
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

    if (this.cells.every((cell) => cell.value !== 0)) {
      this.checkBoard();
    }
  }

  restartGame(e: Event) {
    console.log(
      "restartGame",
      (e.target! as HTMLButtonElement).dataset.difficulty
    );
    this.difficulty = (e.target! as HTMLButtonElement).dataset.difficulty as
      | "Easy"
      | "Medium"
      | "Hard";
    this.cells.forEach((cell) => {
      cell.cellElement!.remove();
    });
    this.cells = [];
    this.fetchNewBoard();
  }
}

const sudokuGameState = new SudokuGameLogic();
export default sudokuGameState;
