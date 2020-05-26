exports.up = (knex) => {
	return knex.schema
		.createTable('discord_users', (table) => {
			table.increments('id');
			table.string('username').notNullable();
			table.string('discord_user_id').notNullable();
			table.string('server_id').notNullable();
			table.string('avatar').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('discord_users');
};
