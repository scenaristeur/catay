import {fileURLToPath} from "url";
import path from "path";
import {
    LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "vicuna-7b-v1.5-16k.Q2_K.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});


const q1 = "Quelle est la capitale de la France ?";
console.log(new Date()+"User: " + q1);

process.stdout.write(new Date()+"AI: ");
const a1 = await session.prompt(q1, {
    onToken(chunk) {
        process.stdout.write(context.decode(chunk));
    }
    
});
console.log(new Date()+"terminé")