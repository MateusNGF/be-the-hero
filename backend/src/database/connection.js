const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);
console.log("Consulta ao banco realizada " + new Date().toDateString())

module.exports = connection