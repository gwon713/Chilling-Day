const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../env/server.env') });//env 로드 모듈

exports.env = {
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
}