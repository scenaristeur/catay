import { Base } from "../base/index.js";
import { RemoteCatAI } from "catai";

export class CataiConnector extends Base {
  constructor(options = {}) {
    super(options);
    this.flag = "[CATAI]";
    this.chalk = this.chalk.rgb(123, 45, 67); //.hex('#DEADED')

    this._init();
  }
  async _init() {
    this.catai = new RemoteCatAI(this.options.catai_url);
    this.catai.on("open", async () => {
      this.log("Connected to ", this.options.catai_url);
      if (this.options.debug) {
        await this.test();
      }
    });

    this.catai.on("close", async () => {
      this.log("CATAI close");
      this.state = "ws closed";
      this.log("state", this.state);
    });

    this.catai.on("error", async (err) => {
      this.log("CATAI error", err);
      this.state = "ws error";
      this.log("state", this.state);
      // relance de la connexion après un délai ?
    });
  }
  async test() {
    this.log("test if catai is ok");

    this.log("Connected, sending 'Are you ready?' to catai...");
    const response = await this.catai.prompt(
      "Hello Catai, are you ready ?",
      (token) => {
        process.stdout.write(token);
      }
    );

    this.log(`[TEST] Total text length: ${response.length}`);
    this.state =
      response.length > 0
        ? "ready"
        : "no response, did you launch catai ? see https://github.com/withcatai/catai";
    this.log("state", this.state);
  }
}
