import {fileURLToPath} from "url";
import path from "path";
import {
    LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const modelName = "vicuna-7b-v1.5-16k.Q2_K.gguf"

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", modelName)
});


let prompts = []
let sessions = {}


const callback = (text) => {
    console.log(text)
    // with websocket should be emit to socket
   }

const chat = async (options, cb)=>{
 cb("### "+options.user +" say "+options.prompt)
 cb("### starting session n°"+options.id)
 const context = new LlamaContext({model});

 let sessionOptions = {
    context: context,
    conversationHistory:options.conversationHistory || []
 }

 // https://github.com/withcatai/node-llama-cpp/blob/c0f5bd8/src/llamaEvaluator/LlamaChatSession.ts#L180
 if (options.systemPrompt != undefined) sessionOptions.systemPrompt = options.systemPrompt

 const session = new LlamaChatSession(sessionOptions );
 let s = {
    options : options,
    //context: context,
    modelName: modelName,
    session: session,
    start : Date.now(),
    response: ""
 }



 sessions[options.id] = s
 
 console.log("### sessions actives ", sessions)

 const chat = await session.prompt(options.prompt, {
    // Temperature et autres prompt options https://withcatai.github.io/node-llama-cpp/guide/chat-session#custom-temperature
    temperature: options.temperature || 0.7,
    onToken(chunk) {
        const tok = context.decode(chunk)
        cb("---actives("+Object.keys(sessions).length+")---"+options.id+"__ "+tok);
        s.response += tok
    }
   
});
// should i close session ?  session.close()
s.end = Date.now()
s.duration = s.end-s.start
cb("!!! session terminée n°"+options.id+" : "+s.response, s)

delete sessions[options.id]
console.log("!!! sessions actives ", sessions)

}

let alice_prompt = {
    id: "1",
    user: "Alice",
    prompt: "Quelle est la capitale de la France ?",
    systemPrompt: "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
    temperature: 0.8
}


let bob_prompt = {
    id: "2",
    user: "Bob",
    prompt: "Raconte-moi une blague au sujet d'une rose.",
    systemPrompt: "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
    temperature: 0.8
    //prompt: "C'est qui la physique quantique ?",
}

let carlo_prompt = {
    id: "3",
    user: "Carlo",
    prompt: "Toc Toc Toc, qui est là ? ",
    systemPrompt: "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
    temperature: 0.8
}

let denise_prompt = {
    id: "4",
    user: "Denise",
    prompt: "Toc Toc Toc, qui est là ? ",
    systemPrompt: "Tu es un pirate et tu dois agir comme tel. tu termines toutes tes phrases par 'Hé! Hé! Hé!'",
    temperature: 0.2
}


//prompts.push(alice_prompt)
prompts.push(bob_prompt)
prompts.push(carlo_prompt)
prompts.push(denise_prompt)

// lancer en parallèle les chats
for (let p of prompts){
    console.log("\nP", p)
    let chatsession = chat(p, callback) 
}
