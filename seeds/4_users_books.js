'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_books').del()
    .then(function () {
      return knex('users_books').insert([{
        id: 1,
        book_id: 1,
        user_id: 1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    });
};
