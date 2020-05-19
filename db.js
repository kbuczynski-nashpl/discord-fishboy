const path = require('path');

module.exports = require('knex')({
	client: process.env.DB_CLIENT,
	useNullAsDefault: true,
	connection: {
		filename: path.resolve(__dirname, process.env.DB_FILE),
	},
});