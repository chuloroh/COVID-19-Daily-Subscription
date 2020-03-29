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

    const databaseMigrations = migrations.filter(({ useDatabase }) => !useDatabase);
    const tableMigrations = migrations.filter(({ useDatabase }) => useDatabase);

    withServerConnection((connection) => {
      databaseMigrations.forEach(({ rawSql, migration }) => {
        console.info(`Running migration '${migration}'`);

        console.log({ rawSql })

        connection.query(rawSql, (error, results, fields) => {
          if (error) {
            throw error;
          }

          console.info(`Successfully ran '${migration}`);
          console.info({ results, fields });
        });
      });
    });

    withDatabaseConnection((connection) => {
      tableMigrations.forEach(({ rawSql, migration }) => {
        console.info(`Running migration '${migration}'`);

        console.log({ rawSql })

        connection.query(rawSql, (error, results, fields) => {
          if (error) {
            throw error;
          }

          console.info(`Successfully ran '${migration}`);
          console.info({ results, fields });
        });
      });
    });
  });
};

runMigrations();