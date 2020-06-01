const db = require('./../../db');
const TABLE_NAME = 'fish_user_scoreboard';

class FishScoreboard {
	async build(userId) {
		let userScoreboard = await db.select('*')
			.from(TABLE_NAME)
			.where('user_id', userId);

		if (Array.isArray(userScoreboard) && (userScoreboard === undefined || userScoreboard.length == 0)) {
			this.userId = userId;
			this.points = 0;
			return;
		}

		userScoreboard = userScoreboard[0];

		this.userId = userScoreboard.user_id;
		this.points = userScoreboard.points;
	}

	async update(score) {
		let currentScore = await db.select('*').from(TABLE_NAME).where('user_id', this.userId);

		if (Array.isArray(currentScore) && (currentScore === undefined || currentScore.length == 0)) {
			await db.insert({
				user_id: this.userId,
				points: score,
			}).table(TABLE_NAME);

			this.points = score;

			return;
		}

		currentScore = currentScore[0];
		currentScore.points = currentScore.points + score;

		await db.update(currentScore).where('user_id', this.userId).from(TABLE_NAME);

		this.points += score;
	}

	async getUserTotal() {
		return this.points;
	}

	async getScoreboard() {
		const scoreboard = await db.select('*')
			.from(TABLE_NAME)
			.join('discord_users', 'user_id', '=', 'discord_users.id');

		scoreboard.sort((a, b) => parseFloat(a.points) - parseFloat(b.points));

		let counter = 1;

		let returnBoard = '';
		for (const entry of scoreboard) {
			returnBoard += `${counter}) ${entry.username} ${entry.points}pts\n`;

			if (counter >= 4) {
				break;
			}
			counter++;
		}

		return returnBoard;

	}
}

module.exports = FishScoreboard;