const db = require('./../../db');
const TABLE_NAME = 'fish_user_scoreboard';

class FishScoreboard {
	async build(userId) {
		let userScoreboard = await db.select('*')
			.from(TABLE_NAME)
			.where('user_id', userId);

		if (Array.isArray(userScoreboard) && userScoreboard.lenght < 1) {
			this.userId = userId;
			this.points = 0;

			return;
		}

		userScoreboard = userScoreboard[0];

		this.userId = userScoreboard.user_id;
		this.points = userScoreboard.points;
	}

	async update(score) {
		let currentScore = await db.select('*').from(TABLE_NAME).where('user_id', userId);

		if (Array.isArray(currentScore) && currentScore.lenght < 1) {
			await db.insert({
				user_id: this.userId,
				points: score,
			}).table(TABLE_NAME);

			this.userId = this.userId;
			this.points = score;

			return;
		}

		currentScore = currentScore[0];
		currentScore.points = currentScore.points + score;

		await db.update(currentScore).where('user_id', this.userId).from(TABLE_NAME);

		this.points += score;
	}

	async getScoreboard() {
		return db.select('*').from(TABLE_NAME);
	}
}

module.exports = FishScoreboard;