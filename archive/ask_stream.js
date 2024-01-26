const response = await fetch('http://127.0.0.1:3000/api/chat/prompt', {
    method: 'POST',
    body: JSON.stringify({
        prompt: 'Ecris moi une blague'
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

const reader = response.body.pipeThrough(new TextDecoderStream())
    .getReader();

while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    console.log('Received', value);
}