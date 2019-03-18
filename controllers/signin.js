//const handleSignIn = (req, res, db, bcrypt) => { //This is for the user signing in to account.
const handleSignIn = (db, bcrypt) => (req, res) => { //This is for the user signing in to account.
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			//console.log(data[0]);
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			//console.log(isValid);

			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						//console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials') //Wrong password.	
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignIn: handleSignIn
};
