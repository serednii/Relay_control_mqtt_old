function isEmpty(obj) {
    //Провірка на пусті обєкти 
    for (let key in obj) {
        return false;
    }
    return true;
}


function addBeforeNullNUmber(number) {
    if (number > 9) return number;
    else return '0' + number;
}