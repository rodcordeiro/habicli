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
var commander_1 = require("commander");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var api_1 = __importDefault(require("../tools/api"));
var config_1 = __importDefault(require("../tools/config"));
var loader_1 = __importDefault(require("../tools/loader"));
var process_1 = require("process");
var spinner = new loader_1.default().spinner;
var lineBreak = function () { return console.log('________________________________________________________\n'); };
var PRIORITIES;
(function (PRIORITIES) {
    PRIORITIES[PRIORITIES["Trivial"] = 0.1] = "Trivial";
    PRIORITIES[PRIORITIES["Easy"] = 1] = "Easy";
    PRIORITIES[PRIORITIES["Medium"] = 1.5] = "Medium";
    PRIORITIES[PRIORITIES["Hard"] = 2] = "Hard";
})(PRIORITIES || (PRIORITIES = {}));
function complete(id, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, api_1.default.post("/tasks/" + id + "/score/up", {}, {
                                    headers: headers
                                })
                                    .then(function (response) {
                                    resolve(response.data.data);
                                })
                                    .catch(function (err) { return reject(err); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function getTags(headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, api_1.default.get("/tags", {
                                    headers: headers
                                })
                                    .then(function (response) {
                                    resolve(response.data.data);
                                })
                                    .catch(function (err) { return reject(err); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function completeChecklistItem(task_id, item_id, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, api_1.default.post("/tasks/" + task_id + "/checklist/" + item_id + "/score", {}, {
                                    headers: headers
                                })
                                    .then(function (response) {
                                    resolve(response.data);
                                })
                                    .catch(function (err) { return reject(err); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function listTasks(headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var tasks;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tasks = [];
                                return [4 /*yield*/, api_1.default.get("/tasks/user?type=todos", {
                                        headers: headers
                                    })
                                        .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                        var uTags;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, getTags(headers)];
                                                case 1:
                                                    uTags = _a.sent();
                                                    response.data.data.map(function (task) {
                                                        tasks.push({
                                                            text: task.text,
                                                            id: task.id,
                                                            notes: task.notes,
                                                            checklist: task.checklist,
                                                            completed: task.completed,
                                                            tags: task.tags.map(function (tag) { return uTags.filter(function (t) { return t.id == tag; })[0]; }),
                                                            type: task.type
                                                        });
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (err) {
                                        reject(err);
                                    })];
                            case 1:
                                _a.sent();
                                resolve(tasks);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
var Todo = new commander_1.Command('todo')
    .helpOption("-h,--help", "User functionallity")
    .description("Todoenticate, show user status and logoff from API")
    .helpOption("-h,--help", "Login to habitica API")
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, tasks, choose_1, task_1, message, action_choices, action, _a, item, item_action, text, data, choice, text, notes, choice_1, tags_1, tags_2, text;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                spinner.start("Asking the oracle for the provisions...\n");
                headers = config_1.default.get('api');
                if (!!headers) return [3 /*break*/, 1];
                lineBreak();
                console.log(chalk_1.default.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk_1.default.greenBright("  habicli auth login   "));
                lineBreak();
                spinner.stop();
                return [2 /*return*/];
            case 1: return [4 /*yield*/, listTasks(headers)
                    .then(function (response) {
                    spinner.succeed("Here they're. Please choose one");
                    return response;
                })
                    .catch(function (err) {
                    spinner.fail(err);
                })];
            case 2:
                tasks = _b.sent();
                spinner.stop();
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'task',
                            message: 'Choose a task',
                            choices: tasks.map(function (task) {
                                return task.text;
                            })
                        }])];
            case 3:
                choose_1 = _b.sent();
                task_1 = tasks.filter(function (task) { return task.text == choose_1.task; })[0];
                message = "  ### " + task_1.text + " ###";
                if (task_1.notes)
                    message += "\n" + task_1.notes;
                lineBreak();
                console.log(chalk_1.default.cyanBright(message));
                lineBreak();
                action_choices = [
                    "Complete",
                    "Update",
                    "Delete",
                    "Close"
                ];
                if (task_1.checklist.length >= 1) {
                    action_choices.push("Show checklist");
                }
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'action',
                            message: 'What are we going to do?',
                            choices: action_choices
                        }]).then(function (act) {
                        return act.action;
                    })];
            case 4:
                action = _b.sent();
                _a = action;
                switch (_a) {
                    case "Show checklist": return [3 /*break*/, 5];
                    case "Complete": return [3 /*break*/, 15];
                    case "Delete": return [3 /*break*/, 17];
                    case "Update": return [3 /*break*/, 19];
                    case "Close": return [3 /*break*/, 37];
                }
                return [3 /*break*/, 38];
            case 5: return [4 /*yield*/, inquirer_1.default.prompt([{
                        type: 'list',
                        name: 'item',
                        message: 'Choose an item from the checklist:',
                        choices: task_1.checklist.map(function (item) { return item.text; })
                    }]).then(function (item) {
                    return task_1.checklist.filter(function (i) { return i.text == item.item; })[0];
                })];
            case 6:
                item = _b.sent();
                lineBreak();
                console.log(chalk_1.default.cyanBright("##> " + item.text));
                lineBreak();
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'action',
                            message: 'What are we going to do?',
                            choices: [
                                "Complete",
                                "Update",
                                "Delete",
                                "Exit"
                            ]
                        }]).then(function (act) {
                        return act.action;
                    })];
            case 7:
                item_action = _b.sent();
                if (!(item_action == "Complete")) return [3 /*break*/, 9];
                return [4 /*yield*/, completeChecklistItem(task_1.id, item.id, headers)
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Item completed."));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                if (!(item_action == "Update")) return [3 /*break*/, 12];
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'string',
                            name: 'text',
                            message: 'Please, type the new item text'
                        }])];
            case 10:
                text = (_b.sent()).text;
                return [4 /*yield*/, api_1.default.put("/tasks/" + task_1.id + "/checklist/" + item.id, {
                        text: text
                    }, { headers: headers })
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Updated"));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12:
                if (!(item_action == "Delete")) return [3 /*break*/, 14];
                return [4 /*yield*/, api_1.default.delete("/tasks/" + task_1.id + "/checklist/" + item.id, { headers: headers })
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Updated"));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 13:
                _b.sent();
                _b.label = 14;
            case 14: return [3 /*break*/, 38];
            case 15: return [4 /*yield*/, complete(task_1.id, headers)
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) {
                    console.error(error);
                    return;
                })];
            case 16:
                data = _b.sent();
                console.log(chalk_1.default.cyanBright("Task completed"));
                return [3 /*break*/, 38];
            case 17: return [4 /*yield*/, api_1.default.delete("/tasks/" + task_1.id, { headers: headers })
                    .then(function (response) {
                    console.log(chalk_1.default.cyanBright("Task deleted"));
                })
                    .catch(function (error) {
                    console.log(chalk_1.default.redBright(error));
                })];
            case 18:
                _b.sent();
                return [3 /*break*/, 38];
            case 19: return [4 /*yield*/, inquirer_1.default.prompt([{
                        type: 'list',
                        name: 'choice',
                        message: "What do you want to upadate?",
                        choices: [
                            'Title',
                            'Notes',
                            'Tags',
                            'Add checklist item'
                        ]
                    }])];
            case 20:
                choice = (_b.sent()).choice;
                if (!(choice == 'Title')) return [3 /*break*/, 23];
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'string',
                            name: 'text',
                            message: "Type the new task title:",
                            default: task_1.text
                        }]).then(function (response) { return response.text; })];
            case 21:
                text = _b.sent();
                return [4 /*yield*/, api_1.default.put("/tasks/" + task_1.id, {
                        text: text
                    }, { headers: headers })
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Updated"));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 22:
                _b.sent();
                _b.label = 23;
            case 23:
                if (!(choice == 'Notes')) return [3 /*break*/, 26];
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'string',
                            name: 'notes',
                            message: "Type the new task description:",
                            default: task_1.notes
                        }]).then(function (response) { return response.notes; })];
            case 24:
                notes = _b.sent();
                return [4 /*yield*/, api_1.default.put("/tasks/" + task_1.id, {
                        notes: notes
                    }, { headers: headers })
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Updated"));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 25:
                _b.sent();
                _b.label = 26;
            case 26:
                if (!(choice == 'Tags')) return [3 /*break*/, 32];
                console.log("Existing tags are:" + task_1.tags.map(function (tag) { return " " + tag.name; }));
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'choice',
                            message: "What do you want to do?",
                            choices: [
                                'Add tags',
                                'Remove tags',
                                "Exit"
                            ]
                        }])];
            case 27:
                choice_1 = (_b.sent()).choice;
                if (!(choice_1 == "Add")) return [3 /*break*/, 30];
                return [4 /*yield*/, getTags(headers)];
            case 28:
                tags_1 = _b.sent();
                tags_1.push({ name: "Empty" });
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'tag',
                            message: "Please, select the tag to be added",
                            choices: tags_1.map(function (tag) { return tag.name; })
                        }]).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var tag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(response.tag != 'Empty')) return [3 /*break*/, 2];
                                    tag = tags_1.filter(function (t) { return t.name == response.tag; })[0];
                                    return [4 /*yield*/, api_1.default.post("/tasks/" + task_1.id + "/tags/" + tag.id, {}, { headers: headers }).catch(function (err) { return console.log(chalk_1.default.redBright(err)); })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    process_1.exit();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 29:
                _b.sent();
                _b.label = 30;
            case 30:
                if (!(choice_1 == "Remove")) return [3 /*break*/, 32];
                tags_2 = task_1.tags;
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'list',
                            name: 'tag',
                            message: "Select tag to remove: ",
                            choices: tags_2.map(function (tag) { return tag.name; })
                        }]).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var tag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(response.tag != 'Empty')) return [3 /*break*/, 2];
                                    tag = tags_2.filter(function (t) { return t.name == response.tag; })[0];
                                    return [4 /*yield*/, api_1.default.delete("/tasks/" + task_1.id + "/tags/" + tag.id, { headers: headers }).catch(function (err) { return console.log(chalk_1.default.redBright(err)); })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    process_1.exit();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 31:
                _b.sent();
                _b.label = 32;
            case 32:
                if (!(choice == 'Add checklist item')) return [3 /*break*/, 36];
                text = "1";
                _b.label = 33;
            case 33:
                if (!text) return [3 /*break*/, 36];
                return [4 /*yield*/, inquirer_1.default.prompt([{
                            type: 'string',
                            name: 'text',
                            message: "Please, type the item text: [leave it empty for exit]",
                            default: task_1.text
                        }]).then(function (response) { return response.text; })];
            case 34:
                text = _b.sent();
                return [4 /*yield*/, api_1.default.post("/tasks/" + task_1.id + "/checklist", {
                        text: text
                    }, { headers: headers })
                        .then(function (response) {
                        console.log(chalk_1.default.cyanBright("Item included"));
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright(err));
                    })];
            case 35:
                _b.sent();
                return [3 /*break*/, 33];
            case 36: return [3 /*break*/, 38];
            case 37:
                process_1.exit(0);
                _b.label = 38;
            case 38: return [2 /*return*/];
        }
    });
}); });
Todo.command('create')
    .helpOption('-h,--help', "Create a new task on Habitica")
    .description("Create a new task on Habitica")
    .option("-t,--title [text]", "The task title")
    .option('-n,--notes [notes]', "The task description")
    .option("-p,--priority <priority>", "The task priority")
    .option("--verbose", "Prints the task response")
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, title, _a, notes, _b, priority, _c, task;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                headers = config_1.default.get('api');
                if (!!headers) return [3 /*break*/, 1];
                lineBreak();
                console.log(chalk_1.default.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk_1.default.greenBright("  habicli auth login   "));
                lineBreak();
                spinner.stop();
                return [2 /*return*/];
            case 1:
                if (!options.title) return [3 /*break*/, 2];
                _a = options;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, inquirer_1.default.prompt([{
                        type: 'string',
                        name: 'title',
                        message: "Please enter the task title:"
                    }])];
            case 3:
                _a = _d.sent();
                _d.label = 4;
            case 4:
                title = (_a).title;
                if (!options.notes) return [3 /*break*/, 5];
                _b = options;
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, inquirer_1.default.prompt([{
                        type: 'string',
                        name: 'notes',
                        message: "Do you wish to add some notes? [Press enter to leave blank]",
                        default: false,
                    }])];
            case 6:
                _b = _d.sent();
                _d.label = 7;
            case 7:
                notes = (_b).notes;
                if (!options.priority) return [3 /*break*/, 8];
                _c = options;
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, inquirer_1.default.prompt([{
                        type: 'list',
                        name: 'priority',
                        default: 'Easy',
                        message: "Do you want to change the task level?",
                        choices: ["Trivial", "Easy", 'Medium', 'Hard'],
                    }])];
            case 9:
                _c = _d.sent();
                _d.label = 10;
            case 10:
                priority = (_c).priority;
                spinner.start("Asking the oracle for the provisions...\n");
                task = {
                    type: 'todo'
                };
                task['text'] = title;
                if (notes)
                    task['notes'] = notes;
                task['priority'] = PRIORITIES[priority];
                return [4 /*yield*/, api_1.default.post('/tasks/user', task, { headers: headers })
                        .then(function (response) {
                        if (!options.verbose) {
                            spinner.succeed(chalk_1.default.cyanBright("Task created"));
                        }
                        else {
                            spinner.succeed(chalk_1.default.cyanBright(JSON.stringify(response.data.data)));
                        }
                    })
                        .catch(function (err) {
                        spinner.fail(chalk_1.default.redBright(err));
                    })];
            case 11:
                _d.sent();
                spinner.stop();
                _d.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.default = Todo;
