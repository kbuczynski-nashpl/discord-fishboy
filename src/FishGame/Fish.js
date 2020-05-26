const db = require('./../../db');
const FishScoreboard = require('./FishScoreboard');

const TABLE_NAME = 'fish';

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

	async catchChance() {
		const baseChance = process.env.CATCH_CHANCE;

		return (baseChance * this.rarity) / 100;
	}

	async catch(userId) {
		const successChance = process.env.SUCCESS_NUMBER;
		const chance = await this.catchChance();
		const multiplayer = 0.5;
		const baseTry = Math.floor(Math.random() * chance) + this.rarity;
		const actualTry = baseTry * multiplayer;

		let outcome = false;

		if (actualTry > successChance) outcome = true;
		if (actualTry <= successChance) return false;
		if (outcome === false) return false;

		const pointMultiplayer = process.env.POINT_MULTIPLAYER;
		const points = Math.ceil(this.length * pointMultiplayer) * 100;

		const fishScoreboard = new FishScoreboard();
		await fishScoreboard.build(userId);
		await fishScoreboard.update(points);

		return await fishScoreboard.getScoreboard();
	}
}

module.exports = Fish;