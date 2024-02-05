const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5800;

mongoose
	.connect(
		'mongodb+srv://ineedadmin:ineedpassword@cluster0.pmjwpba.mongodb.net/posservice?retryWrites=true&w=majority'
		// you can change your mongourl in here
	)
	.then((result) => {
		console.log('Db connnected - POS Service');
		app.listen(PORT, () => {
			console.log(
				'Up and running! -- This is our POS service at PORT',
				PORT
			);
		});
	});
