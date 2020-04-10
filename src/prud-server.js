'use strict'

let http = require('http');
let url = require('url');
let mysql = require('mysql');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'guest',
        password: '',
    }
);

db.connect(function(err) {
    if (err) {
        createDatabase(db);
    }
    console.log('Mysql is connected')
})

function createDatabase(db) {
    let sql = 'CREATE DATABASE housing101';
    db.query(sql, (err, response) =>{
        if (err) throw err;
        console.log('Database created');
        response.send('database created');
    })
}

let post = {
    'author': 'author one',
    'title': 'title one',
    'contend': 'Some text here',
}
const headerText = { "Content-Type": "application/json",
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Headers": "*"
                   };

async function writeResponse(data, response){
    response.write(JSON.stringify(data));
    response.end();
}

let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    response.write(JSON.stringify(options));
    console.log(response.url);
    if (request.url.endsWith('/read')){
        console.log("Sending posts");
        await writeResponse(post, response);
        console.log(post);
    }

    response.end();
});
server.listen(8080);