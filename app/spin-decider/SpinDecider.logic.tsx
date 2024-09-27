import { makeAutoObservable, toJS } from "mobx";
// @ts-ignore
import { Wheel } from "spin-wheel";

type WheelItem = {
  label: string;
  backgroundColor?: string;
};

class SpinDeciderState {
  isInitialized = false;
  wheelContainer: HTMLDivElement | null = null;
  inputsContainer: HTMLDivElement | null = null;
  inputs: HTMLInputElement[] | null = null;
  itemLabelRadius = 0.9;
  itemLabelRadiusMax = 0.5;
  wheelInstance: Wheel | null = null;
  props: {
    items: WheelItem[];
    itemLabelRadius: number;
    itemLabelRadiusMax: number;
  } = {
    items: Array(2)
      .fill(0)
      .map((_, i) => ({ label: `Thing ${i + 1}` })),
    itemLabelRadius: 0.9,
    itemLabelRadiusMax: 0.5
  };

  constructor() {
    makeAutoObservable(this);
  }

  initWheel(wheelContainer: HTMLDivElement, inputsContainer: HTMLDivElement) {
    this.wheelContainer = wheelContainer;
    this.inputsContainer = inputsContainer;
    this.inputs = Array.from(inputsContainer.querySelectorAll("input"));
    console.log(
      "inputs",
      toJS(this.inputs).map((input) => input.value)
    );

    this.props.items = this.inputs.map((input, i) => ({
      label: input.value === "" ? `Thing ${i + 1}` : input.value
    }));

    this.isInitialized = true;
    this.generateColors(this.props.items.length);
    this.wheelInstance = new Wheel(this.wheelContainer, this.props);

    this.wheelInstance.onRest = (event: { currentIndex: any }) => {
      const winningIndex = event.currentIndex;
      const winningItem = this.props.items[winningIndex];
      alert(`The winner is: ${winningItem.label}`);
    };
    console.log("wheel", this.wheelInstance);
  }

  generateColors(num: number) {
    const colors: string[] = [];
    for (let i = 0; i < num; i++) {
      colors.push(`hsl(${(i * 360) / num}, 70%, 50%)`);
    }
    this.props.items = this.props.items.map((item, index) => ({
      ...item,
      backgroundColor: colors[index]
    }));
  }

  updateItemCount(count: number) {
    this.props.items = Array(count)
      .fill(0)
      .map((_, i) => ({
        label: `Thing ${i + 1}`
      }));
    this.generateColors(count);
    if (this.wheelContainer) {
      this.wheelContainer.innerHTML = "";
      this.initWheel(this.wheelContainer, this.inputsContainer!);
    }
  }

  spinWheel() {
    if (this.wheelInstance) {
      const randomIndex = Math.floor(Math.random() * this.props.items.length);
      const duration = 3500;
      const numberOfRevolutions = 10; // Spins 10 times
      this.wheelInstance.spinToItem(
        randomIndex,
        duration,
        true,
        numberOfRevolutions,
        1,
        null
      );
    }
  }
}

export default new SpinDeciderState();
