module.exports = {
  useDatabase: false,
  rawSql: `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
};