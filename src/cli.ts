#!/usr/bin/env node

import program from 'commander';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { UpdateNotifier } from 'update-notifier';

const pkg = JSON.parse(readFileSync(resolve(__dirname,'../package.json'),'utf8'))


const notifier = new UpdateNotifier({pkg,shouldNotifyInNpmScript : true})
notifier.fetchInfo();
if (notifier.update) {
	console.log(`Update available: ${notifier.update.latest}`);
}


import Spinner from './tools/loader'

async function test(){
    console.log('spinner inicializado')
    const spin = new Spinner().spinner
    spin.start('teste')
    setTimeout(async()=>{
        spin.text = "Working"
        spin.succeed('Worked')
        spin.stop()
        
    },5000)
    
}
test()

// const auth = require("./commands/auth");
// const Todo = require("./commands/Todos");

// program.addCommand(auth)
// program.addCommand(Todo)

// const cli = program.program


// cli
//     .version(pkg.version,"-v,--version","Shows cli version")
//     .allowUnknownOption(false)
//     .allowExcessArguments(false)

// cli.parse(process.argv);
