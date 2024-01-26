import { CataiConnector } from "../cataiConnector/index.js";
import { YjsConnector } from "../yjsConnector/index.js";
import { Base } from "../base/index.js";
export class Worker extends Base {
    constructor(options = {}) {
super(options)
this.options = options
      this.flag = "[WORKER]"
      this.chalk = this.chalk.blue
      this.name = options.name || "inconnu";
      this.catai_url = options.catai_url || "ws://localhost:3000";
      this.yjs_url = options.yjs_url || "ws://localhost:1234";
      this.yjs_room = options.yjs_room || "my-roomname";
      this._init()
    }
    _init(){
      this.yjs = new YjsConnector(this.options);
      this.catai = new CataiConnector(this.options)



        
      this.log("test if worker is ok", this.name)
    }
}