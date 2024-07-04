import { makeAutoObservable } from "mobx";

export default class Cell {
  letter: string = "";
  gridCoords: number[] = [];
  cellElement: HTMLDivElement;
  backgroundColor: string = "transparent";

  constructor(gridCoords: number[], cellElement: HTMLDivElement) {
    makeAutoObservable(this);
    this.gridCoords = gridCoords;
    this.cellElement = cellElement;
  }

  setLetter(letter: string) {
    this.letter = letter;
    this.cellElement.textContent = letter;
  }

  setBackgroundColor(color: string) {
    this.backgroundColor = color;
    this.cellElement.style.backgroundColor = color;
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }
}
