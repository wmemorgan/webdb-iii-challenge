
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Mike'},
        {cohort_id: 2, name: 'Carol'},
        {cohort_id: 3, name: 'Greg'},
        {cohort_id: 4, name: 'Marcia'},
        {cohort_id: 1, name: 'Peter'},
        {cohort_id: 4, name: 'Jan'},
        {cohort_id: 2, name: 'Bobby'},
        {cohort_id: 3, name: 'Cindy'},
      ]);
    });
};
