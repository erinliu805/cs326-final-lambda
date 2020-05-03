const url = "https://aqueous-dusk-44841.herokuapp.com/login"; 
const local_url='http://localhost:8080/login'
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


function user_register() {
    (async () => {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

	const data = { 'email' : email, 'username' : username, 'password' : password }; // -- (1)
	const resp = await postData(newURL, data); 
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = username +  " log in.</b>";
	} else {
	    document.getElementById("output").innerHTML = "error";
	}
    })();
}