// const readURL = "http://0.0.0.0:8080/read";
const readURL = "https://aqueous-dusk-44841.herokuapp.com/read"; 
//const InfoURL = "https://aqueous-dusk-44841.herokuapp.com/get_user_info";
let page = 0

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

function generateHTML(author, title, content, time, id) {
    let result = "";
    (async () => {
        let response = await fetch(InfoURL);
        let json = await response.json();
        let editButton = (json['username'] === author.toString()) ? `<button type="button" class="nav-item active" onclick="editPost(${id.toString()})">Edit</button>`
                : ``;
        let html = `<div class="media content-section">
                    <img src="/images/default.jpg" class="post-img rounded" alt="user-photo"></img>
                    <div class="media-body" id="${id.toString()}">
                    <h2 class="mt-0 post-title">${title.toString()}</h2>
                    <h5 class="mt-0">${author.toString()}</h5>
                    <small class="text-muted">${time}</small>
                    <p class="post-content">${content}</p>${editButton}</div></div>`
        console.log(html);
        result = html;
        let postSection = document.getElementById("posts");
        postSection.innerHTML = postSection.innerHTML+html;
        //return html;
    })();
}

function editPost(idthis) {
    (async () => {
        var url = '"https://aqueous-dusk-44841.herokuapp.com/edit_post"';
        let data = {id: idthis}
        let resp = await postData(url, data);
        document.html=resp;
        //const j = await resp.json();
        console.log("The data is ")
        console.dir(data)
        if (j['result'] !== 'success') {
            //document.getElementById("output").innerHTML = j['result'];
        } else {
            //document.getElementById("output").innerHTML = "success! you can see your post in home page";
            //setTimeout(function(){window.location.href=homeURL}, 1500) 
        }
    })();
}

function readPost() {
    (async () => {
        console.log("Reading from server");
        const newURL = readURL + "/" + page;
        const resp  = await fetch(newURL);
        const j = await resp.json();
        console.log("message received: ")
        console.dir(j)
        if (j['result'] != "failed"){
            let timestamp = parseInt(j['_id'])
            console.log(timestamp)
            let date = new Date(timestamp)
            let time = date.toLocaleDateString()
            let content = j['content']
            let formated_content = content.replace(/\n/g, '<br>')
            let username = j['username']
            let title = j['title']
            let html = generateHTML(username, title, formated_content, time, j['_id']);
            console.log(html);
            let postSection = document.getElementById("posts");
            //postSection.innerHTML = postSection.innerHTML+html;
            console.log("Text changed");
            page = page + 1
        } else {
            let readMore = document.getElementById("readMore");
            readMore.innerHTML = "No more post to read!";
        }
    })()
};