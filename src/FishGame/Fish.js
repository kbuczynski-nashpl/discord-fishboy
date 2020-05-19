const db = require('./../../db');
const TABLE_NAME = 'Fish';

class Fish {
	constructor() {
		const fish = db.select('*').from(TABLE_NAME).orderBy('RAND()').limit(1);
		fish.then(rows => {
			this.name = rows[0].name;
			this.maxWeight = rows[0].max_weight;
			this.minWeight = rows[0].min_wieght;
			this.rarity = rows[0].rarity;
			this.weight = Math.floor(Math.random() * this.maxWeight) + this.minWeight;
		});
	}

	catchChance() {
		const baseChance = process.env.CATCH_CHANCE;

		return (baseChance * this.rarity) / 100;
	}
}

module.exports = Fish;