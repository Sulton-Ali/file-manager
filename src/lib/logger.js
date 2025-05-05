import { StyledError } from "./model.js";

export const log = (...args) => console.log("[file_manager]", ...args);

export const die = (message, code = 1) => {
  console.error("[file_manager] ❌", message);
  process.exit(code);
};

export const logError = (error) => {
  if (error instanceof StyledError) {
    console.error(error.getError());
  } else {
    console.error(error.message);
  }
};
