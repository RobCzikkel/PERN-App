
const Pool  = require('pg-pool');
require('dotenv').config()
 
// Production stage configuration ----------------------------------------------------------------------------------------------------------------------------------------------------------
// // This is needed for Heroku as it changes the env variable to production when deploying

// const isProduction = process.env.NODE_ENV === 'production';

// // We use this method instead of the object method below
// const connectionString = `postgresql://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
// const pool = new Pool({
// 	connectionString:  isProduction ? process.env.DATABASE_URL : connectionString, //Heroku addon will provide with a string called DATABASE_URL
//     ssl: {
//         rejectUnauthorized: false
//         }
// });



// Development stage configuration  ----------------------------------------------------------------------------------------------------------------------------------------------------------
const devConfig = {
    user: process.env.DB_ADMIN,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false
}

const pool = new Pool(devConfig)

module.exports = {
    pool
}