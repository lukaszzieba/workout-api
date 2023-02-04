import knex from 'knex';
const knexStringcase = require('knex-stringcase');
import config from './knexfile';

const options = knexStringcase(config);
const knexInstance = knex(options);

export default knexInstance;
