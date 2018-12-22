# Auth for Newbs

Add JWT-based authentication to a Node/Express/Mongo app.

## Authentication
* [x] Create Server
* [x] Add auth router
* [x] Create user with POST /auth/signup
  * [x] Validate required fields
  * [x] Check if username is unique
  * [x] Hash password with bcrypt
  * [x] Insert into db
* [x] Create Landing Page
  * [x] Link to Sign Up Page
* [x] Create Sign Up Page
  * [x] Form with: username and password
  * [x] When form is submitted
    * [x] Validate username
      * [x] Display errors
    * [x] Validate password
      * [x] Display errors
    * [x] POST request to server
      * [x] Display errors
      * [x] If succesful sign up
        * [x] Redirect to login page
* [ ] Login user with POST /auth/login
  * [x] Check if email in db
    * [x] Compare password with hashed password in db
      * [ ] rate limiting
    * [x] Create and sign a JWT
      * [x] Respond with JWT
* [x] Create Login Page
  * [x] Form with: username and password
  * [x] When form is submitted
    * [x] Validate username
      * [x] Display errors
    * [x] Validate password
      * [x] Display errors
    * [ ] POST request to server /auth/login
      * [x] Display errors
      * [x] If succesful login
        * [x] Store the token in localStorage
        * [x] Redirect to the "dashboard"
* [x] If a logged in user visits the signup or login page, redirect them to the dashboard
* [x] If a non logged in user visits the dashboard, redirect to the login page
* [x] After sign up, immediately login
* [x] Show username on dashboard
* [ ] On homepage, show got to dashboard button instead of signup/login button
* [ ] Have one protected route on the backend...
  * [ ] ONLY logged in users can request this route

### Authorization
* [ ] Visitors can only see the homepage
  * [ ] checkTokenSetUser middleware
    * [ ] get token from Authorization header
      * [ ] if defined ---
        * [ ] Verify token with the token secret
        * [ ] Set req.user to be the decoded verified payload
      * [ ] else - move along
  * [ ] isLoggedIn middleware
    * [ ] if req.user is set - move along
    * [ ] else - send an unauthorized error message
  * [ ] redirect to login form
* [ ] Logged in users can only see their page
  * [ ] allowAccess middleware
    * [ ] id in url must match id in req.user
    * [ ] send an unauthorized error message
  * [ ] redirect to user page if they visit the homepage
    * [ ] set user_id in localStorage after login/signup
* [ ] Add GET /auth/logout to clear user_id cookie
  * [ ] redirect to login page

## STRETCH

## Admin Page
* [ ] Admin page that lists all users
  * [ ] admin table with user_id
  * [ ] de-activate users
* [ ] Admin can see any page on site
* [ ] Rate limiting
  * [ ] Prevent brute force logins
  * [ ] Lock out account after too many login attempts
* [ ] Password strength meter!
* [ ] reCaptcha for signup/login
* [ ] Testing...