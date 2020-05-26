const db = require('./../../db');

const TABLE_NAME = 'discord_users';

class DiscordUserHandler {

	async build(discordUser, discordServerId) {
		let user = await db.select('*')
			.from(TABLE_NAME)
			.where('server_id', discordServerId)
			.andWhere('discord_user_id', discordUser.id)
			.limit(1);

		if (Array.isArray(user) && user.length < 1) {
		   user = await db.insert(
				{
					username: discordUser.username,
					discord_user_id: discordUser.id,
					server_id: discordServerId,
					avatar: discordUser.avatar,
				},
			).table(TABLE_NAME);
		}

		user = user[0];

		this.username = user.username;
		this.discord_user_id = user.id;
		this.server_id = discordServerId;
		this.avatar = user.avatar;
	}

	async returnUser() {
		const user = {};
		user.username = this.username;
		user.discord_user_id = this.discord_user_id;
		user.server_id = this.server_id;
		user.avatar = this.avatar;

		return user;
	}

}

module.exports = DiscordUserHandler;