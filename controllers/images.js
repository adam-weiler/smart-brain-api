const handleImage = (req, res, db) => { //Add one to users rank.
	const { id } = req.body; //Use destructuring to get data from user.

	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage
};
