const pg = require("pg")
require("dotenv").config()

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

if (!pool) {
    console.log("Connection to database failed!")
} else {
    console.log("Connection to database was successful!")
}

module.exports = pool;