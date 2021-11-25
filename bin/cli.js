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
var Todos_1 = require("./commands/Todos");
var dailies_1 = require("./commands/dailies");
var Testes_1 = __importDefault(require("./commands/Testes"));
var pkg = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../package.json'), 'utf8'));
var notifier = new update_notifier_1.UpdateNotifier({ pkg: pkg, shouldNotifyInNpmScript: true });
notifier.fetchInfo();
if (notifier.update) {
    console.log("Update available: ".concat(notifier.update.latest));
}
var cli = commander_1.default.program;
cli.addCommand(auth_1.default);
cli.addCommand(Todos_1.Todo);
cli.addCommand(dailies_1.Dailies);
cli.addCommand(Testes_1.default);
cli
    .version(pkg.version, "-v,--version", "Shows cli version")
    .allowUnknownOption(false)
    .allowExcessArguments(false);
cli.parse(process.argv);
