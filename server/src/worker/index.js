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
      this.log("Salut, je suis", this.name)
      if (this.options.yjs_url && this.options.yjs_room){
        this.log("connecting to YJS", this.yjs_url, this.yjs_room)
        this.yjs = new YjsConnector(this.options);
      }else{
        this.log("!!! yjs_url NOT SET ! see https://github.com/scenaristeur/catay/blob/main/server/index.js")
      }
      if (this.options.catai_url){
        this.log("connecting to CATAI", this.catai_url)
        this.catai = new CataiConnector(this.options)
      }else{
        this.log("!!! catai_url NOT SET ! see https://github.com/scenaristeur/catay/blob/main/server/index.js")
      }
    



        
  
    }
}