'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_books', (table) => {
    table.increments();
    table
      .integer('book_id')
      .notNullable()
      .references('id')
      .inTable('books')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_books');
};