const mysql = require('mysql');

const defaultConnectionVars = {
  connectionLimit: 10,
  host           : process.env.MYSQL_HOSTNAME,
  user           : process.env.MYSQL_USERNAME,
  password       : process.env.MYSQL_PASSWORD,
};

const serverPool = mysql.createPool(defaultConnectionVars);

const databasePool = mysql.createPool({
  ...defaultConnectionVars,
  database : process.env.MYSQL_DATABASE
});

const _withConnection = (pool) => {
  return (transaction) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        console.log('connected as id ' + connection.threadId);
        
        if (error) {
          throw error;
        }

        transaction(connection, resolve, reject);

        connection.release();
      });
    });
  };
};

module.exports = {
  withServerConnection: _withConnection(serverPool),
  withDatabaseConnection: _withConnection(databasePool)
};