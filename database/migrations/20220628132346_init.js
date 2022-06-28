function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id"),
        table.string("fname", 50).notNullable(),
        table.string("sname", 50).notNullable(),
        table.string("display_picture", 1000).notNullable(),
        table.timestamps(true, true);
    })
    .createTable("comments", (table) => {
      table.increments("id"),
        table.integer("user_id").notNullable(),
        table.foreign("user_id").references("users.id"),
        table.string("content", 1000).notNullable(),
        table.integer("parent").defaultTo(-1),
        table.timestamps(true, true);
    });
}

function down(knex) {
  return knex.schema.dropTable("comments").dropTable("users");
}

export { up, down };
