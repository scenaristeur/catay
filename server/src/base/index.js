import { v4 as uuidv4 } from "uuid";
export class Base {
    constructor(options = {}) {
        this.options = options
      this.id = uuidv4()
    }

    log(...args) {
      if (this.options.debug){
        console.log(this.flag,...args)
      }
      
    }
}