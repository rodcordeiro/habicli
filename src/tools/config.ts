import Configstore from 'configstore'
import { resolve } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname,'..','..','package.json'),'utf8'))

// Create a Configstore instance.
const config = new Configstore(pkg.name,{
    version:pkg.version,
    api:{
        "x-client": "c150cf43-bf4a-4c46-8912-9c04f77d3924-cordeiroAPI",
        'Content-Type': 'application/json'
    }
});

export default config
