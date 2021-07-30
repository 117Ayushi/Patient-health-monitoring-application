
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ecg_record', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('user_id').notNullable();
    table.integer('heart_rate').notNullable();
    table.string('patient_condition').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now());
    table.string('img_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ecg_record');
};
