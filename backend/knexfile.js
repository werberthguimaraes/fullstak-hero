// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:123@localhost:5432/oministack',
    searchPath: ['knex', 'public'],
    migrations : {
      directory : './src/migrations/'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      database: 'oministack',
      user:     'postgres',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory : './src/migrate',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
