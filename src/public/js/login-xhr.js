const url = "https://aqueous-dusk-44841.herokuapp.com/login"; 
const loginURL='http://localhost:8080/login'
const homeURL='http://localhost:8080'
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


function login() {
    (async () => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

	const data = { 'email' : email, 'username' : username, 'password' : password }; // -- (1)
	const resp = await postData(loginURL, data); 
	const j = await resp.json();
	if (j['result'] !== 'success') {
	    document.getElementById("output").innerHTML = j['result'];
	} else {
		document.getElementById("output").innerHTML = "success! you will be login in a second";
		setTimeout(function(){window.location.href=homeURL}, 1500) 
	}
    })();
}