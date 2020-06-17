// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'suporte',
      user : 'glpi',
      password : 'phi@2020',
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
