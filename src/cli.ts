#!/usr/bin/env node

import program from 'commander';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { UpdateNotifier } from 'update-notifier';

import auth from './commands/auth'
import Todo from './commands/Todos'
const pkg = JSON.parse(readFileSync(resolve(__dirname,'../package.json'),'utf8'))

const notifier = new UpdateNotifier({pkg,shouldNotifyInNpmScript : true})
notifier.fetchInfo();
if (notifier.update) {
	console.log(`Update available: ${notifier.update.latest}`);
}

const cli = program.program

cli.addCommand(auth)
cli.addCommand(Todo)



cli
    .version(pkg.version,"-v,--version","Shows cli version")
    .allowUnknownOption(false)
    .allowExcessArguments(false)

cli.parse(process.argv);
