const url = "https://aqueous-dusk-44841.herokuapp.com/register"; 
const loginURL = "https://aqueous-dusk-44841.herokuapp.com/login"; 

// const url = "http://localhost:8080/register"
// const loginURL = "http://localhost:8080/login"
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
	async () => {
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		let flag = true
		if (password == confirmPassword) {
			if (password.value.match(/[a-z]/g) && password.value.match(/[A-Z]/g) && password.value.match(/[0-9]/g)&& password.value.length>=8){
				document.getElementById("password-prompt").addAttribute('hidden');
			}
			else{
				let message = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
				document.getElementById("password-prompt").removeAttribute('hidden');
				document.getElementById("password-prompt").innerHTML = message;
				flag = false
			}
		}
		if (password != confirmPassword) {
			let message = "Two password not the same";
			document.getElementById("password-prompt").removeAttribute('hidden');
			document.getElementById("password-prompt").innerHTML = message;
			flag = false;
		}
		return flag
	}
};


function register(){
	(async () => {
		console.log('running register')
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		if(checker()===true){
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
		}
		else{
			document.getElementById("output").innerHTML =  'please try again';
		}
	})()
}