const { withConnection } = require('../database/connection');

module.exports = {
  createEmail({ emailAddress }) {
    withConnection(connection => {
      const emailSet = { value: emailAddress };

      connection.query('SELECT value FROM emails WHERE value = ?', emailAddress, (errors, results, fields) => {
        if (results.length) {
          throw `The provided email address already exists. (${emailAddress})`;
        }
      })

      connection.query('INSERT INTO emails SET ?', emailSet, (errors, results, fields) => {
        console.log({
          errors,
          results,
          fields
        });
      });
    });
  },
  deleteEmail({ emailAddress }) {
    
  }
};