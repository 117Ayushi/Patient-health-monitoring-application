import knex from 'knex';
import bookshelf from 'bookshelf';

import knexConfig from './knexfile';
import config from './config';

const env = process.env.RUNNING_ENV || config.RUNNING_ENV

let ORM = bookshelf(knex(knexConfig[env]));
  ORM.plugin('bookshelf-page');



export default ORM
