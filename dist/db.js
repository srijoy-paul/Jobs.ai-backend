require('dotenv').config();
const Pool = require('pg').Pool;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
// console.log("dbuser", DB_USERNAME);
// console.log("dbpass", DB_PASSWORD);
const pool = new Pool({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "jobsboarddb"
});
module.exports = pool;
//# sourceMappingURL=db.js.map