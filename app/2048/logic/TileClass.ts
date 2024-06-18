import { makeAutoObservable } from "mobx";

export default class TileClass {
  x: number;
  y: number;
  z: number = 1;
  value: number;
  tileEl: HTMLDivElement;

  constructor(x: number, y: number, value: number, tileEl: HTMLDivElement) {
    makeAutoObservable(this);
    this.x = x;
    this.y = y;
    this.value = value;
    this.tileEl = tileEl;

    this.initTileEl();
  }

  setX(x: number) {
    this.x = x;
    this.tileEl.style.setProperty("--tile-x", this.x.toString());
  }

  setY(y: number) {
    this.y = y;
    this.tileEl.style.setProperty("--tile-y", this.y.toString());
  }

  setZ(z: number) {
    this.z = z;
    this.tileEl.style.setProperty("--tile-z", this.z.toString());
  }

  initTileEl() {
    this.tileEl.classList.add("tile");
    this.tileEl.innerHTML = this.value.toString();
    this.tileEl.style.setProperty("--tile-x", this.x.toString());
    this.tileEl.style.setProperty("--tile-y", this.y.toString());

    const backgroundColorBrightness = 100 - Math.log2(this.value) * 9;
    const textBrightness = backgroundColorBrightness <= 50 ? 90 : 10;
    this.tileEl.style.setProperty(
      "--background-color-brightness",
      `${backgroundColorBrightness}%`
    );
    this.tileEl.style.setProperty("--text-brightness", `${textBrightness}%`);
  }
}
