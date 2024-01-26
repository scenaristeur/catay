import { v4 as uuidv4 } from "uuid";
export class CataiConnector {
    constructor({ name = "inconnu" }) {
      this.name = name;
      this.id = uuidv4()

      this._init()
    }
    _init(){



      
      console.log("test if catai is ok")
    }
}