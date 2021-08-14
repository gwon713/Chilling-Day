const express = require("express");

const mysql = require('../config/db');
const logger = require('../config/winston');

const router = express.Router();

router.get('/food/datas', (req, res)=>{
    const sql = "SELECT *\
                FROM FOOD__TB;"
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, (err, result) => {
                if (err) {
                    logger.error("GET Food Resource Error" + err);
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
                            result
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