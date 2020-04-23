import { fstat } from "fs";

let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;
    private app = express();
    private port = 8080;
    private router = express.Router();
    private fs = require('fs');
    constructor(db) {
        //this.theDatabase = db;
        this.router.use((request, response, next) => {
            response.header('Content-Type','application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // from https://enable-cors.org/server_expressjs.html
        // Serve static pages from a particular path.
        this.app.use('/housing101', express.static('./public'));
        this.app.use('/housing101', this.router);
        this.router.get('/login', this.loginRender.bind(this));
        this.router.get('/register', this.registerRender.bind(this));
        this.router.get('/index', this.indexRender.bind(this));
        this.router.get('/profile', this.profileRender.bind(this));
        this.router.get('/posts', this.postsRender.bind(this));
        this.router.get('/createPost', this.createPostRender.bind(this));
        this.router.get('/', this.indexRender.bind(this));

        // this.app.use(express.json());
        // this.router.post('/login', this.loginRender.bind(this));
        // this.router.post('/register', this.registerRender.bind(this));
        // this.router.post('/index', this.indexRender.bind(this));
        // this.router.post('/profile', this.profileRender.bind(this));
        // this.router.post('/posts', this.postsRender.bind(this));
        // this.router.post('/createPost', this.createPostRender.bind(this));
        // this.router.post('/', this.indexRender.bind(this));
    }

    public listen(port) : void  {
        this.app.listen(port);
    }

    private async loginRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/login.html');
    }

    private async registerRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/register.html')
    }

    private async indexRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/index.html');
    }

    private async profileRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/profile.html')
    }

    private async createPostRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/create_post.html')
    }    
    
    private async postsRender(request, response, next) : Promise<void> {
        response.redirect('/housing101/posts.html')
    }

    private async loginHandler(request, response, next) : Promise<void> {
    }

    private async registerHandler(request, response, next) : Promise<void> {
    }

    private async createPostHandler(request, response, next) : Promise<void> {
    }
}
    /*
    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
	await this.createCounter(request.params['userId']+"-"+request.query.name, response);
    }

    private async readHandler(request, response): Promise<void> {
	/// YOUR CODE GOES HERE
	await this.readCounter(request.params['userId']+"-"+request.query.name, response);
    }

    private async updateHandler(request, response) : Promise<void> {
	/// YOUR CODE GOES HERE
	await this.updateCounter(request.params['userId']+"-"+request.query.name, request.query.value, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
	/// YOUR CODE GOES HERE
	await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
    }

    public async createCounter(name: string, response) : Promise<void> {
	console.log("creating counter named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }

    public async updateCounter(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
    }
    */


