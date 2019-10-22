const express = require("express");
const router = express.Router();
const SQL = require("../service/db");

// 查询
router.post('/about', (req, res, next) => {
    let reqBody = req.body;
    let queryParam = ['*'];
    // sql查询数据
    SQL.query(queryParam,'websites',reqBody)
    .then(result =>{
        console.log(result)
        res.send(result)
    })
    .catch(error =>{
        console.log(error)
        res.send(error)
    })
    
});
// 新增
router.post('/add', (req, res, next) => {
    // 新增的参数/属性/字段
    let reqBody = req.body;
    // 新增条件
    // let queryParam = ['name'];
    SQL.insert(reqBody,'websites')
    .then(result =>{
        console.log(result)
        res.send(result)
    })
    .catch(err =>{
        console.log(err);
        res.send(err)
    })
});
// 修改
router.post('/change', (req, res, next) => {
    // 修改的参数/属性/字段
    let reqBody = req.body;
    // 修改条件
    let queryParam = {
        id:req.body.id
    };
    SQL.update(reqBody,'websites',queryParam)
    .then(result =>{
        console.log(result)
        res.send(result)
    })
    .catch(err =>{
        console.log(err);
        res.send(err)
    })
});

// 删除
router.post('/delete', (req, res, next) => {
    // 修改的参数/属性/字段
    let reqBody = req.body;
    // 修改条件
    let queryParam = {
        id:req.body.id
    };
    SQL.remove('websites',queryParam)
    .then(result =>{
        console.log(result)
        res.send(result)
    })
    .catch(err =>{
        console.log(err);
        res.send(err)
    })
});

module.exports = router;