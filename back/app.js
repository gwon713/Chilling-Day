const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const { env } = require('./config/env');
const logger = require('./config/winston');
const morganFormat = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
// :method / request에 대한 HTTP method | :url 요청된 URL | :status HTTP 상태 | :response-time 응답시간 | :remote-addr 사용자의 IP 주소 | :http-version HTTP version |

class App {
    constructor(){
        this.app = express();
        this.setExpress();
        this.connectDB();
        this.setMiddleware();
    }
    setExpress(){
        this.app.get('/ping', (req, res)=>{
            logger.info('ping check');
            res.status(200).send('pong');
        })
        this.app.get('/test', (req, res)=>{
            logger.info('test check');
            res.status(200).send('test');
        })
    }
    setRouter(){
        const router = express.Router();
        this.app.use(router);
    }
    connectDB(){
        const connection = mysql.createConnection({ //database 접속 정보 입력
            host: env.database.host,
            user: env.database.username,
            password: env.database.password,
            port: env.database.port,
            database: env.database.database
        });
        connection.connect((err) => { //database 접속
            if(err){
                logger.error(err);
            }else{
                logger.info("MySQL Connect");
            }
        });
        connection.on('error', (err)=>{logger.error('db error', err);});
    }
    connectDBpool(){
        
    }
    setMiddleware(){
        this.app.set("etag", false); // 동적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
        const options = { etag: false};
        this.app.use(express.static("public", options)); // 정적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
        this.app.use(express.json()); //req.body parsing 설정
        this.app.use(express.urlencoded({extended: false}));//req.body parsing 설정
        this.app.use(morgan(morganFormat, {stream : logger.stream})); // morgan 로그 설정 
    }
}

exports.App = App;