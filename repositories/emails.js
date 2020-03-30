const { withDatabaseConnection } = require('../database/connection');

module.exports = {
  createEmail({ emailAddress }) {
    withDatabaseConnection(connection => {
      const emailSet = { value: emailAddress };

      connection.query('SELECT value FROM emails WHERE value = ?', emailAddress, (error, results, fields) => {
        if (results.length) {
          throw `The provided email address already exists '${emailAddress}'`;
        }
      });

      connection.query('INSERT INTO emails SET ?', emailSet, (error, results, fields) => {
        if (error) {
          throw error;
        }
        
        console.info({
          results,
          fields
        });
      });
    });
  },
  deleteEmail({ emailAddress }) {
    
  }
};