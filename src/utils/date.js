export const isDate = (date) => {
    return (
        Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
    );
}
export const isNaN = (value) =>{
    if (Number.isNaN) {
      return Number.isNaN(value);
    }
    // eslint-disable-next-line no-self-compare
    return value !== value;
}

// formate date to Array
export const formatDate = (date) =>{
    let year,month,day,dateArr;
    let d = new Date(date);
    year = d.getFullYear();
    month = (d.getMonth() + 1) > 10 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
    day = d.getDate() > 10 ? `${d.getDate()}` : `0${d.getDate()}`;
    dateArr = [year,month,day]
    return dateArr
}