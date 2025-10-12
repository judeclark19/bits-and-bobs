import { makeAutoObservable } from "mobx";

class Clock {}

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
