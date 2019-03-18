const handleRegister = (req, res, db, bcrypt) => { //This is for the user registering new account.
	const { email, name, password } = req.body; //Use destructuring to get data from user.
	const hash = bcrypt.hashSync(password);
	// bcrypt.hash(password, null, null, function(err, hash) { //Bcrypt hashes the user's password.
	// 	console.log(hash);
	// })

	db.transaction(trx => { //Inserts into the login table.
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => { //Inserts into the users email.
			return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit) //Commit these changes to the database.
		.catch(trx.rollback) //If anything fails, rollback.
	})

		
		.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister: handleRegister
};
