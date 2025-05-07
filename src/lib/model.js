import { styleText } from "node:util";

export class StyledError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }

  getError() {
    return (
      styleText(["red"], `[${this.name}]: `) +
      styleText(["blueBright"], this.message)
    );
  }
}
