exports.up = (knex) => {
	return knex.schema
		.createTable('discord_servers', (table) => {
			table.increments('id');
			table.integer('server_id').notNullable();
			table.string('server_name').notNullable();
			table.integer('server_members_no').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('discord_servers');
};

exports.config = { transaction: false };