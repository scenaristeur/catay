import {RemoteCatAI} from 'catai';

const catai = await new RemoteCatAI('ws://localhost:3000');

catai._ws.on('open', async () => {  
    const response = await catai.prompt("Raconte-moi l'histoire quand tu est tombée", token => {
       process.stdout.write(token)
    });
    
    console.log(`\nTotal text length: ${response.length}`);
    
    catai.close();
    
})

