const TABLE_NAME = 'Fish';
const db = require('../db');
const fs = require('fs');
const path = require('path');

const Logger = require('./../src/Logger');
const logger = new Logger();

const jsonPath = path.resolve(__dirname, 'json/fish.json');

const json = fs.readFileSync(jsonPath);
const fish = JSON.parse(json);

fish.forEach((entry) => {
	db.insert(
		{
			name: entry.name,
			max_length: entry.max_lenght,
			min_length: entry.max_lenght,
			rarity: entry.rarity,
		},
	).into(TABLE_NAME).then(rows => {
		console.info(rows[0]);
	}).catch(err => {
		logger.log('error', err.toString());
	});
});