"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
var Spinner = (function () {
    function Spinner() {
        this.spinner = (0, ora_1.default)();
        this.spinner.spinner = "bounce";
        return this;
    }
    return Spinner;
}());
exports.default = Spinner;
