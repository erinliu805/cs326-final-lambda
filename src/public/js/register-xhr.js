const url = "http://0.0.0.0:8080/housing101/register"; 

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
    let repassword = document.getElementById("password-confirm").value;
    let userInterestedHousingArea = document.getElementById("userInterestedHousingArea").value;
    let userCurrentHousingArea = document.getElementById("userCurrentHousingArea").value;

	const data = { 'email' : email, 'username' : username, 'password' : password, 'userCurrentHousingArea' : userCurrentHousingArea, 'userInterestedHousingArea' : userInterestedHousingArea  }; // -- (1)
        const newURL = url + "/users/" + username + "/add_user"; 
        const resp = await postData(newURL, data); 
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = username +  " created.</b>";
	} else {
	    document.getElementById("output").innerHTML = "error";
	}
    })();
}