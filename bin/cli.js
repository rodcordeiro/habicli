#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var path_1 = require("path");
var fs_1 = require("fs");
var update_notifier_1 = require("update-notifier");
var auth_1 = __importDefault(require("./commands/auth"));
var Todos_1 = __importDefault(require("./commands/Todos"));
var pkg = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../package.json'), 'utf8'));
var notifier = new update_notifier_1.UpdateNotifier({ pkg: pkg, shouldNotifyInNpmScript: true });
notifier.fetchInfo();
if (notifier.update) {
    console.log("Update available: " + notifier.update.latest);
}
var cli = commander_1.default.program;
cli.addCommand(auth_1.default);
cli.addCommand(Todos_1.default);
cli
    .version(pkg.version, "-v,--version", "Shows cli version")
    .allowUnknownOption(false)
    .allowExcessArguments(false);
cli.parse(process.argv);
