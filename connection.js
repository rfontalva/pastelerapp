/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql2');
const secret = require('./secret.json');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: secret.user,
  password: secret.password,
  database: 'pastelerapp',
});

const queryDB = util.promisify(connection.query).bind(connection);
export default async function execSql(query) {
  try {
    const results = await queryDB(query);
    return results;
  } catch (err) {
    throw new Error(err);
  }
}
