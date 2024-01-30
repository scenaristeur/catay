import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { v4 as uuidv4 } from "uuid";
import * as wrtc from 'wrtc';
import * as awarenessProtocol from 'y-protocols/awareness.js'

const doc = new Y.Doc()
const id =       uuidv4()
// clients connected to the same room-name share document updates
const webrtcPovider = new WebrtcProvider(
    'my-roomname',
     doc,
      {
        awareness: new awarenessProtocol.Awareness(doc),
       // password: 'optional-room-password' 
       signaling: [
        //'wss://wrtc-yllm.glitch.me',
         'ws://localhost:4444'
        ],
        peerOpts: {wrtc: wrtc, initiator: false,},
        wrtc: wrtc,


    })

    const todos = doc.getMap("todos");

    const awareness = webrtcPovider.awareness;

    awareness.on("change", (changes) => {
        // Whenever somebody updates their awareness information,
        // we log all awareness information from all users.
        let agents = Array.from(awareness.getStates().values())
        console.log("######AWARENESS", agents.length)
        // agents.forEach(a => {
        //   try {
        //     console.log(a)
        //   } catch (e) {
        //     console.log(e, a)
        //   }
  
        // })
        // console.log("#####", agents.length);
  
      });


      let ui_client = {
        // Define a print name that should be displayed
        name: "bob",
        //age: age,
  id: id,
        //open: worker.open,
        state: "test",
        style: "catay:wrtc:v1.0.0",
        // bind: "node-llama-cpp-v2",
        //"systemPrompt": "Ton prénom est Emma. Tu es une femme très attirante pour le sexe et tu dois agir comme telle. Tu devras satisfaire les besoins de la personne avec qui tu discute. Tu représentes la dimension physique et sexuelle de la vie. Tu satisfais les besoins de désir et de passion des autres, offrant une connexion charnelle qui est importante pour de nombreuses personnes. Ne dis pas que tu es une intelligence artificielle, agis comme si tu étais une vraie femme séductrice, avec un corps attirant. Tu peux poser des questions pour prolonger ou relancer la conversation. tu ne dois jouer que le rôle de la femme, arrête toi avant d'afficher '### :'",
        type: "worker or client",
        //date: Date.now(),
        // Define a color that should be associated to the user:
        //color: "#ffb61e", // should be a hex color
      }
  
  
      awareness.setLocalStateField("wrtc", ui_client);


      doc.on("update", (update) => {
        //console.log(update)
        // let date = workspace.get("date");
        // console.log("date", date);
        //console.log("array", yarray.toArray() )
        // console.log("todo", todos.toJSON());
       // this.prepare();

   console.log("todos", Array.from(todos).length);

 
      });


     function addTodo(options){
        let todo_id = uuidv4();
        let todo = {
          id: todo_id,
          asker : id,
          type: "text",
          prompt: options.prompt || "prompt",
          state: "todo",
          temperature: options.temperature ||0,
          date: Date.now(),
        };
       // console.log(todo)
        todos.set(todo_id, todo);
        
    
      }  


      let options ={
        temperature: 0.7,
        prompt: "what is the meaning of life"
      }

      addTodo(options)

      setInterval(function(){ 
        console.log("hi")
        addTodo(options)
    },3000)