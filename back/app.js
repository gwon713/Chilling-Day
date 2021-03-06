const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// require('fs');

const { env } = require('./config/env');

//multer 설정
const { upload } = require('./config/multer');

// logging 설정
const morgan = require("morgan");
const logger = require('./config/winston');
const morganFormat = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
// :method / request에 대한 HTTP method | :url 요청된 URL | :status HTTP 상태 | :response-time 응답시간 | :remote-addr 사용자의 IP 주소 | :http-version HTTP version |

// Router 설정
const user = require('./router/user');
const food = require('./router/food');
const recipe = require('./router/recipe');
class App {
    constructor(){
        this.app = express();
        this.setMiddleware();
        this.setExpress();
        this.connectDBtest();
    }
    setExpress(){
        this.app.get('/index', (req, res)=>{
            res.status(200).send('<!DOCTYPE html>\
            <html>\
            <head>\
                <meta charset="utf-8">\
                <title>Chilling Day</title>\
            </head>\
            <body>\
                <div>\
                     <h5>Welcome Chilling Day Server</h5>\
                </div>\
            </body>\
            </html>')
        });
        const router = express.Router();
        this.app.use(router);
        this.app.use(user);
        this.app.use(food);
        this.app.use(recipe);
    }
    connectDBtest(){
        const connection = mysql.createConnection({ //database 접속 정보 입력
            host: env.database.host,
            user: env.database.username,
            password: env.database.password,
            port: env.database.port,
            database: env.database.database
        });
        connection.connect((err) => { //database 접속
            if(err){
                logger.error("DB Not Connect : ", err);
            }else{
                logger.info("MySQL Connect");
            }
        });
        connection.on('error', (err)=>{logger.error('db error', err);});
    }
    setMiddleware(){
        this.app.set("etag", false); // 동적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
        const options = { etag: false};
        this.app.use(express.static("public", options)); // 정적 요청에 대한 응답을 보낼 때 etag 생성을 하지 않도록 설정
        this.app.use(express.json({limit : "50mb"})); //req.body parsing 설정
        this.app.use(express.urlencoded({limit : "50mb",extended: false}));//req.body parsing 설정
        this.app.use(morgan(morganFormat, {stream : logger.stream})); // morgan 로그 설정 
        this.app.use('/image',express.static('./upload'));
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
    }
}

exports.App = App;