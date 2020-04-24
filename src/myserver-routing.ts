import { fstat } from "fs";
import { request } from "http";

let http = require('http');
let url = require('url');
let express = require('express');
let bcrypt = require('bcrypt');
export class MyServer {
    private theDatabase;
    private app = express();
    private port = 8080;
    private router = express.Router();
    constructor(db) {
        //this.theDatabase = db;
        this.router.use((request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/housing101', express.static('./public'));
        this.app.use('/housing101', this.router);
        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.createPostHandler.bind(this));
        
        this.router.post('/login', async (request, response, next) => {
            let data = {
                'username': request.body.username,
                'password': request.body.password
            };
            console.log(data);
            response.write(JSON.stringify(data));
            response.end();
        })
    }

    public listen(port): void {
        console.log("Listening at port:" + port);
        this.app.listen(port);
    }

    private async registerHandler(request, response, next) {
        let data = {
            'username': request.body.username,
            'email': request.body.email,
            'password': request.body.password
        };
        console.log(data);
        try {
            // 1. Check Username and Email is unique
            // 2. If so, store user info into the database
            if (await this.theDatabase.checkusername(data.username) === true &&
                await this.theDatabase.checkemail(data.email) === true) {
                let hashedpassword = await bcrypt.hash(data.password, 'housing');
                console.log(hashedpassword);
                let new_user = {
                    username: data.username,
                    email: data.email,
                    password: hashedpassword
                }
                await this.theDatabase.add_user(new_user);
            }

        } catch (error) {
            console.log("register failed");
            response.write("Something wrong");
        }
        response.write(JSON.stringify(data));
        response.end();
        next();
    }

    private async createPostHandler(request, response, next){
        let data = {
            'title': request.body.title,
            'content': request.body.content,
        };
        console.log(data);
        // add this post into the database

        response.write(JSON.stringify(data));
        response.end();
        next();
    }
}


