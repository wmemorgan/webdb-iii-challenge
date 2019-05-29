
exports.up = function (knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    // id: primary key
    tbl.increments()
    // name: text, required
    tbl.string('name', 128).notNullable()
    // cohort_id: foreign key
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    // created_at and updated_at fields
    tbl.timestamps(true, true)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
