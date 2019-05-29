
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    // id: primary key
    tbl.increments()
    // name: text, required
    tbl.string('name', 128).notNullable()
    // created_at and updated_at fields
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
