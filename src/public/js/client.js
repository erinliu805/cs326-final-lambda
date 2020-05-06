
const InfoURL = "https://aqueous-dusk-44841.herokuapp.com/get_user_info"

function get_right_bar(){
	(async() =>{
		let resp = await fetch(InfoURL)
		let j = await resp.json()
		if (j['result'] == 'success'){
            let username =j['username']
            let right_bar = document.getElementById("rightBar")
            right_bar.innerHTML=`<a class="nav-item nav-link btn btn-outline-primary" href="/profile">Welcome ${username}</a>`
		} else {
			console.log("Something goes wrong")
		}
	})()
}