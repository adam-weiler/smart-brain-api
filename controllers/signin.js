//const handleSignIn = (req, res, db, bcrypt) => { //This is for the user signing in to account. //Basic
const handleSignIn = (db, bcrypt) => (req, res) => { //This is for the user signing in to account. //Advanced
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}

	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			//console.log(data[0]);
			const isValid = bcrypt.compareSync(password, data[0].hash);
			//console.log(isValid);

			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
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