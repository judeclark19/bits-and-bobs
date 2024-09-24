import { toJS } from "mobx";
import { SudokuGameLogic } from "./Game";

export class CellClass {
  game: SudokuGameLogic;
  row: number;
  col: number;
  value: number;
  cellElement: HTMLDivElement | null = null;
  inputElement: HTMLInputElement | null = null;
  isActive = false;

  constructor(game: SudokuGameLogic, row: number, col: number, value: number) {
    this.game = game;
    this.row = row;
    this.col = col;
    this.value = value;

    this.initCell();
  }

  initCell() {
    this.cellElement = document.createElement("div");
    this.cellElement.classList.add("cell");
    this.cellElement.dataset.row = this.row.toString();
    this.cellElement.dataset.col = this.col.toString();

    // cell will contain the starting value OR an input element if the cell is empty
    if (this.value === 0) {
      this.cellElement.classList.add("empty");
      this.inputElement = document.createElement("input");
      this.inputElement.type = "number";
      this.inputElement.min = "1";
      this.inputElement.max = "9";
      this.inputElement.value = "";
      this.inputElement.addEventListener("input", (e) => {
        let value = (e.target as HTMLInputElement).value;

        // Validation: input must be single digit
        if (value.length > 1) {
          value = value.slice(0, 1);
        } else if (/\D/.test(value)) {
          value = value.replace(/\D/g, "");
        }

        this.inputElement!.value = value === "0" ? "" : value;
        this.setValue(value === "" ? 0 : parseInt(value));
        this.game.setCellActive(this.row, this.col, this.value);
      });
      this.cellElement.appendChild(this.inputElement);
    } else {
      this.cellElement.textContent = this.value.toString();
    }

    this.cellElement.addEventListener("click", this.handleCellClick.bind(this));
    this.cellElement.addEventListener(
      "contextmenu",
      this.handleRightClick.bind(this)
    );
    this.game.gridElement!.appendChild(this.cellElement);
  }

  handleCellClick() {
    if (!this.cellElement?.classList.contains("empty")) {
      this.game.highlight(this.value);
      this.game.removeActiveCell();
      return;
    }

    this.game.setCellActive(this.row, this.col, this.value);
    if (this.game.popover!.isOpen) {
      this.game.popover!.closePopover();
    }
  }

  handleRightClick(e: Event) {
    if (!this.cellElement?.classList.contains("empty")) return;
    e.preventDefault();
    this.game.setCellActive(this.row, this.col, this.value);
    this.game.popover!.openPopover();
  }

  setValue(value: number) {
    this.value = value;
    this.game.board![this.row][this.col] = value;
    this.game.checkForLockedNumbers();
  }
}
