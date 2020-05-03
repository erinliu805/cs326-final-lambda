// const url = "https://aqueous-dusk-44841.herokuapp.com/register"; 
// const loginURL = "https://aqueous-dusk-44841.herokuapp.com/login"; 

const url = "http://localhost:8080/register"
const loginURL = "http://localhost:8080/login"
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


function checker() {
		console.log('running checker')
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		
		//check if password has at least one number, one upper case and one lower case
		
		if (password !== confirmPassword) {
			let message = "Two password not the same";
			document.getElementById("password-prompt").removeAttribute("hidden");
			document.getElementById("password-prompt").innerHTML = "Two password not the same";
			console.log(message)
		}
		if (password === confirmPassword) {
			document.getElementById("password-prompt").setAttribute("hidden", "true");
		}
};


function register(){
	(async () => {
		console.log('running register')
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		const data = { 'email' : email, 'username' : username, 'password' : password }; // -- (1)
		const resp = await postData(url, data); 
		const j = await resp.json();
		console.log('Result is: ')
		console.log(j)
		if (j['result'] !== 'success') {
			document.getElementById("output").innerHTML = j['result'];
		} else {
			document.getElementById("output").innerHTML = username + ' login in';
			setTimeout(function(){window.location.href=loginURL}, 3000) 
		}

	})()
}