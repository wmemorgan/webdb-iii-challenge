
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'WEBPT4'},
        {name: 'DSPT1'},
        {name: 'CS18'},
        {name: 'UX1'}
      ]);
    });
};
