// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PROD_DB_HOST || 'default_host', // Replace 'default_host' with your production DB host if not using an environment variable
      database: process.env.PROD_DB_DATABASE || 'my_db',
      user: process.env.PROD_DB_USER || 'username',
      password: process.env.PROD_DB_PASSWORD || 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};