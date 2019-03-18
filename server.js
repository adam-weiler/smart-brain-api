const express = require('express');
const bodyParser = require('body-parser'); //To parse data sent from the browser through POST.
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

//console.log(db.select("*").from('users'));

db.select("*").from('users').then(data => {
	console.log(data)
})

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	//res.send('This is working!!');
	res.send(database.users);
})

//app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) }); //This is for the user signing in to account. //Basic
app.post('/signin', signin.handleSignIn(db, bcrypt)); //This is for the user signing in to account. //Advanced

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }); //This is for the user registering new account.

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) }); //This shows the user their profile page.

app.put('/image', (req, res) => { image.handleImage(req, res, db) }); //Use destructuring to get data from user.

app.listen(3000, ()=> {
	console.log("It's running on port 3000!")
})

/*
/ ---> response = this is working
/signin ---> POST request = success or fail 	-- An old user has signed in.
/register ---> POST request = return new user object 	-- A new user has registered.
/profile/:userId ---> GET = user 	-- Show the user profile by their id.
/image ---> PUT --> user 	-- Updates the count of who has the highest ranking.
*/
