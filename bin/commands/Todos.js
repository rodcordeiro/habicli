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
var Command = require('commander').Command;
var inquirer = require('inquirer');
var chalk = require("chalk");
var join = require('path').join;
var exit = require('process').exit;
var api = require(join(__dirname, "..", "tools", "api.js"));
var config = require(join(__dirname, "..", "tools", "config.js"));
var Spinner = require(join(__dirname, "..", "tools", "loader.js"));
var spinner = new Spinner();
var lineBreak = function () { return console.log('________________________________________________________\n'); };
var PRIORITIES = {
    Trivial: 0.1,
    Easy: 1,
    Medium: 1.5,
    Hard: 2
};
function complete(id, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, api.post("/tasks/" + id + "/score/up", {}, {
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
                            case 0: return [4 /*yield*/, api.get("/tags", {
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
                            case 0: return [4 /*yield*/, api.post("/tasks/" + task_id + "/checklist/" + item_id + "/score", {}, {
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
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tasks = [];
                                return [4 /*yield*/, api.get("/tasks/user?type=todos", {
                                        headers: headers
                                    })
                                        .then(function (response) {
                                        response.data.data.map(function (task) {
                                            tasks.push({
                                                text: task.text,
                                                id: task.id,
                                                notes: task.notes,
                                                checklist: task.checklist,
                                                completed: task.completed
                                            });
                                        });
                                    })
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
var Todo = new Command('todo')
    .helpOption("-h,--help", "User functionallity")
    .description("Todoenticate, show user status and logoff from API")
    .helpOption("-h,--help", "Login to habitica API")
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, tasks, choose_1, task_1, message, action_choices, action, _a, item, item_action, text, data, _b, _c, _d, _e, tags_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                spinner.start("Asking the oracle for the provisions...\n");
                headers = config.get('api');
                if (!!headers) return [3 /*break*/, 1];
                lineBreak();
                console.log(chalk.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk.greenBright("  habicli auth login   "));
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
                tasks = _f.sent();
                spinner.stop();
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'list',
                            name: 'task',
                            message: 'Choose a task',
                            choices: tasks.map(function (task) {
                                return task.text;
                            })
                        }])];
            case 3:
                choose_1 = _f.sent();
                task_1 = tasks.filter(function (task) { return task.text == choose_1.task; })[0];
                message = "  ### " + task_1.text + " ###";
                if (task_1.notes)
                    message += "\n" + task_1.notes;
                lineBreak();
                console.log(chalk.cyanBright(message));
                lineBreak();
                action_choices = [
                    "Complete",
                    "Update",
                    "Close"
                ];
                if (task_1.checklist.length >= 1) {
                    action_choices.push("Show checklist");
                }
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'list',
                            name: 'action',
                            message: 'What are we going to do?',
                            choices: action_choices
                        }]).then(function (act) {
                        return act.action;
                    })];
            case 4:
                action = _f.sent();
                _a = action;
                switch (_a) {
                    case "Show checklist": return [3 /*break*/, 5];
                    case "Complete": return [3 /*break*/, 13];
                    case "Update": return [3 /*break*/, 15];
                    case "Close": return [3 /*break*/, 21];
                }
                return [3 /*break*/, 22];
            case 5: return [4 /*yield*/, inquirer.prompt([{
                        type: 'list',
                        name: 'item',
                        message: 'Choose an item from the checklist:',
                        choices: task_1.checklist.map(function (item) { return item.text; })
                    }]).then(function (item) {
                    return task_1.checklist.filter(function (i) { return i.text == item.item; })[0];
                })];
            case 6:
                item = _f.sent();
                lineBreak();
                console.log(chalk.cyanBright("##> " + item.text));
                lineBreak();
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'list',
                            name: 'action',
                            message: 'What are we going to do?',
                            choices: [
                                "Complete",
                                "Update",
                                "Exit"
                            ]
                        }]).then(function (act) {
                        return act.action;
                    })];
            case 7:
                item_action = _f.sent();
                if (!(item_action == "Complete")) return [3 /*break*/, 9];
                return [4 /*yield*/, completeChecklistItem(task_1.id, item.id, headers)
                        .then(function (response) {
                        console.log(chalk.cyanBright("Item completed."));
                    })
                        .catch(function (err) {
                        console.log(chalk.redBright(err));
                    })];
            case 8:
                _f.sent();
                _f.label = 9;
            case 9:
                if (!(item_action == "Update")) return [3 /*break*/, 12];
                lineBreak();
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'string',
                            name: 'text',
                            message: 'Please, type the new item text'
                        }])];
            case 10:
                text = (_f.sent()).text;
                return [4 /*yield*/, api.put("/tasks/" + task_1.id + "/checklist/" + item.id, {
                        text: text
                    }, { headers: headers })
                        .then(function (response) {
                        console.log(chalk.cyanBright("Updated"));
                    })
                        .catch(function (err) {
                        console.log(chalk.redBright(err));
                    })];
            case 11:
                _f.sent();
                _f.label = 12;
            case 12: return [3 /*break*/, 22];
            case 13: return [4 /*yield*/, complete(task_1.id, headers)
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) {
                    console.error(error);
                    return;
                })];
            case 14:
                data = _f.sent();
                console.log(chalk.cyanBright("Task completed"));
                return [3 /*break*/, 22];
            case 15:
                _b = task_1;
                _c = 'text';
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'string',
                            name: 'text',
                            message: "Update task text?",
                            default: task_1.text
                        }]).then(function (response) { return response.text; })];
            case 16:
                _b[_c] = _f.sent();
                _d = task_1;
                _e = 'notes';
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'string',
                            name: 'notes',
                            message: "Update task notes?",
                            default: task_1.notes
                        }]).then(function (response) { return response.notes; })];
            case 17:
                _d[_e] = _f.sent();
                return [4 /*yield*/, getTags(headers)];
            case 18:
                tags_1 = _f.sent();
                tags_1.push({ name: "Empty" });
                return [4 /*yield*/, inquirer.prompt([{
                            type: 'list',
                            name: 'tag',
                            message: "Add tags: ",
                            choices: tags_1.map(function (tag) { return tag.name; })
                        }]).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var tag;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(response.tag != 'Empty')) return [3 /*break*/, 2];
                                    tag = tags_1.filter(function (t) { return t.name == response.tag; })[0];
                                    return [4 /*yield*/, api.post("/tasks/" + task_1.id + "/tags/" + tag.id, {}, { headers: headers }).catch(function (err) { return console.log(chalk.redBright(err)); })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 19:
                _f.sent();
                return [4 /*yield*/, api.put("/tasks/" + task_1.id, task_1, { headers: headers })
                        .then(function (response) {
                        console.log(chalk.cyanBright('updated'));
                    })
                        .catch(function (err) {
                        console.log(chalk.redBright(err));
                    })];
            case 20:
                _f.sent();
                return [3 /*break*/, 22];
            case 21:
                exit(0);
                _f.label = 22;
            case 22: return [2 /*return*/];
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
                headers = config.get('api');
                if (!!headers) return [3 /*break*/, 1];
                lineBreak();
                console.log(chalk.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk.greenBright("  habicli auth login   "));
                lineBreak();
                spinner.stop();
                return [2 /*return*/];
            case 1:
                if (!options.title) return [3 /*break*/, 2];
                _a = options;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, inquirer.prompt([{
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
            case 5: return [4 /*yield*/, inquirer.prompt([{
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
            case 8: return [4 /*yield*/, inquirer.prompt([{
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
                return [4 /*yield*/, api.post('/tasks/user', task, { headers: headers })
                        .then(function (response) {
                        if (!options.verbose) {
                            spinner.succeed(chalk.cyanBright("Task created"));
                        }
                        else {
                            spinner.succeed(chalk.cyanBright(JSON.stringify(response.data.data)));
                        }
                    })
                        .catch(function (err) {
                        spinner.fail(chalk.redBright(err));
                    })];
            case 11:
                _d.sent();
                spinner.stop();
                _d.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
module.exports = Todo;
