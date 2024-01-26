import { v4 as uuidv4 } from "uuid";
import chalk from 'chalk';



export class Base {
    constructor(options = {}) {
      this.options = options
      this.id = uuidv4()
      this.flag = "[BASE]"
      this.chalk = chalk
    }

    log(...args) {
      if (this.options.debug){
        console.log(this.chalk(this.flag,...args))
      }
      
    }
}