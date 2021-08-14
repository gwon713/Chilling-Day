const express = require("express");

const mysql = require('../config/db');
const logger = require('../config/winston');

const router = express.Router();

router.get('/user', (req, res)=>{
    /*const sql = "SELECT u.user_id, u.user_name, u.user_email, u.user_pwd, u.user_level, u.user_childay_cnt, ud.chil_day_mon, ud.chil_day_tue, ud.chil_day_wed, ud.chil_day_thu, ud.chil_day_fri, ud.chil_day_sat, ud.chil_day_sun\
                FROM USER_TB u , USER_CHIL_DAY_TB ud\
                WHERE u.user_id = ? AND u.user_id = ud.user_id;"*/
    const sql = "SELECT u.*, ud.* \
                FROM USER_TB u ,USER_CHIL_DAY_TB ud\
                WHERE u.user_id = 1 AND u.user_id = ud.user_id;"
    const userID = parseInt(req.query.user_id);
    const params = [userID];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("GET user Data Error" + err);
                    res.status(500).send("message : Internal Server Error");
                }
                else {
                    if (result.length === 0) {
                        res.status(400).send({
                            success: false,
                            message: "DB response Not Found"
                        });
                    }
                    else {
                        res.status(200).send({
                            success: true,
                            user_id : result[0].user_id,
                            user_name : result[0].user_name,
                            user_email : result[0].user_email,
                            user_pwd : result[0].user_pwd,
                            user_level : result[0].user_level,
                            user_childay_cnt : result[0].user_childay_cnt, 
                            user_chilling_day : { // 유저가 설정한 일주일 중 칠링데이 0/비활성 1/활
                                chil_day_mon : result[0].chil_day_mon,
                                chil_day_tue : result[0].chil_day_tue,
                                chil_day_wed : result[0].chil_day_wed,
                                chil_day_thu : result[0].chil_day_thu,
                                chil_day_fri : result[0].chil_day_fri,
                                chil_day_sat : result[0].chil_day_sat,
                                chil_day_sun : result[0].chil_day_sun
                            }
                        });
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        logger.error(err);
        res.status(500).send("message : Internal Server Error");
    }
});

router.get('/lending', (req, res)=>{
    const sql = "SELECT user_id, user_tree\
                FROM USER_TB\
                WHERE user_id = ?;"
    const userID = parseInt(req.query.user_id);
    const params = [userID];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("GET Landing Info Error" + err);
                    res.status(500).send("message : Internal Server Error");
                }
                else {
                    if (result.length === 0) {
                        res.status(400).send({
                            success: false,
                            message: "DB response Not Found"
                        });
                    }
                    else {
                        res.status(200).send({
                            success: true,
                            user_id : result[0].user_id,
                            user_tree : JSON.parse(result[0].user_tree)
                        });
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        logger.error(err);
        res.status(500).send("message : Internal Server Error");
    }
});

module.exports = router;