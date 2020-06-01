const db = require('./../../db');

const TABLE_NAME = 'discord_servers';

/**
 * A class to handle Discord Server data and populate database with information.
 */
class DiscordServerHandler {

	/**
     * Build Database or return exsisting entry.
     *
     * @param guild
     * @returns {Promise<void>}
     */
	async build(guild) {
		let server = await db.select('*')
			.from(TABLE_NAME)
			.where('server_id', guild.id)
			.limit(1);

		if (Array.isArray(server) && server.lenght < 1) {
			server = await db.insert(
				{
					server_id: guild.id,
					server_name: guild.name,
					server_members_no: guild.memberCount,
				},
			).table(TABLE_NAME);
		}

		server = server[0];

		this.serverId = server.server_id;
		this.serverName = server.server_name;
		this.serverMemberNo = server.server_members_no;
	}

	/**
     * Return Server Object data in a plain object form
	 *
     * @returns {Promise<{}>}
     */
	async getServer() {
		const serverObject = {};
		serverObject.serverId = this.serverId;
		serverObject.serverName = this.serverName;
		serverObject.serverMemberNo = this.serverMemberNo;

		return serverObject;
	}

	/**
     * Return Server ID
     *
     * @returns {Promise<void>}
     */
	async getServerId() {
		return this.serverId;
	}
}

module.exports = DiscordServerHandler;