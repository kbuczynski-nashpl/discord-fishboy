exports.up = (knex) => {
	return knex.schema
		.createTable('fish', (table) => {
			table.increments('id');
			table.string('name').notNullable();
			table.integer('max_length').notNullable();
			table.integer('min_length').notNullable();
			table.integer('rarity').notNullable();
		});
};

exports.down = (knex) => {
	return knex.schema
		.dropTable('fish');
};
