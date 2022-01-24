// Connexion à la base de donnée postgreSql
const Pool = require('pg').Pool;
const dotenv = require('dotenv');
const result = dotenv.config({ path: './.env' });

/**
 * Connexion à la base de donnée postgreSql
 * @function
 * @param {string} user - Le nom de l'utilisateur
 * @param {string} password - Le mot de passe de la base de donnée
 * @param {string} host - Le serveur
 * @param {int} port - Le port sur laquelle est lancée la base de donnée
 * @param {string} database - Le nom de la base de donnée
 */

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})

module.exports = pool;