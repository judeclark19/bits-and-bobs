import { makeAutoObservable } from "mobx";

export default class Cell {
  letter: string = "";
  gridCoords: number[] = [];
  cellElement: HTMLDivElement;

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
    this.cellElement.style.backgroundColor = color;
  }
}
