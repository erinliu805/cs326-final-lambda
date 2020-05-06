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
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var session = require('express-session');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        this.app = express();
        this.port = process.env.PORT;
        this.router = express.Router();
        this.successMsg = JSON.stringify({ 'result': 'success' });
        this.failMsg = JSON.stringify({ 'result': 'failed' });
        this.serverfail = JSON.stringify({ 'result': 'Something goes wrong on the sercer' });
        this.theDatabase = db;
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        }));
        this.initialize_passport.bind(this)();
        this.app.use(passport.initialize());
        this.app.use(passport.session({
            secret: process.env.SESSION_SECRET
        }));
        // this.app.use(flash())
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use('/', express.static('./public'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.router.get('/login', this.isNotLoggedIn, function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
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
        this.router.get('/create_post', this.isLoggedIn, function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                if (request.isAuthenticated()) {
                    file_path = path.join(__dirname, 'public/create_post.html');
                    data = fs.readFileSync(file_path);
                    response.header('Content-Type', 'text/html');
                    response.write(data);
                    response.end();
                }
                else {
                    response.redirect('/login');
                }
                next();
                return [2 /*return*/];
            });
        }); });
        //TO Do 
        // before go to profile, check if the user log in
        this.router.get('/profile', this.isLoggedIn, function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
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
        this.router.get('/images/:file', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var file_path, data;
            return __generator(this, function (_a) {
                //define header according to the format type
                if (request.url.endsWith('.jpeg')) {
                    response.header('Content-type', 'image/jpeg');
                }
                else if (request.url.endsWith('.png')) {
                    response.header('Content-type', 'image/png');
                }
                else {
                    response.header('Content-type', 'image');
                }
                file_path = __dirname + "/public/images/" + request.params.file;
                data = fs.readFileSync(file_path);
                response.write(data);
                response.end();
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.get('/read/:page', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var page, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.header('Content-type', 'application/json');
                        page = request.params.page;
                        if (page == NaN) {
                            page = 0;
                        }
                        return [4 /*yield*/, this.theDatabase.read_post(page)];
                    case 1:
                        post = _a.sent();
                        console.log(post);
                        if (post != undefined) {
                            response.write(JSON.stringify(post));
                            response.end();
                        }
                        else {
                            console.log(this.failMsg);
                            response.write(this.failMsg);
                            response.end();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.get('/get_user_info', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                response.header('Content-type', 'application/json');
                if (request.isAuthenticated()) {
                    userInfo = {
                        'username': request.user.username,
                        'email': request.user.email,
                        'result': 'success'
                    };
                    response.write(JSON.stringify(userInfo));
                    response.end();
                }
                else {
                    response.write(this.failMsg);
                    response.end();
                }
                next();
                return [2 /*return*/];
            });
        }); });
        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.isLoggedIn, this.createPostHandler.bind(this));
        this.router.post('/profile', this.isLoggedIn, this.profileHandler.bind(this));
        this.router.post('/login', passport.authenticate('local', {}), this.loginHandler.bind(this));
        this.router.post('/logout', function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (request.isAuthenticated()) {
                    request.logout();
                    response.redirect('/');
                }
                next();
                return [2 /*return*/];
            });
        }); });
        this.app.use('/', this.router);
    }
    MyServer.prototype.listen = function (port) {
        var p = port || 8080;
        console.log("Listening at port:" + p);
        this.app.listen(p);
    };
    MyServer.prototype.initialize_passport = function () {
        var _this = this;
        console.log('Initializing passport');
        passport.use(new LocalStrategy({ usernameField: 'email' }, this.authenticateUser.bind(this)));
        passport.serializeUser(function (user, done) {
            console.log('Serializer get user: ');
            console.dir(user);
            done(null, user._id);
        });
        passport.deserializeUser(function (_id, done) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('DeserializeUser get _id: ');
                        console.log(_id);
                        return [4 /*yield*/, this.theDatabase.getUserById(_id)];
                    case 1:
                        user = _a.sent();
                        console.log('Get user: ');
                        console.dir(user);
                        done(null, user);
                        return [2 /*return*/];
                }
            });
        }); });
        return passport;
    };
    MyServer.prototype.authenticateUser = function (email, password, done) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('AuthenticateUser is finding user with email: ');
                        console.log(email);
                        return [4 /*yield*/, this.theDatabase.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        console.log('find user: ');
                        console.dir(user);
                        if (user == null) {
                            return [2 /*return*/, done(null, false, { message: 'Can not find this user' })];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, bcrypt.compare(password, user.hashedpassword)];
                    case 3:
                        if (_a.sent()) {
                            return [2 /*return*/, done(null, user)];
                        }
                        else {
                            return [2 /*return*/, done(null, false, { message: 'Password incorrect' })];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, done(e_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.registerHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var new_user, _a, error_1, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response.header('Content-type', 'application/json');
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
                        response.write(this.successMsg);
                        return [3 /*break*/, 7];
                    case 6:
                        console.log('User existed');
                        //wait for 3 seconds before redirect
                        response.write(JSON.stringify({ 'result': 'User name or email is used' }));
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        console.log(error_1);
                        message = "register failed, use local memeory instead";
                        console.log(message);
                        response.write(this.serverfail);
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
    MyServer.prototype.profileHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var update_user, autheticate_user, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.header('Content-type', 'application/json');
                        update_user = {
                            'username': request.body.username,
                            'email': request.body.email,
                            'password': request.body.password
                        };
                        autheticate_user = {
                            'email': request.body.email,
                            'password': request.body.password
                        };
                        console.log(update_user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.theDatabase.autheticate_user(autheticate_user)];
                    case 2:
                        if (!((_a.sent()) === true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.theDatabase.update_user(update_user)];
                    case 3:
                        _a.sent();
                        response.write(this.successMsg);
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('User info not matched');
                        response.write(JSON.stringify({ 'result': 'User info not matched' }));
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        message = "the user can not modify.";
                        console.log(message);
                        response.write(this.serverfail);
                        return [3 /*break*/, 7];
                    case 7:
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
                        console.log('Create post');
                        console.dir(request.user);
                        data = {
                            '_id': Date.now().toString(),
                            'userID': request.user._id,
                            'username': request.user.username,
                            'title': request.body.title,
                            'content': request.body.content
                        };
                        console.log(data);
                        if (!(data.title == null || data.content == null)) return [3 /*break*/, 1];
                        response.write(this.failMsg);
                        response.end();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.theDatabase.create_post(data)];
                    case 2:
                        if (_a.sent()) {
                            response.write(this.successMsg);
                            response.end();
                        }
                        else {
                            response.write(this.failMsg);
                            response.end();
                        }
                        _a.label = 3;
                    case 3:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.loginHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response.header('Content-type', 'application/json');
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
                            response.write(this.successMsg);
                            response.end();
                            console.log(data);
                        }
                        else {
                            response.write(this.failMsg);
                            response.end();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        response.write(this.serverfail);
                        response.end();
                        return [3 /*break*/, 4];
                    case 4:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.isLoggedIn = function (request, response, next) {
        if (request.isAuthenticated()) {
            next();
        }
        else {
            //ask the user to login if not 
            response.redirect('/login');
        }
    };
    MyServer.prototype.isNotLoggedIn = function (request, response, next) {
        if (!request.isAuthenticated()) {
            next();
        }
        else {
            //if user already login
            response.redirect('/profile');
        }
    };
    MyServer.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
