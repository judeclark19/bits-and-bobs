import { makeAutoObservable } from "mobx";
import { SudokuGameLogic } from "./Game";

export class PopoverClass {
  game: SudokuGameLogic;
  popoverElement: HTMLDivElement;
  isOpen = false;
  constructor(game: SudokuGameLogic, popoverElement: HTMLDivElement) {
    this.game = game;
    this.popoverElement = popoverElement;
    makeAutoObservable(this);
  }

  addPopoverEventListeners() {
    const valueButtons =
      this.popoverElement!.querySelectorAll("button[data-value]");
    valueButtons.forEach((button) => {
      button.addEventListener(
        "click",
        this.handlePopoverButtonClick.bind(this)
      );
    });

    const closeButton = this.popoverElement!.querySelector("#close");
    closeButton!.addEventListener("click", this.closePopover.bind(this));
  }

  handlePopoverButtonClick(event: Event) {
    console.log(
      "handlePopoverButtonClick",
      (event.target! as HTMLButtonElement).dataset.value,
      this.game.activeCell
    );

    const clickedValue = parseInt(
      (event.target! as HTMLButtonElement).dataset.value!
    );
    if (this.game.activeCell) {
      this.game.activeCell.setValue(clickedValue);
      console.log("APPLY INPUT VALUE:", clickedValue.toString());
      this.game.activeCell.inputElement!.value =
        clickedValue === 0 ? "" : clickedValue.toString();

      this.closePopover();
    }
  }

  openPopover() {
    this.isOpen = true;
    this.popoverElement!.style.display = "grid";
    this.game.activeCell = this.game.cells.find((cell) => cell.isActive);
    if (
      this.game.activeCell &&
      this.game.activeCell.cellElement &&
      this.game.gridElement
    ) {
      const gridRect = this.game.gridElement!.getBoundingClientRect();
      const cellRect = this.game.activeCell.cellElement.getBoundingClientRect();
      const popoverRect = this.popoverElement!.getBoundingClientRect();

      let popoverLeft = cellRect.right - gridRect.left;
      if (popoverLeft + popoverRect.width > window.innerWidth) {
        popoverLeft = cellRect.left - gridRect.left - popoverRect.width;
      }

      this.popoverElement!.style.top = `${cellRect.top - gridRect.top}px`;
      this.popoverElement!.style.left = `${popoverLeft}px`;
    }
  }
  closePopover() {
    this.isOpen = false;
    this.popoverElement!.style.display = "none";
  }
}
