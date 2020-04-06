const listenURL = "http://0.0.0.0:8080";
var postSection = document.getElementById("postSection");

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = listenURL + "/read";
        const resp  = await fetch (newURL);
        const j = await resp.json();
        console.log(j);
        postSection.innerHTML='downloaded';
    })()};