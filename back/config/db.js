const mysql = require('mysql');
const { env } = require('./config/env');

const connection = { //database 접속 정보 입력
    host: env.database.host,
    user: env.database.username,
    password: env.database.password,
    port: env.database.port,
    database: env.database.database,
    timeout: 10000
};
  
module.exports = mysql.createPool(connection);