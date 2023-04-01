import knex from 'knex';
import knexTinyLogger from 'knex-tiny-logger';
const knexStringcase = require('knex-stringcase');
import config from './knexfile';

const options = knexStringcase(config);
const knexInstance = knex(options);

// TODO
// enable loader by env
knexTinyLogger(knexInstance);

export default knexInstance;
