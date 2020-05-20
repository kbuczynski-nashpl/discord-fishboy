const db = require('./../../db');
const TABLE_NAME = 'Fish';
const Logger = require('./../Logger');
const logger = new Logger();

class Fish {
	async generateFish() {
		const fish = await db.select('*').from(TABLE_NAME).whereRaw(`id = abs(random()) % (SELECT max(id) FROM ${TABLE_NAME}) + 1`).limit(1);
		const row = fish[0];

		this.name = row.name;
		this.maxLength = row.max_length;
		this.minLength = row.min_length;
		this.rarity = row.rarity;
		this.length = Math.floor(Math.random() * this.maxLength) + this.minLength;
	}

	async returnFish() {
		const fishObject = {};
		fishObject.name = this.name;
		fishObject.maxLength = this.maxLength;
		fishObject.minLength = this.minLength;
		fishObject.rarity = this.rarity;

		return fishObject;
	}

	catchChance() {
		const baseChance = process.env.CATCH_CHANCE;

		return (baseChance * this.rarity) / 100;
	}
}

module.exports = Fish;