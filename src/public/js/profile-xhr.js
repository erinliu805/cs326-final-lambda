const url = "https://aqueous-dusk-44841.herokuapp.com/register"; 

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
		if (password != confirmPassword) {
			let message = "Two password not the same";
			document.getElementById("password-prompt").removeAttribute('hidden');
			document.getElementById("password-prompt").innerHTML = message;
		}
		if (password == confirmPassword) {
			document.getElementById("password-prompt").addAttribute('hidden');
		}
	}
};