### Part 0: Data Interactions
#### User Components
  * Email
  * Username & ID
  * User portrait
  * Password (encrypted in database)
  * User posts
  * User messages
  * User current housing area / interested housing area
  * User group / by default = housing area

#### Posts
  * User
  * Date
  * Images
  * Content
  * housing area
  * Rate (transportation, environment, price...)

#### Housing Area
  * Name & Description
  * Location
  * Avg Rate (calculated from users' posts)
  
#### Market Place (optional)
  * housing area
  * User
  * bid

### Part 1: Wireframes

#### **Login**
![login](Login.png)

Users log in here by entering their username and password.

#### **Register**
![register](Register.png)

Users without an account can create one here by entering the relevant info.

#### **Homepage**
![homepage](Homepage.png)

The index.html of the site. Will display a list of subforums corresponding to each residence area/apartment complex, each one being a link to that residence's discussion group

#### **Hottest Location**
![hottestlocation](Hottestlocation.png)

A sort of featured location area, can also contain important news and announcements.

#### **Make a post**
![makepost](Makepost.png)

The UI for creating a topic. Examples being "I have a fridge I wanna sell, anyone wanna buy it?"

#### **My profile**
![myprofile](Myprofile.png)

A page that displays settings and info about a users own profile, such as their current displayed name, place of residence, profile picture, etc.

#### **Sign out**
![signout](Signout.png)

A page that confirms whether a user wants to sign out or not.

### Part 2: HTML and CSS

#### **Login**
![loginReal](loginReal.png)

#### **Register**
![registerReal](registerReal.png)

#### **Register**
![MyprofileReal](MyprofileReal.png)

#### **Register**
![HomepageReal](HomepageReal.png)

### Part 3: Breakdown and Division
#### 
  * Juelin Liu: Write the HTML and Javascript for posts page and user_profile page, Using bootstrap to build the top bar for all pages
  * Alex Zhang: Write the HTML for homepage posts and post structure in posts page, part of main.css file
  * Erin(Yuxin) Liu: Write the HTML for register and modify the HTML for profile page and homepage.
