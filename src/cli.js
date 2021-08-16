#!/usr/bin/env node

const program = require('commander');
const { join } = require('path');
const chalk = require("chalk");
const pkg = require(join(__dirname, "..",'package.json'));
const updateNotifier = require('update-notifier');

updateNotifier({pkg}).notify();

program
    .version(pkg.version,"-v,--version","Shows program version")
    .allowUnknownOption(false)
    .allowExcessArguments(false);


program.parse(process.argv);
