const mysql = require("mysql");
const Utils = require("../utils/utils");

const pool = mysql.createPool({
    host     : 'localhost',       
    user     : 'root',              
    password : '123456',       
    port: '3306',                   
    database: 'mysql' 
})
/**
 *封装查询数据方法
 * @param {Array} sqlParams :查询参数,查询单个或者多个数据库中的字段
 * @param {String} dataBase :要查询的数据库表名
 * @param {Object} sqlCondion :查询条件
 */ 
const query = function(sqlParams,dataBase,sqlCondion){
    let data={
        result:{},
        resultCode:null,
        resultMsg:null
    };
    return new Promise((resolve,reject) =>{
        let sqlString;
        pool.getConnection((err,rows) =>{
            if(err){
                data.result.info = error;
                data.resultCode = "0000";
                data.resultMsg = "ok"
                reject(data);
                return;
            }
            else{
                // Utils.formatObjectToSqlWhere(sqlCondion):根据接受的参数,生成sql WHERE条件
                // 根据参数生成sql语句
                sqlString = `select ${sqlParams} from ${dataBase} ${Utils.formatObjectToSqlWhere(sqlCondion)}`;
                console.log(sqlString)

                rows.query(sqlString,function(error,results,fields){
                    rows.release();
                    if(error){
                        data.result.info = error;
                        data.resultCode = "9999";
                        data.resultMsg = "出现异常"
                        reject(data)
                    }
                    else{
                        data.result.info = results;
                        data.resultCode = "0000";
                        data.resultMsg = "ok"
                        resolve(data)
                    }
                })
            }
        })
    })
} 

/**
 *封装新增数据方法
 * @param {Array} sqlParams :被新增到数据库中的字段
 * @param {String} dataBase :数据库表名
 */ 
const insert = function(sqlParams,dataBase){
    let data={
        result:{},
        resultCode:null,
        resultMsg:null
    };
    return new Promise((resolve,reject) =>{
        let sqlString;
        pool.getConnection((error,rows) =>{
            if(error){
                data.result.info = error;
                data.resultCode = "9999";
                data.resultMsg = "出现异常"
                reject(data);
                return;
            }
            else{
                // Utils.formatObjectToSqlWhere(sqlCondion):根据接受的参数,生成sql set条件
                // 根据参数生成sql语句
                sqlString = `insert into ${dataBase} ${Utils.formatObjectToSqlSet(sqlParams)}`;
                console.log(sqlString)

                rows.query(sqlString,(error,results) =>{
                    rows.release();
                    if(error){
                        data.result.info = error;
                        data.resultCode = "9999";
                        data.resultMsg = "出现异常"
                        reject(data)
                    }
                    else{
                        data.result.info = "新增成功";
                        data.resultCode = "0000";
                        data.resultMsg = "ok"
                        resolve(data)
                    }
                })
            }
        })
    })
}

/**
 *封装更新数据方法
 * @param {Object} updateParams :更新参数
 * @param {String} dataBase :数据库表名
 * @param {Object} sqlCondion :更新条件
 */ 
const update = function(updateParams,dataBase,sqlCondion){
    let data={
        result:{},
        resultCode:null,
        resultMsg:null
    };
    return new Promise((resolve,reject) =>{
        let sqlString;
        pool.getConnection((error,rows) =>{
            if(error){
                data.result.info = error;
                data.resultCode = "9999";
                data.resultMsg = "出现异常"
                reject(data);
                return;
            }
            else{
                // Utils.formatObjectToSqlWhere(sqlCondion)根据接受的参数,生成sql set+where条件(update数据)
                // 根据参数生成sql语句
                sqlString = `update ${dataBase} ${Utils.formatObjectToSqlSet(updateParams)} ${Utils.formatObjectToSqlWhere(sqlCondion)}`;
                console.log(sqlString)

                rows.query(sqlString,(error,results) =>{
                    rows.release();
                    if(error){
                        data.result.info = error;
                        data.resultCode = "9999";
                        data.resultMsg = "出现异常"
                        reject(data)
                    }
                    else{
                        data.result.info = "修改成功";
                        data.resultCode = "0000";
                        data.resultMsg = "ok"
                        resolve(data)
                    }
                })
            }
        })
    })
}

/**
 *封装删除数据方法
 * @param {Object} sqlParams :删除条件
 * @param {String} dataBase :数据库表名
 * @param {Object} sqlCondion :删除条件
 */ 
const remove = function(dataBase,sqlCondion){
    let data={
        result:{},
        resultCode:null,
        resultMsg:null
    };
    return new Promise((resolve,reject) =>{
        let sqlString;
        pool.getConnection((error,rows) =>{
            if(error){
                data.result.info = error;
                data.resultCode = "9999";
                data.resultMsg = "出现异常"
                reject(data);
                return;
            }
            else{
                // Utils.formatObjectToSqlWhere(sqlCondion)根据接受的参数,生成sql delete where条件(delete数据)
                // 根据参数生成sql语句
                sqlString = `delete from ${dataBase} ${Utils.formatObjectToSqlWhere(sqlCondion)}`;
                console.log(sqlString)

                rows.query(sqlString,(error,results) =>{
                    rows.release();
                    if(error){
                        data.result.info = error;
                        data.resultCode = "9999";
                        data.resultMsg = "出现异常"
                        reject(data)
                    }
                    else{
                        data.result.info = "修改成功";
                        data.resultCode = "0000";
                        data.resultMsg = "ok"
                        resolve(data)
                    }
                })
            }
        })
    })
}

module.exports = {
    query,
    insert,
    update,
    remove,
}