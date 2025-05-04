import { styleText } from "node:util";

export class InputError extends Error {
  constructor(message) {
    this.message = message;
  }

  get error() {
    return (
      styleText(["red"], "[Invalid input]: ") +
      styleText("blueBright", this.message)
    );
  }
}
