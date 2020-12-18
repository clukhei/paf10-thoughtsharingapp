require('dotenv').config()
const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: process.env.MYSQL_SERVER,
	port: process.env.MYSQL_SVR_PORT,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_SCHEMA,
	connectionLimit: process.env.MYSQL_CON_LIMIT,
})

const sqlStatement = {
 
    matchUserPass: "select * from paf2020.user where user_id = ?"
}

const makeQuery = (sqlQuery, pool) => {
    return async (args) => {
        console.log(args)
        const conn = await pool.getConnection();
        try {
            let results = await conn.query(sqlQuery, args || []);
            return results[0];
        } catch (e) {
            console.log(e);
        } finally {
            conn.release();
        }
    };
};

const sqlQuery = {
    matchUserPass: makeQuery(sqlStatement.matchUserPass, pool)
}

module.exports = {sqlQuery, sqlStatement, pool}