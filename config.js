const APP = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: 3000,
};
const POSTGRES = {
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT,
  DATABASE: process.env.POSTGRES_DATABASE,
};

export { APP, POSTGRES };
