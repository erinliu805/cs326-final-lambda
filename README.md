# cs326-final-lambda
This is a project building a forum for UMass students to share their off-campus living experiences

DOCUMENTATION FOR OTHER GROUP MEMBERS
adding new posts
	posts are structured as a flexbox, with a container div of class "post". Inside the container div are two smaller divs, "postprofile" and "postbody". To create a new post, you need to change the img src for the profile pic in the first <dt> element of postprofile, as well as change the poster's location in the <dd> element. The <h3> tag is the current topic, and the content of the post goes in the <div> of class "content".

if you want to update user info, as you may noticed, you need to refresh the page after you click submit button on the profile page.

Handling POST request in myserver-routing.ts:
	use 'multer' -- an express package to handler incoming POST request
	Document: https://github.com/expressjs/multer#readme

	use absolute path for sending file:
	eg: response.sendFile(__dirname + 'path to file');
	
The new file arrangement
	One issue I discovered is the server is unable to render css file that is not the same directory (weird)
	to take an advantage of express.static method, the file hierachy is changed to:
	├── src
		├── main-server.ts
		├── myserver-routing.ts
		├── mango-database.ts
		├── public
			├── index.html
			├── login.html
			├── register.html
			├── user_profile.html
			├── js/
			│   ├── index-xhr.js
			│   ├── models/
			├── css/
			└── ...
	Now the html files are sitting above all the css and js folder
	linking between each file won't cause error
	
	For example:
	when a user access this webserver with url: www.xxx.com/housing101/login
	this will be redirected to www.xxx.com/housing101/login.html 
	login.html is accessible since it is in the public folder which
	is accessible for the clients by using method express.static('./public')

	The following url can be used to access the websites when main-server is running:
	localhost:8080/housing101/login
	localhost:8080/housing101/register
	localhost:8080/housing101/createPost
	localhost:8080/housing101/index
	localhost:8080/housing101/posts
	localhost:8080/housing101/profile
	localhost:8080/housing101/


