export class Database {

    private MongoClient = require('mongodb').MongoClient;

    private uri = ""; // TODO: register account and change this uri
    private client;
    private collectionName : string;
    private userDatabase : string = "user-db";
    private postDatabase : string = "post-db";
    constructor(collectionName: string) {
	this.collectionName = collectionName;
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
    
	// Open up a connection to the client.
	// Open up a connection to the client.
	// The connection is asynchronous, but we can't call await directly
	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
	
	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

    // ---------------------------------------------------------------- //
    // user information section
    // TODO: implement check, add, delete, update user information
    public async check_username(username: string) : Promise<boolean> {
        // check username has been used
        // username is valid, return true 
        return true;
    }

    public async check_email(email: string) : Promise<boolean> {
        // check email has been used
        // email is valid, return true 
        return true;
    }

    public async add_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user is successfully add into the database
        return true;
    } 

    public async update_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user information is successfully updated
        return true;
    }     
    
    public async delete_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user information is successfully deleted
        return true;
    }    

    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    public async create_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is created
        return true;
    }

    public async update_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is updated
        return true;
    }

    public async delete_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is deleted
        return true;
    }

    
}


    // ---------------------------------------------------------//
    /*
    sample database code:
    
    public async put(key: string, value: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("put: key = " + key + ", value = " + value);
	let result = await collection.updateOne({'name' : key}, { $set : { 'value' : value} }, { 'upsert' : true } );
	console.log("result = " + result);
    }

    public async get(key: string) : Promise<string> {
	let db = this.client.db(this.dbName); // this.level(this.dbFile);
	let collection = db.collection(this.collectionName);
	console.log("get: key = " + key);
	let result = await collection.findOne({'name' : key });
	console.log("get: returned " + JSON.stringify(result));
	if (result) {
	    return result.value;
	} else {
	    return null;
	}
    }
    
    public async del(key: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("delete: key = " + key);
	let result = await collection.deleteOne({'name' : key });
	console.log("result = " + result);
	// await this.db.del(key);
    }
    
    public async isFound(key: string) : Promise<boolean>  {
	console.log("isFound: key = " + key);
	let v = await this.get(key);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }*/