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

class MetaClockLogic {
  time: Date;
  hours: string;
  minutes: string;
  seconds: string;
  constructor() {
    this.time = new Date();
    this.hours = this.time.getHours().toString().padStart(2, "0");
    this.minutes = this.time.getMinutes().toString().padStart(2, "0");
    this.seconds = this.time.getSeconds().toString().padStart(2, "0");

    makeAutoObservable(this);

    this.init();
  }

  init() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    this.time = new Date();
    this.hours = this.time.getHours().toString().padStart(2, "0");
    this.minutes = this.time.getMinutes().toString().padStart(2, "0");
    this.seconds = this.time.getSeconds().toString().padStart(2, "0");
  }
}

export const metaClockLogic = new MetaClockLogic();
export default metaClockLogic;
