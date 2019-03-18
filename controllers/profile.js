const handleProfileGet = (req, res, db) => { //This shows the user their profile page.
	const { id } = req.params; //Use destructuring to get data from user.

	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		//console.log(user[0]);
		//console.log(user);
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('error getting user'))

	// if (!found) { //Loop is finished, user was not found.
	// 	res.status(404).json('No such user.');
	// }
}

module.exports = {
	handleProfileGet: handleProfileGet
};
