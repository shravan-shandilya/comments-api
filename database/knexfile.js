import { POSTGRES } from "../config.js";

export default {
  client: "postgresql",
  connection: {
    database: POSTGRES.DATABASE,
    user: POSTGRES.USER,
    password: POSTGRES.PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
