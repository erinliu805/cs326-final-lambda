
const url = "https://aqueous-dusk-44841.herokuapp.com/";

async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = listenURL + "/read";
        const resp  = await fetch (newURL);
        const j = await resp.json();
        let html = generateHTML(j["author"], j['title'], j['content']);
        console.log(html);
        var postSection = document.getElementById("posts");
        postSection.innerHTML = html;
    })()};