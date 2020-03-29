module.exports = {
  rawSql: `
    CREATE TABLE IF NOT EXISTS emails (
      email_id INT AUTO_INCREMENT PRIMARY KEY,
      value VARCHAR(255) NOT NULL UNIQUE,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `
};