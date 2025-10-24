import { makeAutoObservable } from "mobx";

class MemoryMatchLogic {
  flipped: boolean;
  cardSizePx: number = 120;

  constructor() {
    this.flipped = false;
    makeAutoObservable(this);
    console.log("MemoryMatchLogic initialized");
  }

  setFlipped(value: boolean) {
    this.flipped = value;
  }
}

export default MemoryMatchLogic;
