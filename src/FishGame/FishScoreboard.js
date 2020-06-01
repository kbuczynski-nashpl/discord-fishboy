const db = require('./../../db');
const TABLE_NAME = 'fish_user_scoreboard';

/**
 * A fish scoreboard class
 */
class FishScoreboard {

	/**
	 * Build an object from the Database entry.
	 *
	 * @param userId
	 * @returns {Promise<void>}
	 */
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

	/**
	 * Update scorebaord.
	 *
	 * @param score
	 * @returns {Promise<void>}
	 */
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

	/**
	 * Get total points
	 *
	 * @returns {Promise<number>}
	 */
	async getUserTotal() {
		return this.points;
	}

	/**
	 * Return top 5 entries for the server on the scoreboard.
	 *
	 * @param serverId
	 * @returns {Promise<string>}
	 */
	async getScoreboard(serverId) {
		const scoreboard = await db.select('*')
			.from(TABLE_NAME)
			.join('discord_users', 'user_id', '=', 'discord_users.id')
			.where('server_id', serverId);

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