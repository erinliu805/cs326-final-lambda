# cs326-final-lambda
This is a project building a forum for UMass students to share their off-campus living experiences

DOCUMENTATION FOR OTHER GROUP MEMBERS
adding new posts
	posts are structured as a flexbox, with a container div of class "post". Inside the container div are two smaller divs, "postprofile" and "postbody". To create a new post, you need to change the img src for the profile pic in the first <dt> element of postprofile, as well as change the poster's location in the <dd> element. The <h3> tag is the current topic, and the content of the post goes in the <div> of class "content".