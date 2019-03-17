const express = require('express');
const bodyParser = require('body-parser'); //To parse data sent from the browser through POST.
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '456',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.use(bodyParser.json());
app.use(cors())

app.get('/', (request, response) => {
	//response.send('This is working!!');
	response.send(database.users);
})

app.post('/signin', (request, response) => { //This is for the user signing in.
	// bcrypt.compare("piano", '$2a$10$cfgEwHwR7YLyBrg5Ow9bMeM3uvkMYmcvvYxTQq/1ucVNp.i.z7ySW', function(err, result) {
	// 	console.log("First guess is right.")		
	// })

	// bcrypt.compare("veggies", '$2a$10$cfgEwHwR7YLyBrg5Ow9bMeM3uvkMYmcvvYxTQq/1ucVNp.i.z7ySW', function(err, result) {
	// 	console.log("Second guess is wrong.")	
	// })

	//Checks if the request from the body of browser is same as database.
	if (request.body.email === database.users[0].email &&
		request.body.password === database.users[0].password) {
		response.json(database.users[0]);
		//response.json("Success logging in!");
	} else {
		response.status(400).json('Error logging in.');
	}
})

app.post('/register', (request, response) => { //This is for the user registering new account.
	const { email, name, password } = request.body; //Use destructuring to get data from user.

	// bcrypt.hash(password, null, null, function(err, hash) { //Bcrypt hashes the user's password.
	// 	console.log(hash);
	// })

	database.users.push({ //Add user at end of "database".
		id: '789',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	});
	response.json(database.users[database.users.length-1]); //Last registered user.
});

app.get('/profile/:id', (request, response) => { //This shows the user their profile page.
	const { id } = request.params; //Use destructuring to get data from user.
	let found = false;

	database.users.forEach(users => { //Loop through the database.
		if (users.id === id) { //Check if current iteration id is same as data from user.
			found = true;
			//return response.json(users);
			return res.json(database.users[0]);
		}
	});

	if (!found) { //Loop is finished, user was not found.
		response.status(404).json('No such user.');
	}
});

app.put('/image', (request, response) => { //Add one to users rank.
	const { id } = request.body; //Use destructuring to get data from user.
	let found = false;

	database.users.forEach(user => { //Loop through the database.
		if (user.id === id) { //Check if current iteration id is same as data from user.
			found = true;
			user.entries++;
			return response.json(user.entries);
		}
	});

	if (!found) { //Loop is finished, user was not found.
		response.status(404).json('No such user.');
	}
});

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
