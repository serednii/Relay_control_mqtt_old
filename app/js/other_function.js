// function isEmpty(obj) {
//     //Провірка на пусті обєкти 
//     for (let key in obj) {
//         return false;
//     }
//     return true;
// }

function isEmpty(obj) {
    // Перевіряємо чи це об'єкт і чи не null
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        return Object.keys(obj).length === 0;
    }
    return false;  // Якщо це не об'єкт або null, то це не порожній об'єкт
}


function addBeforeNullNUmber(number) {
    if (number > 9) return number;
    else return '0' + number;
}