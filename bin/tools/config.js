"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var configstore_1 = __importDefault(require("configstore"));
var path_1 = require("path");
var fs_1 = require("fs");
var pkg = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../package.json'), 'utf8'));
// Create a Configstore instance.
var config = new configstore_1.default(pkg.name, {
    version: pkg.version,
    api: {
        "x-client": "c150cf43-bf4a-4c46-8912-9c04f77d3924-cordeiroAPI",
        'Content-Type': 'application/json'
    }
});
exports.default = config;
