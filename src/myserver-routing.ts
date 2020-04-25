import { fstat } from "fs";
import { request } from "http";

let http = require('http');
let url = require('url');
let express = require('express');
let bcrypt = require('bcrypt');
let fs = require('fs');
let users = [];
let posts = [];
export class MyServer {
    private theDatabase;
    private app = express();
    private port = 8080;
    private router = express.Router();
    constructor(db) {
        this.theDatabase = db;
        this.app.use(async (request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/housing101', express.static('./public'));
        this.app.use('/housing101', this.router);

        this.router.get('/css/:file', async (request, response, next) => {
            let path = __dirname + "/public/css/" + request.params.file
            fs.readFile(path, null, function (error, data) {
                if (error) {
                    response.writeHead(404); 
                    response.write('File not found!');
                } else {
                    response.writeHead(200, {
                        "Content-Type": "text/html"});
                    response.write(data);
                }
                response.end();
            });
            next();
        })

        this.router.get('/js/:file', async (request, response, next) => {
            let path = __dirname + "/public/js/" + request.params.file
            fs.readFile(path, null, function (error, data) {
                if (error) {
                    response.writeHead(404); 
                    response.write('File not found!');
                } else {
                    response.writeHead(200, {
                        "Content-Type": "text/html"});
                    response.write(data);
                }
                response.end();
            });
            next();
        })

        this.router.get('/login', async (request, response, next) => {
            
            let path = __dirname + "/public/login.html";
            console.log(path);
            fs.readFile(path, null, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write('File not found!');
                } else {
                    response.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(data);
                }
                response.end();
            });
            next();
        });

        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.createPostHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
    }

    public listen(port): void {
        console.log("Listening at port:" + port);
        this.app.listen(port);
    }

    private async registerHandler(request, response, next) {
        let new_user = {
            'username': request.body.username,
            'email': request.body.email,
            'password': request.body.password
        };
        console.log(new_user);
        try {
            // TODO
            // 1. Check Username and Email is unique
            // 2. If so, store user info into the database
            if (await this.theDatabase.check_username(new_user['username']) === true &&
                await this.theDatabase.check_email(new_user['email']) === true) {
                await this.theDatabase.add_user(new_user);
                response.write('success');
            }
            else {
                console.log('User existed')
                response.write('User existed');
            }
        } catch (error) {
            let message = "register failed, use local memeory instead";
            console.log(message);
            response.write('failed');
            // TODO add user into the database
            users.push(new_user);
        }
        response.end();
        next();
    }

    private async createPostHandler(request, response, next){
        let data = {
            'username': request.body.username,
            'title': request.body.title,
            'content': request.body.content,
        };
        console.log(data);
        // add this post into the database
        if(await this.theDatabase.create_post(data)){
            response.write("success");
            response.end();
        } else {
            response.write('failed');
            response.end();
        }
        next();
    }

    private async loginHandler(request, response, next){
        let data = {
            'email': request.body.email,
            'password': request.body.password
        };
        try {
            if (await this.theDatabase.authenticate_user(data)){
                response.write('success');
                console.log(data);
                response.end();
            } else {
                response.write('failed')
                response.end()
            }
        } catch (error) {
            response.write("Something goes wrong")
            response.end()
        }
        next();
    }
}


