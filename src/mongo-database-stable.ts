import { userInfo } from "os";
require('dotenv').config();
let bcrypt = require('bcrypt');
export class Database {
    private MongoClient = require('mongodb').MongoClient;
    private uri = process.env.URI; // TODO: register account and change this uri
    private client;
    private collectionName : string;
    private userDatabase : string = "user-db";
    private postDatabase : string = "post-db";
    private topicDatabase : string = "topic-db";
    private dbName : string;
    constructor(dbName: string) {
	this.dbName = dbName;
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
    
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

    // ---------------------------------------------------------------- //
    // user information section
    // TODO: implement check, add, delete, update user information
    public async getUserByEmail(email: string): Promise<JSON> {
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase)
        try {
            let user = await collection.findOne(
                {'email': email}
            )
            return user
        } catch(e) {
            console.log(e)
            return
        }
    }

    public async getUserById(id: any): Promise<JSON> {
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase)
        try {
            let user = await collection.findOne(
                {'_id': id}
            )
            return user
        } catch(e) {
            console.log(e)
            return
        }
    }

    public async check_username(username: string) : Promise<boolean> {
        // check username has been used
        // username is valid, return true 
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running check username, the input is: ');
        console.log(username);
        try {
            let result : number = await collection.find(
                {'username': username}
            ).count();
            console.log("result = " + result);    
            if (result === 0){
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }
    public async check_email(email: string) : Promise<boolean> {
        // check email has been used
        // email is valid, return true 
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running check email, the input is: ');
        console.log(email);
        try {
            let result : number = await collection.find(
                {'email': email}
            ).count();
            console.log("result = " + result);    
            if (result === 0){
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }

    public async autheticate_user(loginInfo: JSON) : Promise<boolean> {
        // loginInfo format:
        // {email:'xxx', password:'xxx'}
        // function will return true if email and password matches
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running check username, the input is: ');
        let login_user = {
            'email': loginInfo['email'],
            'password': loginInfo['password']
        }
        console.log(login_user);
        try {
            let user = await collection.findOne(
                {'email': login_user['email']}
            );
            console.log('The user is: ')
            console.log(user)
            if (await bcrypt.compare(loginInfo['password'], user['hashedpassword'])) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    } 

    public async add_user(userInfo: JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx'}
        // function will return true if user is successfully add into the database
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running add user, the input is: ');
        let new_user = {
            '_id': Date.now().toString(),
            'email' : userInfo['email'],
            'username' : userInfo['username'],
            'hashedpassword' : userInfo['password']
        }
        let hashedpassword : string = bcrypt.hashSync(userInfo['password'], 10).toString();
        new_user['hashedpassword'] = hashedpassword;
        try {
            let result = await collection.insertOne(new_user);
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    } 

    public async update_user(userInfo) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx'}
        // function will return true if user information is successfully updated
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running add user, the input is: ');
        let new_user = {
            '_id': userInfo['_id'],
            'email' : userInfo['email'],
            'username' : userInfo['username'],
            'hashedpassword' : userInfo['password']
        }
        let hashedpassword : string = bcrypt.hashSync(userInfo['password'], 10).toString();
        new_user['hashedpassword'] = hashedpassword;
        try {
            let result = await collection.findOneAndUpdate(
                {'email': new_user['email']},
                new_user
            );
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }     
    
    public async delete_user(userInfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx'}
        // function will return true if user information is successfully deleted
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.userDatabase);
        console.log('Running delete user, the input is: ');
        console.log(userInfo);

        try {
            let result = await collection.remove(
                {'email': userInfo['email']}
            );
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }    

    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    public async create_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {_id:'xxx', userID:'xxx', username: 'xxx', title: 'xxx', content: '......' }*/
        //return true when post is created
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.postDatabase);
        console.log('Running create post, the input is: ');
        console.log(post);
        try {
            let result = await collection.insertOne(post);
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }


    public async update_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {_id: 'a unique id for that post', username: 'xxx', title: 'xxx', content: '......'}*/
        //return true when post is updated
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.postDatabase);
        console.log('Running update post, the input is: ');
        console.log(post);
        try {
            let result = await collection.findOneAndUpdate(
                {'_id':post['_id']},
                {
                    '_id' : Date.now().toString(),
                    'title' : post['title'],
                    'username' : post['username'],
                    'content' : post['content']
                }
            );
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }

    public async delete_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......'}*/
        //return true when post is deleted
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.postDatabase);
        console.log('Running delete post, the input is: ');
        console.log(post);
        try {
            let result = await collection.remove(
                {'_id': post['_id']}
            );
            console.log("result = " + result);    
            return true;
        } catch (error) {
            console.log(error);
            console.log('falied');
            return false
        }
    }

    public async read_post(page) : Promise<JSON> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......'}*/
        //return true when post is deleted
        let db = await this.client.db(this.dbName);
        let collection = await db.collection(this.postDatabase);
        console.log('Running read post, the input is: ');
        console.log(page);
        let p = parseInt(page.toString()) + 0;
        try {
            if (p === NaN){
                let result = await collection.find().limit(1).toArray();
                console.log("result = ");
                console.dir(result[0])
                return result[0];
            } else {
                let result = await collection.find().skip(p).limit(1).toArray();
                console.log("result = ");
                console.dir(result[0])
                return result[0];
            }

        } catch (error) {
            console.log(error);
            console.log('falied');
            return null
        }
    }
}