import { fstat } from "fs";
import { request } from "http";
import { doesNotMatch } from "assert";

let http = require('http');
let url = require('url');
let express = require('express');
let fs = require('fs');
let users = [];
let path = require('path')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt')
let session = require('express-session')
let flash = require('express-flash')

export class MyServer {
    private theDatabase;
    private app = express();
    private port = process.env.PORT;
    private router = express.Router();

    constructor(db) {
        this.theDatabase = db;
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false
          }))

        this.initialize_passport.bind(this)
        this.initialize_passport()
        this.app.use(passport.initialize())
        this.app.use(passport.session({
            secret: process.env.SESSION_SECRET
        }))
        this.app.use(flash())
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
            if (request.isAuthenticated()){
                let file_path = path.join(__dirname, 'public/create_post.html');
                let data = fs.readFileSync(file_path);
                response.header('Content-Type', 'text/html');
                response.write(data);
                response.end();
            }
            else {
                response.redirect('/login')
            }
            next();
        });

        //TO Do 
        // before go to profile, check if the user log in
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

        this.router.get('/read/:page', async (request, response, next) => {
            let page : number = request.params.page
            if (page == NaN){
                page = 0
            }
            let post = await this.theDatabase.read_post(page);
            response.write(JSON.stringify(post));
            response.end();
        })

        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/create_post', this.createPostHandler.bind(this));
        this.router.post('/login', passport.authenticate(
            'local',
            {
                successRedirect:'/',
                failureRedirect:'/login',
                failureFlash:true
            }
        ), this.loginHandler.bind(this));
        this.app.use('/', this.router);
    }

    public listen(port): void {
        let p = port || 8080
        console.log("Listening at port:" + p);
        this.app.listen(p);
    }

    private initialize_passport() {
        let getUserByID = this.theDatabase.getUserByID
        console.log('Initializing passport')
        passport.use(new LocalStrategy({usernameField: 'email'}, this.authenticateUser.bind(this)))
        passport.serializeUser((user, done) => done(null, user._id))
        passport.deserializeUser((_id, done) => done(null, async() => { return await getUserByID(_id)}))
        return passport
    }

    private async authenticateUser(email, password, done){
        let user = await this.theDatabase.getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: 'Can not find this user'})
        }

        try {
            if (await bcrypt.compare(password, user.hashedpassword)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e){
            return done(e)
        }
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
        console.log('Create post')
        console.dir(request.user)
        let data = {
            'userID' : request.user._id,
            'username': request.user.username,
            'title': request.body.title,
            'content': request.body.content,
            'id': Date.now().toString()
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
        response.header('Content-type', 'application/json')
        let data = {
            'email': request.body.email,
            'password': request.body.password
        };
        try {
            if (await this.theDatabase.autheticate_user(data)){
                response.redirect('/');
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


