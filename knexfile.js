// Update with your config settings.
require('dotenv').config();
const path = require('path');

module.exports = {
	development: {
		client: process.env.DB_CLIENT,
		useNullAsDefault: true,
		connection: {
			filename: path.resolve(__dirname, process.env.DB_FILE),
		},
	},
};