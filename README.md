# Auth for Newbs

Add JWT-based authentication to a Node/Express/Mongo app.

## Authentication
* [x] Create Server
* [x] Add auth router
* [ ] Create user with POST /auth/signup
  * [ ] Validate required fields
  * [ ] Check if email is unique
  * [ ] Hash password with bcrypt
  * [ ] Insert into db
* [ ] Login user with POST /auth/login
  * [ ] Check if email in db
    * [ ] Compare password with hashed password in db
    * [ ] Create and sign a JWT
      * [ ] Respond with JWT
* [ ] Create login form; show errors; redirect
  * [ ] Validate required fields
* [ ] Create sign up form; show errors; redirect
  * [ ] Validate required fields

### Authorization
* [ ] Visitors can only see the homepage
  * [ ] isLoggedIn middleware
    * [ ] Validate JWT in header
      * [ ] set req.user to be JWT payload
    * [ ] send an unauthorized error message
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