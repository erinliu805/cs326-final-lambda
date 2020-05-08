VIDEO LINK: https://drive.google.com/file/d/1CZIMFt8A-CA3Rydd6kLS0bxWTsuveqqb/view?usp=sharing

HOW TO SET UP:
There are four env variables need to be set on heroku:
URI= //database uri for mangodb
USERNAME= //username for mangodb
PASSWORD= //password for mangodb
SESSION_SECRET = //a random string for encryption

1. ### Title: Lambda

2. ### Subtitle: Housing101

3. ### Semester: Spring 2020

4. ### Overview: 
#### Our application is an online forum for Umass students to share their off-campus living experiences. Noticing that as we move to junior and senior year, the demand for living off-campus has grown among our peers. As a community, most of us have no experience of finding a good housing option before, all we can do is just asking friends, and this is not very informative. So we create this forum where everyone can share their experiences of different housing options, depending on the price, location, environment, they can either recommand this to other users or 'warn' them on the other hand. Also they could share their subleasing information and find someone to take care of their leases. Everyone can view posts on this forum. For each user they will need to have a account to create, update, and delete posts. 

#### Knowing that there are other websites such as Facebook that has the same function as ours, Housing101 is not connected with any other social media account, so user won't be worried about their privacy while creating posts, as the account itself is only for this forum. 

5. ### Team Members: 
-  #### Juelin Liu: Juelin-Liu
- #### Alex Zhang: alexander-x-zhang
- #### Erin(Yuxin) Liu: erinliu805

6. ### User Interface: 
#### A final up-to-date list/table describing your application’s user interface. This should include the name of the UI view and its purpose. You should include a screenshot of each of your UI views.
![index.html](index.png)
The home page of our website. The top bar holds several navigation buttons, which link to the homepage itself, create_post.html, register.html, and login.html. The most recent post is displayed first, and the "Read more" button loads older posts in order of recency. If you are currently signed in, posts you made will have an edit button, in case you should wish to edit or delete a post. The login and register buttons are also replaced by a single button, titled "Welcome [username]" that leads to the user profile page.

![register.html](registerhtml.png)
The page where new accounts are made. Users simply enter their information into the relevent field and hit the submit button when they are done. Usernames and passwords must be unique - you cannot use one that has already been used.

![login.html](loginhtml.png)
The page where existing users can log in. Functions very similarly to the register page, except that this one has fewer fields. Both redirect the user to the home page 1.5 seconds after a succesful registration/login.

![create_post.html](create_post.png)
A page where users can make new posts. Both fields only support plain text, but other than that users can enter whatever they wish, whether they seek a review of an apartment, a new roommate, or friends to join their weekly board game sessions.

![edit_post.html](edit_post.png)
Extremely similar to the create post page in both function and form. The sole difference is the existence of two new buttons - one to submit the edit, and the other to permanently delete the post.

![profile.html](profile.png)
The user's profile page. The various dropdown menus can be used to set the relevent preferences, such as desired housing area. New usernames, emails, passwords, and profile pictures can also be submitted here, though they must still match the restrictions applied in the registration phase. The quick buttons from the top navigation bar have been moved to the left of the main profile section for ease of access. Finally, there are two buttons at the bottom of the page for a user to log out and permanently delete their account, respectively. No need to go through painful calls with upper management just to cancel your subscription!

![index.html v2](indexv2.png)
Another shot of the home page, showing what it looks like when you are logged in. Note the edit button in the post and the lack of the "Register" and "Login" buttons on the upper right.

7. ### APIs: 
#### A final up-to-date list/table describing your application’s API
GET Methods:
###### 1. “/login”: send login.html
###### 2. “/register": send register.html
###### 3. "/": send index.html
###### 4. "/posts": send posts page (html)
###### 5. "/create_post": send create_post page if the user has logged in, otherwise redirect user to login page
###### 6. "/edit_post": send edit_post page if the user has logged in, redirect to login page otherwise
###### 7. "/delete_post": send edit post page 
###### 8. "/profile" : send profile page to logged in user
###### 9. "/css/:file": send css files 
###### 10."/js/:file": send js files 
###### 11."/images/:file": send images 
###### 12."/read/:page": read post at a given index, sorted from newest to latest
###### 13."/get_user_info": get user info if the user is logged in

POST Methods:
All feedback from the server is stringified JSON string
The feedback is handled by xxx-xhr.js file and displayed to user
###### 1. "/register": handler registration form and return feedback
###### 2. "/create_post": handler create_post and return feedback
###### 3. "/delete_post": handler user request for deleting post and return feedback
###### 4. "/edit_post_submit": handler user request for changing post and return feedback
###### 5. "/delete_user": delete user from database, need to login first
###### 6. "/profile": handler user request for changing profile
###### 7. "/login": this API use package "passport" and "express-session" to handle login authentication and session operation. After  authenticated, user information will be stored in session and we can use request.user to get the information of a user, including username, user email, etc. 
###### 8. "/logout": logout current user, reset the session

8. ### Database: 
#### A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.
Our database is powered by MongoDB. It has two collections, one for users and one for posts. Users are stored as documents with a unique _id field, a username field, email field, and hashedpassword field. The hashedpassword field stores a hash of the user's password, and is used for authentication purposes by comparing it to the hash of the submitted password. The username and email must be unique (not used by any other user in the database). The post collection stores posts as a document with an _id field, a title field, a content field, and an author field(username of user who submitted the post). The _id of each post is generated as a timestamp from the moment the post was submitted, and is used to identify a post for the delete and update operations. Both users and posts have fully functional CRUD operations, though the read function for posts reads posts from most recent to least recent instead of searching by post ID.

9. ### URL Routes/Mappings: 
#### A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.
GET Methods:
###### 1. “/login”: send login.html
###### 2. “/register": send register.html
###### 3. "/": send home page
###### 4. "/posts": send posts page
###### 5. "/create_post": send create_post page if the user has logged in, otherwise redirect user to login page
###### 6. "/edit_post": send edit_post page if the user has logged in, redirect to login page otherwise
###### 7. "/delete_post": send edit post page 
###### 8. "/profile" : send profile page to logged in user
###### 9. "/css/:file": send css files 
###### 10."/js/:file": send js files 
###### 11."/images/:file": send images 
###### 12."/read/:page": read post at a given index, sorted from newest to latest
###### 13."/get_user_info": get user info if the user is logged in

POST Methods:
###### 1. "/register": handler registration form and return feedback
###### 2. "/create_post": handler create_post and return feedback
###### 3. "/delete_post": handler user request for deleting post and return feedback
###### 4. "/edit_post_submit": handler user request for changing post and return feedback
###### 5. "/delete_user": delete user from database, need to login first
###### 6. "/profile": handler user request for changing profile
###### 7. "/login": this API use package "passport" and "express-session" to handle login authentication and session operation. After  authenticated, user information will be stored in session and we can use request.user to get the information of a user, including username, user email, etc. 
###### 8. "/logout": logout current user, reset the session

10. ### Authentication/Authorization: 
#### A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.
Before the server starts, we initialize "passport" to manage all user login authentication.

User's password is hashed by bcrypt before store in database.
When the user tries to login, the server tries to find the matched user by email and compared the input password and the hashedpassword. If the user types correct password, a "done" is returned with user info, and the information of this particular user will be added into session by "express-session" and "passport". 

In the backend, programmer can user request.user to access the inforamtion of a logged in user, and request.isAutheticated to check if the user has logged in.

11. ### Division of Labor: 
#### Milestone 1:
-  #### Juelin Liu: Juelin-Liu - Design home page, register page, login page, and create_post page and associated routers with various handlers. Design and implement router logic and structure
- #### Alex Zhang: alexander-x-zhang - html for posts, part of index
- #### Erin(Yuxin) Liu: wrote html for login, register, profile.
#### Milestone 2:
-  #### Juelin Liu: Juelin-Liu - Design database structure, including how user and post can be add, updated, and deleted. Trying to find a way to authenticate user without storing plain password into database
- #### Alex Zhang: alexander-x-zhang - beginning of server structure (not too sure when exactly milestone 2 was)
- #### Erin(Yuxin) Liu: wrote part of login-xhr, register-xhr, profile-xhr, and some database codes
#### Milestone 3:
-  #### Juelin Liu: Juelin-Liu - Implement user authentication. Add new routers to allow user make a post after login. Modify frontend xhr code, so the return message from server can be displayed
- #### Alex Zhang: alexander-x-zhang - post edit/delete, part of db structure/server routing
- #### Erin(Yuxin) Liu: wrote profile handler, update and delete user in routing

12. ### Conclusion:
#### Alexander Zhang - making things look nice was surprisingly hard. Getting the client and server to communicate was also difficult, mainly due to the small details and differences. I wish we saw more examples of web server architecture before we started coding it properly.
#### Juelin Liu - future work: Add directy message channel between author and other user, so they can have a private conversation
#### Erin Liu - future work: adding features so that user could post picture as well. Figure out routing was very challenging, and interesting point is where each user could see individually page right bar "welcome username", that's cute.

