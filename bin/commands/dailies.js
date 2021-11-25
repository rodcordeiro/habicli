"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dailies = void 0;
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var api_1 = __importDefault(require("../tools/api"));
var config_1 = __importDefault(require("../tools/config"));
var loader_1 = __importDefault(require("../tools/loader"));
var spinner = new loader_1.default().spinner;
var lineBreak = function () { return console.log('________________________________________________________\n'); };
var FREQUENCY;
(function (FREQUENCY) {
    FREQUENCY["daily"] = "daily";
    FREQUENCY["weekly"] = "weekly";
    FREQUENCY["monthly"] = "monthly";
    FREQUENCY["yearly"] = "yearly";
})(FREQUENCY || (FREQUENCY = {}));
function getTags(headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, api_1.default.get("/tags", {
                                    headers: headers
                                })
                                    .then(function (response) {
                                    resolve(response.data.data);
                                })
                                    .catch(function (err) { return reject(err); })];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); })];
        });
    });
}
var Dailies = new commander_1.Command('daily')
    .alias('d')
    .description("Manage Dailys tasks.")
    .helpOption("-h,--help", "Provides todo functionallity. Allows to list, edit, update, score, create and delete daily tasks")
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var headers, uTags_1, dailies, choose_1, daily, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner.start("Asking the oracle for the provisions...\n");
                headers = config_1.default.get('api');
                if (!!headers) return [3, 1];
                lineBreak();
                console.log(chalk_1.default.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk_1.default.greenBright("  habicli auth login   "));
                lineBreak();
                spinner.stop();
                return [2];
            case 1: return [4, getTags(headers)];
            case 2:
                uTags_1 = _a.sent();
                return [4, api_1.default.get("/tasks/user?type=dailys", { headers: headers })
                        .then(function (response) {
                        var dailies = [];
                        response.data.data.map(function (daily) {
                            dailies.push({
                                text: daily.text,
                                notes: daily.notes,
                                id: daily.id,
                                checklist: daily.checklist,
                                attribute: daily.attribute,
                                daysOfMonth: daily.daysOfMonth,
                                weeksOfMonth: daily.weeksOfMonth,
                                priority: daily.priority,
                                tags: daily.tags.map(function (tag) { return uTags_1.filter(function (t) { return t.id == tag; })[0]; }),
                                isDue: daily.isDue,
                                completed: daily.completed,
                                frequency: daily.frequency,
                                everyX: daily.everyX,
                                streak: daily.streak,
                                repeat: daily.repeat
                            });
                        });
                        spinner.succeed("Here they're. Please choose one");
                        return dailies;
                    })
                        .catch(function (err) {
                        spinner.fail("Oh no. got error: ".concat(err));
                        console.log(err);
                    })];
            case 3:
                dailies = _a.sent();
                spinner.stop();
                return [4, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'daily',
                            message: 'Choose a task',
                            choices: dailies.map(function (daily) {
                                return daily.text;
                            })
                        }])];
            case 4:
                choose_1 = _a.sent();
                daily = dailies.filter(function (daily) { return daily.text == choose_1.daily; })[0];
                message = "  ### ".concat(daily.text, " ###");
                if (daily.notes)
                    message += "\n".concat(daily.notes);
                lineBreak();
                console.log(chalk_1.default.cyanBright(message));
                lineBreak();
                _a.label = 5;
            case 5: return [2];
        }
    });
}); });
exports.Dailies = Dailies;
