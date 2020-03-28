const mysql = require('mysql');

const vars = {
  host     : process.env.MYSQL_HOSTNAME,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
}

console.log({ vars })
const connection = mysql.createConnection(vars);

const withConnection = (transaction) => {
  connection.connect((err) => {
    if (err) {
      console.log({ err });
    }

    console.log('connected as id ' + connection.threadId);
  });

  transaction(connection);

  connection.end()
};

module.exports = { withConnection };