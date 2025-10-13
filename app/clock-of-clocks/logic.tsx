import { makeAutoObservable } from "mobx";

export const rotation = {
  " ": [135, 135],
  "┘": [180, 270],
  "└": [0, 270],
  "┐": [90, 180],
  "┌": [0, 90],
  "-": [0, 180],
  "|": [90, 270]
};

export const digits = {
  "0": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ],

  "1": [
    "┌",
    "-",
    "┐",
    " ",
    "└",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    "┌",
    "┘",
    "└",
    "┐",
    "└",
    "-",
    "-",
    "┘"
  ],

  "2": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "└",
    "-",
    "-",
    "┘"
  ],

  "3": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    " ",
    "┌",
    "┘",
    "|",
    " ",
    "└",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ],

  "4": [
    "┌",
    "┐",
    "┌",
    "┐",
    "|",
    "|",
    "|",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "└",
    "┘"
  ],

  "5": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ],

  "6": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ],

  "7": [
    "┌",
    "-",
    "-",
    "┐",
    "└",
    "-",
    "┐",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "|",
    "|",
    " ",
    " ",
    "└",
    "┘"
  ],

  "8": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ],

  "9": [
    "┌",
    "-",
    "-",
    "┐",
    "|",
    "┌",
    "┐",
    "|",
    "|",
    "└",
    "┘",
    "|",
    "└",
    "-",
    "┐",
    "|",
    "┌",
    "-",
    "┘",
    "|",
    "└",
    "-",
    "-",
    "┘"
  ]
};

export class MetaClockLogic {
  time: Date;
  hours: string;
  minutes: string;
  seconds: string;
  private timer: number | undefined;

  constructor() {
    this.time = new Date();
    this.hours = this.time.getHours().toString().padStart(2, "0");
    this.minutes = this.time.getMinutes().toString().padStart(2, "0");
    this.seconds = this.time.getSeconds().toString().padStart(2, "0");

    makeAutoObservable(this);
  }

  start() {
    if (typeof window === "undefined") return;
    if (this.timer !== undefined) return;
    this.timer = window.setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  stop() {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  updateTime() {
    this.time = new Date();
    this.hours = this.time.getHours().toString().padStart(2, "0");
    this.minutes = this.time.getMinutes().toString().padStart(2, "0");
    this.seconds = this.time.getSeconds().toString().padStart(2, "0");
  }
}

export function createMetaClockLogic() {
  return new MetaClockLogic();
}
