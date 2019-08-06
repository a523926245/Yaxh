/**
 * 格式化时间:返回yy-mm-dd-hh-mm-ss
 * @param {时间戳} time 
 */
const formatTime = (time) =>{
    let year,month,day,hour,mins,second;
    let date = new Date(time)
    year = date.getFullYear();
    year < 10 && (year = `0${year}`); 
    month = date.getMonth() + 1;
    month < 10 && (month = `0${month}`); 
    day = date.getDate();
    hour = date.getHours();
    mins = date.getMinutes();
    second = date.getSeconds();
    return `${year}-${month}-${day}-${hour}-${mins}-${second}`
}
/**
 * 格式化对象为mysql查询条件字符串
 * {a:1,b:2} =>where a=1 and b=2
 */
const formatObjectToSqlWhere = (obj) => {
    let str='';
    if(!!obj && isEmptyObject(obj)){
        return str;
    }
    else{
        // 对象参数个数
        let len = Object.keys(obj).length;
        Object.keys(obj).forEach((v,index) =>{
            // 单个参数不加and
            if(len <= 1 ){
                str = `${v}=${obj[v]}`;
            }
            else{
                // 最后1个不加and/结尾不加and
                if(index == len - 1){
                    str += `${v}=${obj[v]}` 
                }
                else{
                    str += `${v}=${obj[v]} and ` 
                }
            }
        });
        return `where ${str}`;
    }
}
/**
 * 格式化对象为mysql增加条件字符串
 * {a:1,b:2} =>set a=1 and b=2
 */
const formatObjectToSqlSet = (obj) =>{
    let str='';
    if(!!obj && isEmptyObject(obj)){
        return str;
    }
    else{
        // 对象参数个数
        let len = Object.keys(obj).length;
        Object.keys(obj).forEach((v,index) =>{
            // 单个参数不加and
            if(len <= 1 ){
                str = `${v}='${obj[v]}'`;
            }
            else{
                // 最后1个不加and/结尾不加and
                if(index == len - 1){
                    str += `${v}='${obj[v]}'` 
                }
                else{
                    str += `${v}='${obj[v]}', ` 
                }
            }
        });
        return `set ${str}`;
    }
}
const isEmptyObject = (obj) =>{
    for(var i in obj){
        return false;
    }
    return true
}

module.exports = {
    formatTime,
    formatObjectToSqlWhere,
    formatObjectToSqlSet
};