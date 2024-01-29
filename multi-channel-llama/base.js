import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "vicuna-7b-v1.5-16k.Q2_K.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});


const q1 = "Raconte-moi une histoire d'ados";
console.log(new Date() +"User: " + q1);

const a1 = await session.prompt(q1);
console.log(new Date() +"AI: " + a1);


const q2 = "transforme cette histoire en chanson";
console.log(new Date() +"User: " + q2);

const a2 = await session.prompt(q2);
console.log(new Date() +"AI: " + a2);