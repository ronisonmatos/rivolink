"use strict";
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone_number").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.date("date_of_birth").notNullable();
    table.string("role_type").notNullable();
    table.boolean("is_enabled").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};