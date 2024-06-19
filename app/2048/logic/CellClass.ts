import { makeAutoObservable } from "mobx";
import TileClass from "./TileClass";

export default class CellClass {
  x: number;
  y: number;
  tile: TileClass | null = null;
  incomingTile: TileClass | null = null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    makeAutoObservable(this);
  }

  canAccept(tile: TileClass | null) {
    if (!tile) return true;
    if (!this.tile) return true;
    return this.tile.value == tile.value && !this.incomingTile;
  }

  mergeIn(incomingTile: TileClass) {
    if (!this.tile) return;
    this.incomingTile = incomingTile;
    this.incomingTile.tileEl.addEventListener("transitionend", () => {
      this.incomingTile?.tileEl.remove();
      this.incomingTile = null;
    });
    this.incomingTile.setZ(0);
    this.incomingTile.setX(this.x);
    this.incomingTile.setY(this.y);

    this.tile!.value *= 2;
    this.tile!.tileEl.innerHTML = this.tile!.value.toString();
    const backgroundBrightness = 100 - Math.log2(this.tile!.value) * 9;
    this.tile!.tileEl.style.setProperty(
      "--background-color-brightness",
      `${backgroundBrightness}%`
    );
    this.tile!.tileEl.style.setProperty(
      "--text-brightness",
      `${backgroundBrightness <= 50 ? 90 : 10}%`
    );
  }
}
