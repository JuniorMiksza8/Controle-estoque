// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '10.0.0.105',
      user : 'root',
      password : '',
      database : 'ferramentaria'
    },
    migrations:{
      directory : './src/database/migrations'
    },
    useNullAsDefault : true
  },

  staging: {
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
