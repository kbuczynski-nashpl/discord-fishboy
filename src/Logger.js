'use strict';
const winston = require('winston');

class Logger {
	constructor() {
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			defaultMeta: { service: 'user-service' },
			transports: [
				new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
				new winston.transports.File({ filename: 'logs/combined.log' }),
			],
		});
	}

	log(level, msg) {
		this.logger.log(level, msg);
	}
}

module.exports = Logger;