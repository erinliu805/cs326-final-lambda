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
exports.__esModule = true;
var http = require('http');
var url = require('url');
var express = require('express');
var fs = require('fs');
var users = [];
var posts = [];
var path = require('path');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.router = express.Router();
        this.theDatabase = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use('/', express.static('./public'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.router.get('/login', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/login.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/register', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/register.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/index.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/posts', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/posts.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/create_post', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/create_post.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/profile', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = path.join(__dirname, 'public/profile.html');
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/css/:file', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = __dirname + "/public/css/" + request.params.file;
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/css');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/js/:file', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                file_path = __dirname + "/public/js/" + request.params.file;
                data = fs.readFileSync(file_path);
                response.header('Content-Type', 'application/x-javascript');
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.createPostHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
        this.app.use('/', this.router);
    }
    MyServer.prototype.listen = function (port) {
        console.log("Listening at port:" + port);
        this.app.listen(port);
    };
    MyServer.prototype.registerHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var new_user, _a, error_1, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        new_user = {
                            'username': request.body.username,
                            'email': request.body.email,
                            'password': request.body.password
                        };
                        console.log(new_user);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.theDatabase.check_username(new_user['username'])];
                    case 2:
                        _a = (_b.sent()) === true;
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.theDatabase.check_email(new_user['email'])];
                    case 3:
                        _a = (_b.sent()) === true;
                        _b.label = 4;
                    case 4:
                        if (!_a) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.theDatabase.add_user(new_user)];
                    case 5:
                        _b.sent();
                        response.write('success');
                        return [3 /*break*/, 7];
                    case 6:
                        console.log('User existed');
                        response.write('User existed');
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        message = "register failed, use local memeory instead";
                        console.log(message);
                        response.write('Something goes wrong');
                        // TODO add user into the database
                        users.push(new_user);
                        return [3 /*break*/, 9];
                    case 9:
                        response.end();
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createPostHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            'username': request.body.username,
                            'title': request.body.title,
                            'content': request.body.content
                        };
                        console.log(data);
                        return [4 /*yield*/, this.theDatabase.create_post(data)];
                    case 1:
                        // add this post into the database
                        if (_a.sent()) {
                            response.write("success");
                            response.end();
                        }
                        else {
                            response.write('failed');
                            response.end();
                        }
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.loginHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            'email': request.body.email,
                            'password': request.body.password
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.theDatabase.autheticate_user(data)];
                    case 2:
                        if (_a.sent()) {
                            response.write('success');
                            console.log(data);
                            response.end();
                        }
                        else {
                            response.write('failed');
                            response.end();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        response.write("Something goes wrong");
                        response.end();
                        return [3 /*break*/, 4];
                    case 4:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
