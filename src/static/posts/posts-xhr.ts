const listenURL = "http://0.0.0.0:8080";

function generateHTML(user_img_url: string, title: string, content: string) : string {
    let html : string;
    html = `<div class="media col-md-8">
                <img src="${user_img_url}" class="mr-3" alt="...">
                <div class="media-body">
                <h5 class="mt-0">${title}</h5>
                    ${content}
                </div>
            </div>
            `
    return html;
}

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = listenURL + "/read";
        const resp  = await fetch (newURL);
        const j = await resp.json();
        let html : string = generateHTML("", j['title'], j['content']);
        console.log(html);
        var postSection = document.getElementById("postSection");
        postSection.innerHTML = html;
        console.log("Text changed");
    })()};
