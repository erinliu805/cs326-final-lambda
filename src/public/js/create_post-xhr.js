const url = "https://aqueous-dusk-44841.herokuapp.com/register"; 
const loginURL = "https://aqueous-dusk-44841.herokuapp.com/login"; 
const createURL='https://aqueous-dusk-44841.herokuapp.com/create_post'
const homeURL='https://aqueous-dusk-44841.herokuapp.com'
// NEW: helper method for posting data
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


function create_post() {
    (async () => {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

	const data = { 'title' : title, 'content' : content}; // -- (1)
	const resp = await postData(createURL, data); 
	const j = await resp.json();
	console.log("The data is ")
	console.dir(data)
	if (j['result'] !== 'success') {
	    document.getElementById("output").innerHTML = j['result'];
	} else {
		document.getElementById("output").innerHTML = "success! you can see your post in home page";
		setTimeout(function(){window.location.href=homeURL}, 1500) 
	}
    })();
}