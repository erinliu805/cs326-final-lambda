export class Database {

    private MongoClient = require('mongodb').MongoClient;

    private uri = ""; // TODO: register account and change this uri
    private client;
    private collectionName : string;
    private userDatabase : string = "user-db";
    private postDatabase : string = "post-db";
    private topicDatabase : string = "topic-db";

    constructor(collectionName: string) {
	this.collectionName = collectionName;
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
    
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

    // ---------------------------------------------------------------- //
    // user information section
    // TODO: implement check, add, delete, update user information
    public async check_username(prospectiveUsername: string) : Promise<boolean> {
        // check username has been used
        // username is valid, return true 
        var used = true;
        await this.client.connect(this.uri, function (err, db) {
            var cursor = db.collection(this.userDatabase).find({username: prospectiveUsername});
            //this relies on username-email combinations being unique. No duplicates allowed!
            cursor = cursor.toArray();
            used = cursor.length === 0;
            this.client.close();
        });
        return used;
        //return true;
    }
    public async check_email(prospectiveEmail: string) : Promise<boolean> {
        // check email has been used
        // email is valid, return true 
        var used = true;
        await this.client.connect(this.uri, function (err, db) {
            var cursor = db.collection(this.userDatabase).find({email: prospectiveEmail});
            //this relies on username-email combinations being unique. No duplicates allowed!
            cursor = cursor.toArray();
            used = cursor.length === 0;
            this.client.close();
        });
        return used;
    }

    public async autheticate_user(loginInfo : JSON) : Promise<boolean> {
        // loginInfo format:
        // {email:'xxx', password:'xxx'}
        // function will return true if email and password matches
        var authenticated = false;
        var info = JSON.parse("" + loginInfo);
        await this.client.connect(this.uri, function (err, db) {
            var cursor = db.collection(this.userDatabase).findOne({username: info.username, email: info.email});
            //this relies on username-email combinations being unique. No duplicates allowed!
            cursor = cursor.toArray();
            if(cursor[0].password = info.password) authenticated = true;//do some fancy hashing or whatever here
            this.client.close();
        });
        return authenticated;
    } 

    public async add_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user is successfully add into the database
        var added = false;
        var info = JSON.parse("" + userinfo);
        if(!(await this.check_email(info.email))&& !(await this.check_username(info.username))) {
            await this.client.connect(this.uri, function (err, db) {
                db.collection(this.userDatabase).insertOne(info);
                added = true;
                this.client.close();
            });
        }
        return added;
    } 

    public async update_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user information is successfully updated
        var updated = false;
        var info = JSON.parse("" + userinfo);
        if((await this.check_email(info.email))&& (await this.check_username(info.username))) {
            await this.client.connect(this.uri, function (err, db) {
                db.collection(this.userDatabase).updateOne({'username' : info.email}, { $set : userinfo }, { 'upsert' : true } );
                updated = true;
                this.client.close();
            });
        }
        return updated;
    }     
    
    public async delete_user(userinfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx', profile_img: 'xxx.jpg', interests: ['...', '...', '...']}
        // function will return true if user information is successfully deleted
        var deleted = false;
        var info = JSON.parse("" + userinfo);
        if((await this.check_email(info.email))&& (await this.check_username(info.username))) {
            await this.client.connect(this.uri, function (err, db) {
                db.collection(this.userDatabase).deleteOne({'username' : info.username });
                deleted = true;
                this.client.close();
            });
        }
        return deleted;
    }    

    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    public async create_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is created
        var info = JSON.parse("" + post);
        var posted = true;
        await this.client.connect(this.uri, function (err, db) {
            if(err !== null) posted = false;
            db.collection("" + info.topic).insertOne(info);
            this.client.close();
        });
        return posted;
    }

    public async update_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is updated
        var info = JSON.parse("" + post);
        var posted = true;
        await this.client.connect(this.uri, function (err, db) {
            if(err !== null) posted = false;
            db.collection("" + info.topic).updateOne(info);
            this.client.close();
        });
        return posted;
    }

    public async delete_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......', imgs: ['xxx.jpg', 'xxx.jpg'...], topic: 'xxx',rate: 0-5,}*/
        //return true when post is deleted
        var info = JSON.parse("" + post);
        var posted = true;
        await this.client.connect(this.uri, function (err, db) {
            if(err !== null) posted = false;
            db.collection("" + info.topic).deleteOne(info);
            this.client.close();
        });
        return posted;
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