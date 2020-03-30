const path = require('path');
const fs = require('fs');

const {
  withServerConnection,
  withDatabaseConnection
} = require('./connection');

const runMigrations = () => {
  const migrationsPath = path.join(__dirname, 'migrations');

  fs.readdir(migrationsPath, {}, (error, migrationFiles) => {
    if (error) {
      throw error;
    }

    const migrations = migrationFiles.map((migration) => {
      const migrationPath = path.join(__dirname, 'migrations', migration);
      const { rawSql, useDatabase = true } = require(migrationPath);

      return { rawSql, useDatabase, migration };
    });

    // Takes a list of migrations, which are objects composed of `rawSql` string and
    // `migration` name. Returns a new function that takes in a connection. This will
    // likely be a connection to the server or a specific database.
    const runMigrationsWithQuery = (migrations) => {
      return (connection) => {
        migrations.forEach(({ rawSql, migration }) => {
          console.info(`Running migration '${migration}'`);

          connection.query(rawSql, (error, results, fields) => {
            if (error) {
              console.info({ rawSql })
              
              throw error;
            }

            console.info(`Successfully ran '${migration}`);
            console.info({ results, fields });
          });
        });
      };
    };

    // Raw SQL Queries to create databases
    withServerConnection(runMigrationsWithQuery(
      migrations.filter(({ useDatabase }) => !useDatabase)
    ));

    // Run Raw SQL Queries to create tables
    withDatabaseConnection(runMigrationsWithQuery(
      migrations.filter(({ useDatabase }) => useDatabase)
    ));
  });
};

runMigrations();