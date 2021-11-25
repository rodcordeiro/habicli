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
var spinner = new loader_1.default().spinner;
var auth = new commander_1.Command('auth');
auth.helpOption("-h,--help", "User functionallity");
auth.description("Authenticate, show user status and logoff from API");
auth
    .command("login")
    .name("login")
    .helpOption("-h,--help", "Login to habitica API")
    .option("-u,--username [username]", "Username to pe used")
    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var username, _a, password, _b, id, apiToken, api_config;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!options.username) return [3, 1];
                _a = options;
                return [3, 3];
            case 1: return [4, inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'username',
                        message: 'Please type your username: ',
                        validate: function (value) { return value ? true : 'Please enter your name'; }
                    }
                ])];
            case 2:
                _a = _c.sent();
                _c.label = 3;
            case 3:
                username = (_a).username;
                return [4, inquirer_1.default.prompt([
                        {
                            type: 'password',
                            name: 'password',
                            message: 'Please enter your password',
                            validate: function (value) { return value ? true : 'You must enter your password'; }
                        }
                    ])];
            case 4:
                password = (_c.sent()).password;
                spinner.start("Asking the oracle for the provisions...\n");
                return [4, api_1.default.post("/user/auth/local/login", {
                        username: username,
                        password: password
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then(function (res) {
                        spinner.text = "Oh, look, the stars recognized you! Let me read what they say, just a moment.";
                        return res.data.data;
                    })
                        .catch(function (err) {
                        console.log({ err: err });
                        spinner.fail(chalk_1.default.redBright("Oh no. It seems a cloud is over the stars, I cannot see them clearly.\n The last thing I saw was ...\n\n".concat(err)));
                        throw new Error(err);
                    })];
            case 5:
                _b = _c.sent(), id = _b.id, apiToken = _b.apiToken;
                api_config = config_1.default.get("api");
                api_config["x-api-key"] = apiToken;
                api_config["x-api-user"] = id;
                return [4, config_1.default.set({ user: { username: username, id: id } })];
            case 6:
                _c.sent();
                return [4, config_1.default.set({ api: api_config })];
            case 7:
                _c.sent();
                spinner.succeed("Oh yeah, welcome ".concat(username, ". Come in, take a sit. It's a pleasure work with you."));
                spinner.stop();
                return [2];
        }
    });
}); });
auth.command("stats")
    .description("Retrieves user information")
    .helpOption("-h,--help", "Retrieves user information through API.")
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var headers, _a, party, stats, profile, guilds, challenges;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!!config_1.default.get('user')) return [3, 1];
                console.log(chalk_1.default.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"));
                console.log();
                console.log(chalk_1.default.greenBright("  habicli auth login   "));
                console.log();
                return [2];
            case 1:
                spinner.start("Asking the oracle for the provisions...\n");
                headers = config_1.default.get("api");
                return [4, api_1.default.get('/user', {
                        headers: headers
                    })
                        .then(function (response) {
                        return response.data.data;
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.redBright("Oh no, lost connection. The last thing I saw was..."));
                        console.error(err);
                    })];
            case 2:
                _a = _b.sent(), party = _a.party, stats = _a.stats, profile = _a.profile, guilds = _a.guilds, challenges = _a.challenges;
                spinner.succeed("Got it ".concat(profile.name, ", the oracle told me!\n"));
                spinner.stop();
                console.log("Your HP is ".concat(Math.floor(stats.hp), "/").concat(stats.maxHealth));
                _b.label = 3;
            case 3: return [2];
        }
    });
}); });
exports.default = auth;
