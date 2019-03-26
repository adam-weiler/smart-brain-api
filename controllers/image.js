const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: '6339999d110d46e0b81686c3875fa90a'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(
		Clarifai.FACE_DETECT_MODEL,
		    req.body.input
		)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

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
	handleImage: handleImage,
	handleApiCall: handleApiCall
};