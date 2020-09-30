import * as pg from 'pg';

const host = process.env.VUE_APP_DB_POSTGRES_HOST;
const port = process.env.VUE_APP_DB_POSTGRES_PORT || 5432;
const username = process.env.VUE_APP_DB_POSTGRES_USER;
const password = process.env.VUE_APP_DB_POSTGRES_PASS;
const database = process.env.VUE_APP_DB_POSTGRES_DATABASE;

const isDev = process.env.NODE_ENV === 'development';

export default {
  dialect: 'postgres',
  dialectModule: pg,
  host,
  port,
  username,
  password,
  database,
  define: {
    timestamps: false,
    underscored: false,
    underscoredAll: false,
  },
  // disable SQL Query logs in console
  logging: isDev ? console.log : false,
};
