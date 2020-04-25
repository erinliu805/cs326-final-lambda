import { fstat } from "fs";
import { request } from "http";

let http = require('http');
let url = require('url');
let express = require('express');
let fs = require('fs');
let users = [];
let posts = [];
let path = require('path')
export class MyServer {
    private theDatabase;
    private app = express();
    private port = 8080;
    private router = express.Router();
    constructor(db) {
        this.theDatabase = db;
        this.router.use((request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use('/', express.static('./public'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.router.get('/login', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/login.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });

        this.router.get('/register', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/register.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });
        
        this.router.get('/', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/index.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });
        this.router.get('/posts', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/posts.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });

        this.router.get('/create_post', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/create_post.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });

        this.router.get('/profile', async (request, response, next) => {
            let file_path = path.join(__dirname, 'public/profile.html');
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/html');
            response.write(data);
            response.end();
            next();
        });

        this.router.get('/css/:file', async (request, response, next) => {
            let file_path = __dirname + "/public/css/" + request.params.file
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'text/css');
            response.write(data);
            response.end();
            next();
        });

        this.router.get('/js/:file', async (request, response, next) => {
            let file_path = __dirname + "/public/js/" + request.params.file
            let data = fs.readFileSync(file_path);
            response.header('Content-Type', 'application/x-javascript');
            response.write(data);
            response.end();
            next();
        });

        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.createPostHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
        this.app.use('/', this.router);
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
            response.write('Something goes wrong');
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
            if (await this.theDatabase.autheticate_user(data)){
                response.write('success');
                console.log(data);
                response.end();
            } else {
                response.write('failed')
                response.end()
            }
        } catch (error) {
            console.log(error);
            response.write("Something goes wrong")
            response.end()
        }
        next();
    }
}


