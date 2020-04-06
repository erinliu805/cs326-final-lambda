const listenURL = "http://localhost:8080";
const fetch = require("node-fetch");

function readPost() { 
    (async () => {
        console.log("Reading from server");
        const newURL = listenURL + "/read";
        const resp  = await fetch(newURL);
        console.log(resp);
        const j = await resp.json();
        //some bugs here
        document.getElementById("postSection").innerHTML=j['author'];
    })()};
