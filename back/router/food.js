const express = require("express");
require('fs');
const mysql = require('../config/db');
const logger = require('../config/winston');
const { upload } = require('../config/multer');

const router = express.Router();

// GET Food Resource
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
                            food_data: result
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

const {saladModel} = require('../model/salad');
// POST Upload Image
router.post('/upload', upload.single('image'),(req, res, next)=>{
    const sql = "INSERT INTO IMAGE_TB\
                (user_id, image_childay, image_name, image_data)\
                VALUES(?,?,?,?);"
    
    const userID = parseInt(req.query.user_id);
    const imageChilday = parseInt(req.body.image_childay);
    const imageName = req.file.filename
    const imageData = JSON.stringify(req.file);
    const params = [userID,imageChilday,imageName,imageData];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("POST Upload Image Error" + err);
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
                            image_childay : imageChilday,
                            image_name : imageName,
                            image_data : JSON.parse(imageData),
                            food_name: saladModel.food_name,
                            food_person : saladModel.food_person,
                            food_data: saladModel.food_data
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
})

// GET Image Search
router.get('/image/search', (req, res)=>{
    const sql = "SELECT image_name\
                FROM IMAGE_TB\
                WHERE user_id = ? AND image_childay = ?;"
    const userID = parseInt(req.query.user_id);
    const imageChilday = parseInt(req.query.image_childay);
    const params = [userID,imageChilday];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("GET Image Search Error" + err);
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
                        res.redirect('/image/'+result[0].image_name);
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

//3.6kg ???????????? ????????? ??????
//3.6kg ?????? -??? ??????
//????????? g?????? ?????? ????????? ??????????????? ?????? g?????? ?????? ????????? ??????
const {save_food_data} = require('../model/food_data');
//const {saladModel} = require('../model/salad');
const Cal_emission = (foodPerson,foodData)=>{
    const food_total_num = foodData.length  //??? ????????? ??????
    const food_cal = foodPerson/food_total_num //??? ???????????? ????????? ????????? // 200g(????????? ?????? g ??????) / ????????? ??????  
    let sum_emissions = 0; // ??? ????????? 
    foodData.forEach((item) => { 
        sum_emissions += item.food_emissions*food_cal; // 1g ?????? ????????? x food_cal
    });
    console.log('Cal_Env_Contribution total sum : '+sum_emissions);
    return (3.6-sum_emissions);
}    
const Cal_persent = (emission)=>{
    let result = Math.round((emission/3.6)*100);
    if(result>100){
        result = (result%100) * -1
    }else if(result==100){
        result = 0;
    }
    return result // -????????? 100??? ???????????? ?????? 100?????? ?????? ???????????? -???????????? ??????
}

const Cal_Tree = (userTree, userTotalEmissions, imageChilday)=>{
    /*const user_tree = {
        total_tree: ?, = ????????? ??? ?????? ????????? / 6.6
        tree_progress: ?, = ( ?????? ??? ?????? ????????? % 6.6 )/6.6 * 100 
        tree_remaining: ? = 6.6-((?????? ??? ?????? ?????????)%6.6)   /   (?????? ??? ?????? ?????????)/childay 
    }*/
    userTree.total_tree = Math.floor(userTotalEmissions/6.6); // ????????? ??????
    userTree.tree_progress = Math.round(((userTotalEmissions%6.6)/6.6 * 100)) // 1?????? ?????? ????????? ?????????
    userTree.tree_remaining = Math.floor((6.6-(userTotalEmissions%6.6))/(userTotalEmissions/imageChilday))+1;
    console.log('?????? ?????? ????????? : '+(userTotalEmissions%6.6));
    console.log('?????? ?????? ?????? ?????? ?????? : '+(userTotalEmissions/imageChilday));
    return userTree;
}
// ?????? ?????? 
// 1.user_tree ????????? ????????? user_total_emissions ????????? 
// 2.user_total_emissons??? ?????? ?????? ????????? cal_emission_res??? ??????
// 3.?????? ????????? user_tree??? ???????????? ?????? ?????? ??????????????????(childay,?????? ??????)
// 4.tree ???????????? => Update_Tree
// POST Data Emission
//console.log(Cal_Env_Contribution(saladModel),'%');
router.post('/food/emission',(req, res, next)=>{
    const sql = "SELECT user_id, user_tree, user_childay_cnt, user_total_emissions\
                FROM USER_TB\
                WHERE user_id = ?;"
    const userID = parseInt(req.query.user_id);
    const imageChilday = parseInt(req.body.image_childay);
    const foodName = req.body.food_name;
    const foodPerson = parseInt(req.body.food_person);
    const foodData = req.body.food_data;
    const cal_emission_res = Cal_emission(foodPerson,foodData); // ?????? ??????????????? ????????? ?????? ????????? 
    const cal_res = Cal_persent(cal_emission_res);
    const params = [userID];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("POST Data Emission Error" + err);
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
                        const parse_userTree = JSON.parse(result[0].user_tree);
                        const before_userDayCnt = parseInt(result[0].user_childay_cnt);
                        let userDayCnt = before_userDayCnt;
                        if(userDayCnt==imageChilday){
                            userDayCnt += 1;
                            const emission_total = cal_emission_res + result[0].user_total_emissions
                            const after_userTree = Cal_Tree(parse_userTree, emission_total, imageChilday);
                            Update_Tree(req, res, next, userID, userDayCnt, JSON.stringify(after_userTree), emission_total);
                            res.status(200).send({
                                success: true,
                                user_id: userID,
                                emission_persent: cal_res,
                                user_childay_cnt: userDayCnt,
                                user_tree : after_userTree
                            });
                        }else{
                            res.status(409).send({
                                success: false,
                                req_childay: imageChilday,
                                cnt_childay: userDayCnt,
                                message: "Childay ?????? ??????"
                            });
                        }
                        
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        logger.error(err);
        res.status(500).send("message : Internal Server Error");
    } 
})

const Update_Tree = (req, res, next, userID, userDayCnt, userTree, userEmissions)=>{
    const sql = "UPDATE USER_TB\
                SET user_tree=?, user_childay_cnt=?,user_total_emissions=?\
                WHERE user_id = ?;"
    console.log("update tree object : "+userTree);
    const params = [userTree,userDayCnt,userEmissions,userID];
    try {
        mysql.getConnection((err, connection) => {
            if (err){
                logger.error("DB Connection Err : " + err);
                res.status(500).send("message : Internal Server Error");
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    logger.error("Update Tree MiddleWare Error" + err);
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
                        next();
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        logger.error(err);
        res.status(500).send("message : Internal Server Error");
    } 
}

module.exports = router;