exports.up = function(knex, Promise) {
    return knex.schema.createTable('seizure_record', function(table) {
      table.increments('id');
      table.string('patient_mobile').notNullable();
      table.string('patient_condition').notNullable();
      table.integer('test_duration').notNullable();
      table.timestamp('date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('seizure_record');
  };