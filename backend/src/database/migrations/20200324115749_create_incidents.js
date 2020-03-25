const table_name = 'incidents'

exports.up = function (knex) {
    return knex.schema.createTable(table_name, function (table) {
        table.increments(); // id autoincrement

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        // chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable(table_name);
};
