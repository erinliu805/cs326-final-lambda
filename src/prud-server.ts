'use strict'

// sample posts in a list of JSON
let posts = [
    {
        'author': 'author one',
        'title': 'title one',
        'content': 'Some text here',
    },

    {
        'author': 'author two',
        'title': 'title two',
        'content': 'Some more text here',
    },

    {
        'author': 'author three',
        'title': 'title three',
        'contend': 'Some random thing here',
    },
]
let http = require('http');
let url = require('url');
const headerText = { "Content-Type": "application/json",
                     "Access-Control-Allow-Origin": "*",
                     "Access-Control-Allow-Headers": "*"
                   };

async function writeResponse(data, response){
    response.write(JSON.stringify(data));
}

let server = http.createServer();
server.on('request', async (request, response) => {
    response.writeHead(200, headerText);
    let options = url.parse(request.url, true).query;
    //response.write(JSON.stringify(options));
    console.log(response.url);
    if (request.url.endsWith('/read')){
        console.log("Sending posts");
        await writeResponse(posts[0], response);
        console.log(`Sending ${JSON.stringify(posts[0])} to the client`);
    }

    response.end();
});
server.listen(8080);