const mysql = require('mysql');

const defaultConnectionVars = {
  host     : process.env.MYSQL_HOSTNAME,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
};

console.info({ defaultConnectionVars });

const serverConnection = mysql.createConnection(defaultConnectionVars);

const databaseConnection = mysql.createConnection({
  ...defaultConnectionVars,
  database : process.env.MYSQL_DATABASE
});

const _withConnection = (connection) => {
  return (transaction) => {
    connection.connect((error) => {
      if (error) {
        throw error;
      }

      console.log('connected as id ' + connection.threadId);
    });

    transaction(connection);

    connection.end()
  };
};

module.exports = {
  withServerConnection: _withConnection(serverConnection),
  withDatabaseConnection: _withConnection(databaseConnection)
};