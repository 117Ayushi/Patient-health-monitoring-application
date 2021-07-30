
exports.up = function(knex, Promise) {
  return knex.schema.createTable('temperature_record', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
    table.integer('temperature').notNullable();
    table.string('patient_condition').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('temperature_record');
};
