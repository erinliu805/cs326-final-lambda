
const InfoURL = "https://aqueous-dusk-44841.herokuapp.com/get_user_info"

function get_right_bar(){
	(async() =>{
		let resp = await fetch(InfoURL)
		let j = await resp.json()
		if (j['result'] == 'success'){
            let username =j['username']
            let right_bar = document.getElementById("rightBar")
            right_bar.innerHTML=`<div><a link="/profile">Welcome back ${username}</a><div>`
		} else {
			console.log("Something goes wrong")
		}
	})()
}