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

