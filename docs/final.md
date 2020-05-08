1. ### Title: Lambda

2. ### Subtitle: Housing101

3. ### Semester: Spring 2020

4. ### Overview: A brief overview of your application. This will be based on what you are submitting as your final web application artifact. You should also mention why your application is innovative.

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

8. ### Database: 
#### A final up-to-date representation of your database including a brief description of each of the entities in your data model and their relationships if any.
Our database is powered by MongoDB. It has two collections, one for users and one for posts. Users are stored as documents with a username field, email field, and hashedpassword field. The hashedpassword field stores a hash of the user's password, and is used for authentication purposes by comparing it to the hash of the submitted password. The username and email must be unique (not used by any other user in the database). The post collection stores posts as a document with an _id field, a title field, a content field, and an author field(username of user who submitted the post). The _id of each post is generated as a timestamp from the moment the post was submitted, and is used to identify a post for the delete and update operations. Both users and posts have fully functional CRUD operations, though the read function for posts reads posts from most recent to least recent instead of searching by post ID.

9. ### URL Routes/Mappings: 
#### A final up-to-date table of all the URL routes that your application supports and a short description of what those routes are used for. You should also indicate any authentication and permissions on those routes.

10. ### Authentication/Authorization: 
#### A final up-to-date description of how users are authenticated and any permissions for specific users (if any) that you used in your application. You should mention how they relate to which UI views are accessible.

11. ### Division of Labor: 
#### A breakdown of the division of labor for each team member — that is, saying who did what, for the entire project. Remember that everyone is expected to contribute roughly equally to each phase of the project. We expect to see similar numbers and kinds of GitHub commits by each student.

12. ### Conclusion:
#### A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.

