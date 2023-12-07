const mysql = require('mysql2');
const pool = mysql.createPool({
    // database config
});
module.exports = pool.promise();