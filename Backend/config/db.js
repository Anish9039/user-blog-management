const mysql = require('mysql2');

//created the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',    // username 
  password: '',       //password
  database: 'blog_app',
});

// pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting connection from pool: ', err);
//     } else {
//       console.log('Connected to MySQL pool!');
//     }
//   });

module.exports = pool;
