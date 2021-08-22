#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const chalk = require("chalk");
const pkg = require(join(__dirname, "..",'package.json'));
const updateNotifier = require('update-notifier');
const notifier = updateNotifier({pkg,shouldNotifyInNpmScript : true})

notifier.fetchInfo().then(response=>{    
    notifier.notify();    
})


const auth = require("./commands/auth");
const Todo = require("./commands/Todos");

program.addCommand(auth)
program.addCommand(Todo)

program
    .version(pkg.version,"-v,--version","Shows program version")
    .allowUnknownOption(false)
    .allowExcessArguments(false)

program.parse(process.argv);
