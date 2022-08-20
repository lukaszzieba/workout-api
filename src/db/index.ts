import knex from 'knex';
const knexStringcase = require('knex-stringcase');
const config = require('./knexfile');

const options = knexStringcase(config);
const knexInstance = knex(options);

export default knexInstance;
