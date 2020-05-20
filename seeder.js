'use strict';

require('dotenv').config();

const fs = require('fs');

const Logger = require('./src/Logger');

const logger = new Logger();

fs.readdir('./seeds', (err, files) => {
	if (err) logger.log('error', err.toString());

	const jsFile = files.filter(f => f.split('.').pop() === 'js');

	if (jsFile <= 0) logger.log('error', 'seeds not found');

	jsFile.forEach((file) => {
		require(`./seeds/${file}`);
	});
});

console.info('Done !');