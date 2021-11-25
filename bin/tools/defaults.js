"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATTRIBUTE = exports.PRIORITIES = void 0;
var PRIORITIES;
(function (PRIORITIES) {
    PRIORITIES[PRIORITIES["Trivial"] = 0.1] = "Trivial";
    PRIORITIES[PRIORITIES["Easy"] = 1] = "Easy";
    PRIORITIES[PRIORITIES["Medium"] = 1.5] = "Medium";
    PRIORITIES[PRIORITIES["Hard"] = 2] = "Hard";
})(PRIORITIES || (PRIORITIES = {}));
exports.PRIORITIES = PRIORITIES;
var ATTRIBUTE;
(function (ATTRIBUTE) {
    ATTRIBUTE["Strength"] = "str";
    ATTRIBUTE["Intelligence"] = "int";
    ATTRIBUTE["Perception"] = "per";
    ATTRIBUTE["Constitution"] = "con";
})(ATTRIBUTE || (ATTRIBUTE = {}));
exports.ATTRIBUTE = ATTRIBUTE;
