const config =  require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DEVELOPMENT_DATABASE_HOST || config.DEVELOPMENT_DATABASE_HOST,
      user: process.env.DEVELOPMENT_DATABASE_USER || config.DEVELOPMENT_DATABASE_USER,
      password: process.env.DEVELOPMENT_DATABASE_PASSWORD || config.DEVELOPMENT_DATABASE_PASSWORD,
      database: process.env.DEVELOPMENT_DATABASE_NAME || config.DEVELOPMENT_DATABASE_NAME
    },
    pool: {
      min: 10,
      max: 50
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


  testing: {
    client: 'mysql',
    debug: false
},


  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
