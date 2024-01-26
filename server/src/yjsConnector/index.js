import { v4 as uuidv4 } from "uuid";
import { Base } from "../base/index.js";
export class YjsConnector extends Base{
    constructor(options = {}) {
  super(options)
      this.flag = "[CATAI]"
      this._init()
    }
    _init(){
      this.log("connecting catai")

        
      
    }

}