const db = require('./../../db');

const TABLE_NAME = 'discord_users';

/**
 * A class to handle Discord User information
 */
class DiscordUserHandler {

    /**
     * Builds a database entry from the api call or reuses exciting entry to build the object.
     *
     * @param discordUser
     * @param discordServerId
     * @returns {Promise<void>}
     */
    async build(discordUser, discordServerId) {
        let user = await db.select('*')
                           .from(TABLE_NAME)
                           .where('server_id', discordServerId)
                           .andWhere('discord_user_id', discordUser.id)
                           .limit(1);

        if (user.length < 1) {
            user = await db.insert(
                {
                    username:        discordUser.username,
                    discord_user_id: discordUser.id,
                    server_id:       discordServerId,
                    avatar:          discordUser.avatar,
                },
            )
                           .table(TABLE_NAME);
        }

        user = user[0];

        this.id              = user.id;
        this.username        = user.username;
        this.discord_user_id = user.id;
        this.server_id       = discordServerId;
        this.avatar          = user.avatar;
    }

    /**
     * Return user in a plain object
     *
     * @returns {Promise<{}>}
     */
    async returnUser() {
        const user           = {};
        user.id              = this.id;
        user.username        = this.username;
        user.discord_user_id = this.discord_user_id;
        user.server_id       = this.server_id;
        user.avatar          = this.avatar;

        return user;
    }

    /**
     * Get All users for the game
     *
     * @returns {Promise<string>}
     */
    async getServerUsers() {
       const users = await db.select('*')
                 .from(TABLE_NAME)
                 .where('server_id', this.server_id);

        let returnBoard = '';

        for (const user of users) {
            returnBoard += `${user.username}\n`;
        }

        return returnBoard;
    }

    /**
     * Return user ID
     *
     * @returns {Promise<void>}
     */
    async returnUserId() {
        return this.id;
    }

}

module.exports = DiscordUserHandler;