const { withDatabaseConnection } = require('../database/connection');

module.exports = {
  createSubscription({ email }) {
    return withDatabaseConnection((connection, resolve, reject) => {
      connection.query('SELECT value FROM emails WHERE value = ?', email, (error, result) => {
        if (result && result.length) {
          reject(`The provided email address already exists '${email}'`);
        }
      });

      const emailSet = { value: email };
      connection.query('INSERT INTO emails SET ?', emailSet, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve({ email })
      });
    });
  }
};