const sql = require('mssql');

const config = {
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER, // You can use 'localhost\\instance' to connect to named instance
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: false
  }
};

const db = {

  query: async (query) => {
    const connectionPool = await sql.connect(config);

    return connectionPool.query(query);
  }
};

module.exports = db;