import { userInfo } from "os";
require('dotenv').config();
let bcrypt = require('bcrypt');
console.log(process.env.URI);
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
        var mongoclient = this.client;
	    (async () => {
	        await this.client.connect(function(err, db) {
                if(err !== null) console.log(err);
                console.log("connection established");
                mongoclient.close();
            });
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
        // username not used, return true 
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.userDatabase);
        // console.log('Running check username, the input is: ');
        // console.log(username);
        // try {
        //     let result : number = await collection.find(
        //         {'username': username}
        //     ).count();
        //     console.log("result = " + result);    
        //     if (result === 0){
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var userDatabase = this.userDatabase;
        var mongoclient = this.client;
        console.log("checking if username " + username + " has been used");
        await this.client.connect(function(err, db) {
            let result : number = db.collection(userDatabase).find({"username" : username}).count();
            mongoclient.close();
            return result === 0;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }
    public async check_email(email: string) : Promise<boolean> {
        // check email has been used
        // email is not used, return true 
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.userDatabase);
        // console.log('Running check email, the input is: ');
        // console.log(email);
        // try {
        //     let result : number = await collection.find(
        //         {'email': email}
        //     ).count();
        //     console.log("result = " + result);    
        //     if (result === 0){
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var userDatabase = this.userDatabase;
        var mongoclient = this.client;
        console.log("checking if email " + email + " has been used");
        await this.client.connect(function(err, db) {
            let result : number = db.collection(userDatabase).find({"email" : email}).count();
            mongoclient.close();
            return result === 0;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }

    public async autheticate_user(loginInfo: JSON) : Promise<boolean> {
        // loginInfo format:
        // {email:'xxx', password:'xxx'}
        // function will return true if email and password matches
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.userDatabase);
        // console.log('Running check username, the input is: ');
        // let login_user = {
        //     'email': loginInfo['email'],
        //     'password': loginInfo['password']
        // }
        // console.log(login_user);
        // try {
        //     let user = await collection.findOne(
        //         {'email': login_user['email']}
        //     );
        //     console.log('The user is: ')
        //     console.log(user)
        //     if (await bcrypt.compare(loginInfo['password'], user['hashedpassword'])) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var userDatabase = this.userDatabase;
        var mongoclient = this.client;
        console.log("authenticating user " + loginInfo);
        await this.client.connect(function(err, db) {
            let result = db.collection(userDatabase).findOne({"email" : loginInfo['email']});
            mongoclient.close();
            return bcrypt.compare(loginInfo['password'], result['hashedpassword']);
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    } 

    public async add_user(userInfo: JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx'}
        // function will return true if user is successfully add into the database
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
        //     let result = await collection.insertOne(new_user);
        //     console.log("result = " + result);    
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var userDatabase = this.userDatabase;
        var mongoclient = this.client;
        console.log('Running add user, the input is: ' + userInfo);
        //TO DO
        //identify user by a randomly-generalized id
        let new_user = {
            '_id': Date.now().toString(),
            'email' : userInfo['email'],
            'username' : userInfo['username'],
            'hashedpassword' : bcrypt.hashSync(userInfo['password'], 10).toString(),
            'login': 0
        }
        if(!(await this.check_username(userInfo['username'])) || !(await this.check_email(userInfo['email']))) {
            console.log("username or email has been used before!\n" + userInfo);
            return false;
        }
        await this.client.connect(function(err, db) {
            let result = db.collection(userDatabase).insertOne(new_user);
            mongoclient.close();
            return result['acknowledged'];//default write concern is 1, which is ok since we only have 1 server
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    } 

    public async login_user(userInfo) : Promise<boolean> {
        console.log('Log in user, the input is: ' + userInfo);
        //TO DO
        //identify user by a randomly-generalized id
        //TO DO 
        //Check if the login field is 1, only when logged in can user change its info
        var mongoclient = this.client;
        var userDatabase = this.userDatabase;
        if(userInfo['login']=== '1') { 
            console.log("user has already log in!\n" + userInfo);
            return true;
        }
        let new_user = {
            'email' : userInfo['email'],
            'username' : userInfo['username'],
            'hashedpassword' : bcrypt.hashSync(userInfo['password'], 10).toString()
        }
        if((await this.check_username(userInfo['username'])) && (await this.check_email(userInfo['email']))) {
            console.log("user not found!\n" + userInfo);
            return false;
        }
        await this.client.connect(this.uri, function(err, db) {
            let result = db.collection(userDatabase).findOneAndReplace({'login' : '1'}, new_user);
            mongoclient.close();
            return result !== null;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }   


    public async update_user(userInfo) : Promise<boolean> {
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
        //TO DO
        //identify user by a randomly-generalized id

        //Check if the login field is 1, only when logged in can user change its info
        var mongoclient = this.client;
        var userDatabase = this.userDatabase;
        if(userInfo['login']!== '1') { 
            console.log("user not log in!\n" + userInfo);
            return false;
        }
        let new_user = {
            'email' : userInfo['email'],
            'username' : userInfo['username'],
            'hashedpassword' : bcrypt.hashSync(userInfo['password'], 10).toString()
        }
        if((await this.check_username(userInfo['username'])) && (await this.check_email(userInfo['email']))) {
            console.log("user not found!\n" + userInfo);
            return false;
        }
        await this.client.connect(function(err, db) {
            let result = db.collection(userDatabase).findOneAndReplace({'email' : userInfo['email']}, new_user);
            mongoclient.close();
            return result !== null;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }     
    
    public async delete_user(userInfo : JSON) : Promise<boolean> {
        // userinfo format:
        // {email:'xxx', username: 'xxx', password:'xxx'}
        // function will return true if user information is successfully deleted
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.userDatabase);
        // console.log('Running delete user, the input is: ');
        // console.log(userInfo);

        // try {
        //     let result = await collection.remove(
        //         {'email': userInfo['email']}
        //     );
        //     console.log("result = " + result);    
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var userDatabase = this.userDatabase;
        var mongoclient = this.client;
        console.log('Running delete user, the input is: ' + userInfo);
        await this.client.connect(function(err, db) {
            let result = db.collection(userDatabase).remove({'email' : userInfo['email']});
            mongoclient.close();
            return result['acknowledged'];//default write concern is 1, which is ok since we only have 1 server
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }    

    // --------------------------------------------------------//
    // POST section
    // TODO: implement create, update, delete a post
    public async create_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', title: 'xxx', content: '......' }*/
        //return true when post is created
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.postDatabase);
        // console.log('Running create post, the input is: ');
        // console.log(post);
        // let data = {
        //     '_id' : Date.now().toString(),
        //     'title' : post['title'],
        //     'username' : post['username'],
        //     'content' : post['content']
        // }
        // try {
        //     let result = await collection.insertOne(data);
        //     console.log("result = " + result);    
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var mongoclient = this.client;
        var postDatabase = this.postDatabase;
        let data = {
            '_id' : Date.now().toString(),
            'title' : post['title'],
            'username' : post['username'],
            'content' : post['content'],
            'updated' : -1,
            'user_id':-1
        }
        console.log('Running create post, the input is: ' + post);
        await this.client.connect(function(err, db) {
            let result = db.collection(postDatabase).insertOne(data);
            mongoclient.close();
            return result['acknowledged'];//default write concern is 1, which is ok since we only have 1 server
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }


    public async update_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {_id: 'a unique id for that post', username: 'xxx', title: 'xxx', content: '......'}*/
        //return true when post is updated
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.postDatabase);
        // console.log('Running update post, the input is: ');
        // console.log(post);
        // try {
        //     let result = await collection.findOneAndUpdate(
        //         {'_id':post['_id']},
        //         {
        //             '_id' : Date.now().toString(),
        //             'title' : post['title'],
        //             'username' : post['username'],
        //             'content' : post['content']
        //         }
        //     );
        //     console.log("result = " + result);    
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var postDatabase = this.postDatabase;
        var mongoclient = this.client;
        console.log('Running create post, the input is: ' + post);
        await this.client.connect(function(err, db) {
            let result = db.collection(postDatabase).findOneAndUpdate(
                {'_id':post['_id']},
                {
                    $set : {
                        'title' : post['title'],
                        'username' : post['username'],
                        'content' : post['content'],
                        'updated' : Date.now().toString()
                    }
                }
            );
            mongoclient.close();
            return result !== null;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }

    public async delete_post(post: JSON) : Promise<boolean> {
        // post format:
        /* {username: 'xxx', date: Date, title: 'xxx', content: '......'}*/
        //return true when post is deleted
        // let db = await this.client.db(this.dbName);
        // let collection = await db.collection(this.postDatabase);
        // console.log('Running delete post, the input is: ');
        // console.log(post);
        // try {
        //     let result = await collection.remove(
        //         {'_id': post['_id']}
        //     );
        //     console.log("result = " + result);    
        //     return true;
        // } catch (error) {
        //     console.log(error);
        //     console.log('falied');
        //     return false
        // }
        var mongoclient = this.client;
        var postDatabase = this.postDatabase;
        console.log('Running delete post, the input is: ' + post);
        await this.client.connect(function(err, db) {
            let result = db.collection(postDatabase).remove(post);
            mongoclient.close();
            return result['nRemoved'] === 1;
        }).catch(err => { console.log(err); });
        return false;//if this line is reached then an error happened during connection
    }

    //I have no idea how we're going to specify which post to read, so I've left this one as is
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
            let result = await collection.find().sort({_id:-1}).skip(p).limit(1).toArray();
            console.log("result = ");
            console.dir(result[0])
            if (result == undefined){
                return 
            }
            return result[0];

        } catch (error) {
            console.log(error);
            console.log('falied');
            return null
        }
    }
}
