import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";

export class Base {
  constructor(options = {}) {
    this.options = options;
    this.id = uuidv4();
    this.flag = "[BASE]";
    this.chalk = chalk;
  }

  log(...args) {
    if (this.options.debug) {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      console.log("[" + hour + ":" + min + ":" + sec+"]", this.chalk(this.flag, ...args));
    }
  }
}
