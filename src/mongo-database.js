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
        var mongoclient = this.client;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect(function (err, db) {
                            if (err !== null)
                                console.log(err);
                            console.log("connection established");
                            mongoclient.close();
                        })];
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
    Database.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.findOne({ 'email': email })];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.userDatabase)];
                    case 2:
                        collection = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.findOne({ '_id': id })];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.check_username = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var userDatabase, mongoclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDatabase = this.userDatabase;
                        mongoclient = this.client;
                        console.log("checking if username " + username + " has been used");
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).find({ "username": username }).count();
                                mongoclient.close();
                                return result === 0;
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.check_email = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var userDatabase, mongoclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDatabase = this.userDatabase;
                        mongoclient = this.client;
                        console.log("checking if email " + email + " has been used");
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).find({ "email": email }).count();
                                mongoclient.close();
                                return result === 0;
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.autheticate_user = function (loginInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var userDatabase, mongoclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDatabase = this.userDatabase;
                        mongoclient = this.client;
                        console.log("authenticating user " + loginInfo);
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).findOne({ "email": loginInfo['email'] });
                                mongoclient.close();
                                return bcrypt.compare(loginInfo['password'], result['hashedpassword']);
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.add_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var userDatabase, mongoclient, new_user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userDatabase = this.userDatabase;
                        mongoclient = this.client;
                        console.log('Running add user, the input is: ' + userInfo);
                        new_user = {
                            'email': userInfo['email'],
                            'username': userInfo['username'],
                            'hashedpassword': bcrypt.hashSync(userInfo['password'], 10).toString(),
                            'login': 0
                        };
                        return [4 /*yield*/, this.check_username(userInfo['username'])];
                    case 1:
                        _a = !(_b.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.check_email(userInfo['email'])];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            console.log("username or email has been used before!\n" + userInfo);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).insertOne(new_user);
                                mongoclient.close();
                                return result['acknowledged']; //default write concern is 1, which is ok since we only have 1 server
                            })["catch"](function (err) { console.log(err); })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.login_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoclient, userDatabase, new_user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Log in user, the input is: ' + userInfo);
                        mongoclient = this.client;
                        userDatabase = this.userDatabase;
                        if (userInfo['login'] === '1') {
                            console.log("user has already log in!\n" + userInfo);
                            return [2 /*return*/, true];
                        }
                        new_user = {
                            'email': userInfo['email'],
                            'username': userInfo['username'],
                            'hashedpassword': bcrypt.hashSync(userInfo['password'], 10).toString()
                        };
                        return [4 /*yield*/, this.check_username(userInfo['username'])];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.check_email(userInfo['email'])];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            console.log("user not found!\n" + userInfo);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.client.connect(this.uri, function (err, db) {
                                var result = db.collection(userDatabase).findOneAndReplace({ 'login': '1' }, new_user);
                                mongoclient.close();
                                return result !== null;
                            })["catch"](function (err) { console.log(err); })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.update_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoclient, userDatabase, new_user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // userinfo format:
                        // {email:'xxx', username: 'xxx', password:'xxx'}
                        // function will return true if user information is successfully updated
                        // let db = await this.client.db(this.dbName);
                        // let collection = await db.collection(this.userDatabase);
                        // console.log('Running add user, the input is: ');
                        // let new_user = {
                        //     'email' : userInfo['email'],
                        //     'username' : userInfo['username'],
                        //     'hashedpassword' : userInfo['password']
                        // }
                        // let hashedpassword : string = bcrypt.hashSync(userInfo['password'], 10).toString();
                        // new_user['hashedpassword'] = hashedpassword;
                        // try {
                        //     let result = await collection.findOneAndUpdate(
                        //         {'email': new_user['email']},
                        //         new_user
                        //     );
                        //     console.log("result = " + result);    
                        //     return true;
                        // } catch (error) {
                        //     console.log(error);
                        //     console.log('falied');
                        //     return false
                        // }
                        console.log('Running update user, the input is: ' + userInfo);
                        mongoclient = this.client;
                        userDatabase = this.userDatabase;
                        if (userInfo['login'] !== '1') {
                            console.log("user not log in!\n" + userInfo);
                            return [2 /*return*/, false];
                        }
                        new_user = {
                            'email': userInfo['email'],
                            'username': userInfo['username'],
                            'hashedpassword': bcrypt.hashSync(userInfo['password'], 10).toString()
                        };
                        return [4 /*yield*/, this.check_username(userInfo['username'])];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.check_email(userInfo['email'])];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            console.log("user not found!\n" + userInfo);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).findOneAndReplace({ 'email': userInfo['email'] }, new_user);
                                mongoclient.close();
                                return result !== null;
                            })["catch"](function (err) { console.log(err); })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.delete_user = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var userDatabase, mongoclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDatabase = this.userDatabase;
                        mongoclient = this.client;
                        console.log('Running delete user, the input is: ' + userInfo);
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(userDatabase).remove({ 'email': userInfo['email'] });
                                mongoclient.close();
                                return result['acknowledged']; //default write concern is 1, which is ok since we only have 1 server
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    Database.prototype.create_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoclient, postDatabase, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoclient = this.client;
                        postDatabase = this.postDatabase;
                        data = {
                            '_id': Date.now().toString(),
                            'title': post['title'],
                            'username': post['username'],
                            'content': post['content'],
                            'updated': -1,
                            'user_id': -1
                        };
                        console.log('Running create post, the input is: ' + post);
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(postDatabase).insertOne(data);
                                mongoclient.close();
                                return result['acknowledged']; //default write concern is 1, which is ok since we only have 1 server
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.update_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var postDatabase, mongoclient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postDatabase = this.postDatabase;
                        mongoclient = this.client;
                        console.log('Running create post, the input is: ' + post);
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(postDatabase).findOneAndUpdate({ '_id': post['_id'] }, {
                                    $set: {
                                        'title': post['title'],
                                        'username': post['username'],
                                        'content': post['content'],
                                        'updated': Date.now().toString()
                                    }
                                });
                                mongoclient.close();
                                return result !== null;
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    Database.prototype.delete_post = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoclient, postDatabase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoclient = this.client;
                        postDatabase = this.postDatabase;
                        console.log('Running delete post, the input is: ' + post);
                        return [4 /*yield*/, this.client.connect(function (err, db) {
                                var result = db.collection(postDatabase).remove(post);
                                mongoclient.close();
                                return result['nRemoved'] === 1;
                            })["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false]; //if this line is reached then an error happened during connection
                }
            });
        });
    };
    //I have no idea how we're going to specify which post to read, so I've left this one as is
    Database.prototype.read_post = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, p, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.db(this.dbName)];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection(this.postDatabase)];
                    case 2:
                        collection = _a.sent();
                        console.log('Running read post, the input is: ');
                        console.log(page);
                        p = parseInt(page.toString()) + 0;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, collection.find().sort({ _id: -1 }).skip(p).limit(1).toArray()];
                    case 4:
                        result = _a.sent();
                        console.log("result = ");
                        console.dir(result[0]);
                        if (result == undefined) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, result[0]];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        console.log('falied');
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
