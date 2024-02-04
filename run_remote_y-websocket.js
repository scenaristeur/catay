import 'dotenv/config'
import { exec } from 'child_process';

let cmd = `cd server && node .  --yjs_url=${process.env.YJS_REMOTE_ENV}  &`
console.log(cmd)
 exec(cmd, (err, stdout, stderr) => {
    // ...
    if (err) console.log(err)
    if (stdout) console.log(stdout)
    if (stderr) console.log(stderr)
  }); 