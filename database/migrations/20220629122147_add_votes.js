function up(knex) {
  return knex.schema
    .createTable("votes", (table) => {
      table.increments("id"),
        table.integer("user_id").notNullable(),
        table.foreign("user_id").references("users.id"),
        table.integer("comment_id").notNullable(),
        table.foreign("comment_id").references("comments.id"),
        table.unique(["user_id", "comment_id"]),
        table.string("type").notNullable(),
        table.timestamps(true, true);
    })
    .alterTable("comments", (table) => {
      table.integer("upvotes").defaultTo(0),
        table.integer("downvotes").defaultTo(0);
    })
    .then(() => {
      knex("comments").update({ upvotes: 0, downvotes: 0 });
    });
}

function down(knex) {
  return knex.schema.dropTable("votes").alterTable("comments", (table) => {
    table.dropColumn("upvotes"), table.dropColumn("downvotes");
  });
}

export { up, down };
