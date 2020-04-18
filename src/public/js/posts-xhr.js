const listenURL = "http://0.0.0.0:8080";
const user_img = "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg"
function generateHTML(author, title, content) {
    let html = `<div class="media content-section col-md-8>
                <img src="${user_img}" class="post-img rounded" alt="user-photo"></img>
                <div class="post-metadata">
                    <a href="#" class="mr-auto">${author}</a>
                </div>
                <div class="media-body">
                    <h2 class="mt-0 post-title">${title}</h2>
                    <small class="text-muted">2020.4.1</small>
                    <p class="post-content">${content}</p>
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
        let html = generateHTML(j["author"], j['title'], j['content']);
        console.log(html);
        var postSection = document.getElementById("posts");
        postSection.innerHTML = html;
        console.log("Text changed");
    })()};
