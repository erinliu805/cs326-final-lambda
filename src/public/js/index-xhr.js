const readURL = "http://0.0.0.0:8080/read";
// const homeURL = "https://aqueous-dusk-44841.herokuapp.com/"; 
let page = 0

const user_img = "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg"
function generateHTML(author, title, content) {
    let html = `<div class="media content-section col-md-8>
                <img src="${user_img.toString()}" class="post-img rounded" alt="user-photo"></img>
                <div class="post-metadata">
                    <a href="#" class="mr-auto">${author.toString()}</a>
                </div>
                <div class="media-body">
                    <h2 class="mt-0 post-title">${title.toString()}</h2>
                    <small class="text-muted">2020.4.1</small>
                    <p class="post-content">${content.toString()}</p>
                </div>
            </div>
            `
    return html;
}

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = readURL + "/" + page;
        const resp  = await fetch(newURL);
        const j = await resp.json();
        let html = generateHTML(j["username"], j['title'], j['content']);
        console.log(html);
        var postSection = document.getElementById("posts");
        postSection.innerHTML = html + postSection.innerHTML;
        console.log("Text changed");
        page = page + 1
    })()
};