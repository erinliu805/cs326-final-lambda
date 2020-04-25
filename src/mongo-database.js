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
require('dotenv').config();
var bcrypt = require('bcrypt');
console.log(process.env.URI);
var Database = /** @class */ (function () {
    function Database(dbName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = process.env.URI; // TODO: register account and change this uri
        this.userDatabase = "user-db";
        this.postDatabase = "post-db";
        this.topicDatabase = "topic-db";
        this.dbName = dbName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    // ---------------------------------------------------------------- //
    // user information section
    // TODO: implement check, add, delete, update user information
    Database.prototype.check_username = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running check username, the input is: ');
                        console.log(username);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.find({ 'username': username }).count()];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        if (result === 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.check_email = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running check email, the input is: ');
                        console.log(email);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.find({ 'email': email }).count()];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        if (result === 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.autheticate_user = function (loginInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, login_user, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running check username, the input is: ');
                        login_user = {
                            'email': loginInfo['email'],
                            'password': loginInfo['password']
                        };
                        console.log(login_user);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, collection.findOne({ 'email': login_user['email'] })];
                    case 4:
                        user = _a.sent();
                        console.log('The user is: ');
                        console.log(user);
                        return [4 /*yield*/, bcrypt.compare(loginInfo['password'], user['hashedpassword'])];
                    case 5:
                        if (_a.sent()) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.add_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, new_user, hashedpassword, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running add user, the input is: ');
                        new_user = {
                            'email': userInfo['email'],
                            'username': userInfo['username'],
                            'hashedpassword': userInfo['password']
                        };
                        hashedpassword = bcrypt.hashSync(userInfo['password'], 10).toString();
                        new_user['hashedpassword'] = hashedpassword;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.insertOne(new_user)];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.update_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, new_user, hashedpassword, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running add user, the input is: ');
                        new_user = {
                            'email': userInfo['email'],
                            'username': userInfo['username'],
                            'hashedpassword': userInfo['password']
                        };
                        hashedpassword = bcrypt.hashSync(userInfo['password'], 10).toString();
                        new_user['hashedpassword'] = hashedpassword;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.findOneAndUpdate({ 'email': new_user['email'] }, new_user)];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_5 = _a.sent();
                        console.log(error_5);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.delete_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running delete user, the input is: ');
                        console.log(userInfo);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.remove({ 'email': userInfo['email'] })];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_6 = _a.sent();
                        console.log(error_6);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    Database.prototype.create_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, data, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.postDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running create post, the input is: ');
                        console.log(post);
                        data = {
                            '_id': Date.now().toString(),
                            'title': post['title'],
                            'username': post['username'],
                            'content': post['content']
                        };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.insertOne(data)];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_7 = _a.sent();
                        console.log(error_7);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.update_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.postDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running update post, the input is: ');
                        console.log(post);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.findOneAndUpdate({ '_id': post['_id'] }, {
                                '_id': Date.now().toString(),
                                'title': post['title'],
                                'username': post['username'],
                                'content': post['content']
                            })];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_8 = _a.sent();
                        console.log(error_8);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.delete_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.postDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running delete post, the input is: ');
                        console.log(post);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.remove({ '_id': post['_id'] })];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/, true];
                    case 5:
                        error_9 = _a.sent();
                        console.log(error_9);
                        console.log('falied');
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
