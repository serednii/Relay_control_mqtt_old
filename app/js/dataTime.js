

function checkCheckedDay(event) { //Включає виключає дні тижня
    event.target.previousElementSibling.classList.toggle('checked');
    if (event.target.checked) {
        event.target.previousElementSibling.classList.add('checked');
    } else {
        event.target.previousElementSibling.classList.remove('checked');
    }
}

// ********************************************************************************************************************************************************************
function checkDate(parent, dateTime, time) {
    //обробка дати 
    const numberRelayClick = parent.getAttribute('data-rele');
    const timerBlock = parent.querySelectorAll('.timer-date__item');

    dateTime.forEach(function (k, i) {
        let dateInput = new Date(k.value).getTime();
        dateTimeArray[numberRelayClick].dateTimeList[i] = dateInput; //В секундах
        dateTimeArray[numberRelayClick].dateTimeRealList[i] = new Date(k.value); //нермальний формат

        if (dateTimeArray[numberRelayClick].dateTimeRealList[i] != 'Invalid Date') { //Якщо введена дата
            if (i % 2 == 0) {
                //neparnyy element
                if (time[i * 5].value != '') { //Якщо введений час
                    dateTime[i].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i], 'start'); //Міняємо в даті годину на 00:00
                    if (dateTime[i].value != 'Invalid Date') dateTimeArray[numberRelayClick].dateTimeRealList[i] = new Date(dateTime[i].value); //записуємо в елемент datatime
                }
            } else {
                //parnyy elemen
                if (time[(i - 1) * 5].value != '') {
                    dateTime[i].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i], 'end'); //Міняємо в даті годину на 23:59
                    if (dateTime[i].value != 'Invalid Date') dateTimeArray[numberRelayClick].dateTimeRealList[i] = new Date(dateTime[i].value); //записуємо в елемент datatime
                }
            }
        }


        for (let _n2 = 0; _n2 < 9; _n2 += 2) {
            if (dateTimeArray[numberRelayClick].dateTimeList[_n2] >= dateTimeArray[numberRelayClick].dateTimeList[_n2 + 1]) {
                //Якщо в одному рядку друга дата менша або дорівнює першій
                dateTime[_n2].classList.add('date-red__color');
                dateTime[_n2 + 1].classList.add('date-red__color');
            } else {
                dateTime[_n2].classList.remove('date-red__color');
                dateTime[_n2 + 1].classList.remove('date-red__color');
            }

            if (dateTime[_n2].value == '' && dateTime[_n2 + 1].value !== '' || dateTime[_n2].value !== '' && dateTime[_n2 + 1].value == '') {
                //Якщо в рядку незаповнене одне з полів
                if (dateTime[_n2].value == '') dateTime[_n2].classList.add('date-blue__backround');
                else dateTime[_n2 + 1].classList.add('date-blue__backround');
            } else {
                dateTime[_n2].classList.remove('date-blue__backround');
                dateTime[_n2 + 1].classList.remove('date-blue__backround');
            }

            for (let _n3 = 0, _nn = 1; _n3 < 7; _n3 += 2, _nn++) {
                // n= [0 1 2 3 4 5 6 7 ]    nn = [1 3 ]
                if (dateTime[_n3].value != '' && dateTime[_n3 + 1].value != '' && !dateTime[_n3].classList.contains('date-red__color')) {
                    //Для розблокіровки для дальших блоків
                    timerBlock[_nn].classList.add('date-show-block');
                } else {
                    timerBlock[_nn].classList.remove('date-show-block');
                }
            }
        }
    });
}


// ********************************************************************************************************************************************************************

// function checkDataAndTime(dateTime, time, numberRelayClick){  // Якщо є вибрано поля дата і поля час то поле дата годину старт ставимо 00:00 а кінець 23:59
//   dateTime.forEach(function (k, i) {
//     if (dateTimeArray[numberRelayClick].dateTimeRealList[i]  != 'Invalid Date') {//Якщо введена дата
//       console.log('************  '+numberRelayClick+'  ****************  '+i+'  *********')
//       console.log(dateTimeArray[numberRelayClick].dateTimeRealList[i] )
//       console.log(time[i * 5].value)
//       if (i % 2 == 0) {
//         //neparnyy element
//         if (time[i * 5].value != '') {//Якщо введений час
//           dateTime[i].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i] , 'start');//Міняємо в даті годину на 00:00
//           if (dateTime[i].value != 'Invalid Date') dateTimeArray[numberRelayClick].dateTimeRealList[i] = new Date(dateTime[i].value);//записуємо в елемент datatime
//         }
//       } else {
//        //parnyy elemen
//         if (time[(i-1) * 5].value != '') {
//           console.log(formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i] , 'end'));
//           dateTime[i].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i] , 'end');//Міняємо в даті годину на 23:59
//           if (dateTime[i].value != 'Invalid Date') dateTimeArray[numberRelayClick].dateTimeRealList[i] = new Date(dateTime[i].value);//записуємо в елемент datatime
//         }
//       }
//     }
//   });
// }
// ********************************************************************************************************************************************************************


function checkTime(parent, dateTime, time) {
    const numberRelayClick = parent.getAttribute('data-rele');

    processTimeInputs(parent, time, numberRelayClick);
    updateDateTimeFields(dateTime, time, numberRelayClick);
    updateTimerBlocks(parent, time);
}


//Функція для обробки часу і встановлення класів
function processTimeInputs(parent, time, numberRelayClick) {
    time.forEach(function (k, i) {
        const t2 = getTimeFromInput(k.value);
        updateTimeLists(numberRelayClick, i, t2);

        processTimeRanges(parent, time, numberRelayClick);
    });
}

//Функція для отримання часу з текстового поля
function getTimeFromInput(str) {
    let t2 = new Date(0);
    if (str !== '') {
        t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
    }
    return t2;
}

//Функція для оновлення списків часу     
function updateTimeLists(numberRelayClick, index, t2) {
    if (t2) {
        dateTimeArray[numberRelayClick].timeRealList[index] = t2;
        dateTimeArray[numberRelayClick].timeList[index] = t2.getTime();
    } else {
        dateTimeArray[numberRelayClick].timeRealList[index] = '';
        dateTimeArray[numberRelayClick].timeList[index] = '';
    }
}

//Функція для обробки діапазонів часу і перевірки помилок
function processTimeRanges(parent, time, numberRelayClick) {
    for (let _n4 = 0; _n4 < 49; _n4 += 2) {
        if (dateTimeArray[numberRelayClick].timeList[_n4] >= dateTimeArray[numberRelayClick].timeList[_n4 + 1] && dateTimeArray[numberRelayClick].timeList[_n4 + 1] !== '') {
            addErrorClass(time, _n4, 'time-red__color');
        } else {
            removeErrorClass(time, _n4, 'time-red__color');
        }

        if (isIncompleteTimeRange(time, _n4)) {
            markIncompleteRange(time, _n4, 'time-blue__backround');
        } else {
            removeErrorClass(time, _n4, 'time-blue__backround');
        }
    }
}


//Допоміжні функції для роботи з класами
function addErrorClass(time, index, className) {
    time[index].classList.add(className);
    time[index + 1].classList.add(className);
}

function removeErrorClass(time, index, className) {
    time[index].classList.remove(className);
    time[index + 1].classList.remove(className);
}

function isIncompleteTimeRange(time, index) {
    return (time[index].value === '' && time[index + 1].value !== '') || (time[index].value !== '' && time[index + 1].value === '');
}

function markIncompleteRange(time, index, className) {
    if (time[index].value === '') time[index].classList.add(className);
    else time[index + 1].classList.add(className);
}


//Функція для оновлення полів дати/часу
function updateDateTimeFields(dateTime, time, numberRelayClick) {
    for (let i = 0; i < 49; i += 10) {
        if (dateTimeArray[numberRelayClick].dateTimeRealList[i / 5] != 'Invalid Date' && time[i].value != '') {
            dateTime[i / 5].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i / 5], 'start');
            dateTimeArray[numberRelayClick].dateTimeRealList[i / 5] = new Date(dateTime[i / 5].value);
        }

        if (dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1] != 'Invalid Date' && time[i].value != '') {
            dateTime[i / 5 + 1].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1], 'end');
            dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1] = new Date(dateTime[i / 5 + 1].value);
        }
    }
}


//Функція для обробки блоків таймерів
function updateTimerBlocks(parent, time) {
    const timerBlock = parent.querySelectorAll('.timer-date__item');
    const checkedDey = parent.querySelectorAll('.day');

    for (let _u = 0; _u < 45; _u += 10) {
        toggleTimeVisibility(time, _u);
        toggleCheckedFields(time, _u, checkedDey, parent);
    }
}

function toggleTimeVisibility(time, _u) {
    for (let _n6 = _u; _n6 < _u + 9; _n6 += 2) {
        if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
            time[_n6 + 2].classList.remove('hiden-time');
            time[_n6 + 3].classList.remove('hiden-time');
        } else {
            time[_n6 + 2].classList.add('hiden-time');
            time[_n6 + 3].classList.add('hiden-time');
        }
    }
}

function toggleCheckedFields(time, _u, checkedDey, parent) {
    if (time[_u].value !== '' && !time[_u].classList.contains('time-red__color')) {
        for (let f = 0; f < 7; f++) {
            // checkedDey[nnn + f].disabled = false;
            // checkedDey[nnn + f].checked = true;
        }
    } else {
        if (time[_u].value === '') {
            for (let f = 0; f < 7; f++) {
                // checkedDey[nnn + f].disabled = true;
            }
        }
    }
}








































// function checkTime(parent, dateTime, time) {
//     //обробка часу
//     const numberRelayClick = parent.getAttribute('data-rele');
//     const timerBlock = parent.querySelectorAll('.timer-date__item');
//     const checkedDey = parent.querySelectorAll('.day');

//     time.forEach(function (k, i) {
//         t2 = new Date(0);
//         str = k.value;
//         if (k.value != '') {
//             t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
//             dateTimeArray[numberRelayClick].timeRealList[i] = t2;
//             t2 = t2.getTime();
//             dateTimeArray[numberRelayClick].timeList[i] = t2;
//         } else {
//             dateTimeArray[numberRelayClick].timeRealList[i] = '';
//             dateTimeArray[numberRelayClick].timeList[i] = '';
//         }

//         //   // ********************************************************************************************************************************************************************

//         for (let _n4 = 0; _n4 < 49; _n4 += 2) {

//             if (dateTimeArray[numberRelayClick].timeList[_n4] >= dateTimeArray[numberRelayClick].timeList[_n4 + 1] && dateTimeArray[numberRelayClick].timeList[_n4 + 1] !== '') {
//                 //Якщо в одному рядку друга дата менша або дорівнює першій
//                 time[_n4].classList.add('time-red__color');
//                 time[_n4 + 1].classList.add('time-red__color');
//             } else {
//                 time[_n4].classList.remove('time-red__color');
//                 time[_n4 + 1].classList.remove('time-red__color');
//             }

//             if (time[_n4].value == '' && time[_n4 + 1].value !== '' || time[_n4].value !== '' && time[_n4 + 1].value == '') {
//                 //Якщо в рядку незаповнене одне з полів
//                 if (time[_n4].value == '') time[_n4].classList.add('time-blue__backround');
//                 else time[_n4 + 1].classList.add('time-blue__backround');
//             } else {
//                 time[_n4].classList.remove('time-blue__backround');
//                 time[_n4 + 1].classList.remove('time-blue__backround');
//             }
//         }

//         for (let u = 1; u < 49; u += 10) {

//             for (let _n5 = u; _n5 < u + 8; _n5 += 2) {
//                 if (dateTimeArray[numberRelayClick].timeList[_n5] + 1 > dateTimeArray[numberRelayClick].timeList[_n5 + 1] && dateTimeArray[numberRelayClick].timeList[_n5 + 1] !== '') {
//                     //Якщо  другий рядок є менший за перший рядок 
//                     time[_n5].classList.add('time-red__backround');
//                     time[_n5 + 1].classList.add('time-red__backround');
//                 } else {
//                     time[_n5].classList.remove('time-red__backround');
//                     time[_n5 + 1].classList.remove('time-red__backround');
//                 }
//             }
//         }

//         if (i === 0 || i === 10 || i === 20 || i === 30 || i === 40) {
//             if (dateTimeArray[numberRelayClick].dateTimeRealList[i / 5] != 'Invalid Date' && dateTimeArray[numberRelayClick].dateTimeRealList[i / 5] != undefined && time[i].value != '') {
//                 dateTime[i / 5].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i / 5], 'start');
//                 dateTimeArray[numberRelayClick].dateTimeRealList[i / 5] = new Date(dateTime[i / 5].value);
//             }

//             if (dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1] != 'Invalid Date' && dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1] != undefined && time[i].value != '') {
//                 dateTime[i / 5 + 1].value = formatDataAndTime(dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1], 'end');
//                 dateTimeArray[numberRelayClick].dateTimeRealList[i / 5 + 1] = new Date(dateTime[i / 5 + 1].value);
//             }
//         }


//         for (let _u = 0, _nn2 = 1, nnn = 0; _u < 45; _u += 10, _nn2++, nnn += 7) {
//             //u number section first element 0 10 20 30 40  nn вказує на номер секції 1 2 3 4 5


//             for (let _n6 = _u; _n6 < _u + 9; _n6 += 2) {
//                 // n  перебираємо  парні  елементи в секції 0 2 4 6 8    10 12 14 16 18  20 22 24 26 28  30 32 34 36 38  40 42 44 46 48 
//                 if (_n6 < _u + 7)
//                     if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
//                         //Для розблокіровки для дальших рядків
//                         time[_n6 + 2].classList.remove('hiden-time');
//                         time[_n6 + 1 + 2].classList.remove('hiden-time');
//                     } else {
//                         time[_n6 + 2].classList.add('hiden-time');
//                         time[_n6 + 1 + 2].classList.add('hiden-time');
//                     }
//             }

//             if (_nn2 < 5) {
//                 if (time[_u + 8].value != '' && time[_u + 9].value != '') {
//                     //Для розблокіровки для дальших блоків//розблокувати
//                     if (!timerBlock[_nn2].classList.contains('date-show-block')) timerBlock[_nn2].classList.add('time-show-block');

//                     // timerBlock[nn].classList.remove('time-show-block');
//                 } else {
//                     timerBlock[_nn2].classList.remove('time-show-block');

//                     // timerBlock[nn].classList.add('time-show-block');
//                 }
//             }

//             //   const error_class = parent.querySelectorAll('.time-red__color');
//             // console.log('length error  ' + error_class.length);
//             // if ((time[u].value != '' && !time[u].classList.contains('time-red__color')) ) { //Для розблокіровки сhecked element даного блоку


//             if (time[_u].value != '' && !time[_u].classList.contains('time-red__color')) {
//                 // if (time[_u].value != '' && time[_u] === eve.currentTarget && !time[_u].classList.contains('time-red__color')) {

//                 //Для розблокіровки сhecked element даного блоку
//                 for (f = 0; f < 7; f++) {
//                     // checkedDey[nnn + f].disabled = false;//ttt
//                     // checkedDey[nnn + f].checked = true;//ttt
//                 }
//             } else {
//                 if (time[_u].value == '')
//                     for (f = 0; f < 7; f++) {
//                         // checkedDey[nnn + f].disabled = true;//ttt
//                     }
//             }
//         }
//         //   // ********************************************************************************************************************************************************************

//     });
// }
// ********************************************************************************************************************************************************************


function formatDataAndTime(date, typ) {

    let strDate = date.getFullYear() + '-';
    strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    strDate += '-';
    strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    if (typ == 'start') strDate += 'T00:00';
    else if ('end') strDate += 'T23:59';
    // console.log('strDatestrDatestrDate  ' + strDate);
    return strDate;
}

function formatDataAndTimeFull(date) {

    let strDate = date.getFullYear() + '-';
    strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    strDate += '-';
    strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    strDate += 'T';
    strDate += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    strDate += ':';
    strDate += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    // console.log('strDatestrDatestrDate  ' + strDate);
    return strDate;
}


function messageDate(inter) {
    s = 'RELE' + inter + '-65535-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  4294967295-65535-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  99-99-99-99-99-99-99-99-99-99-\
  1-1-1-1-1-1-1-\
  1-1-1-1-1-1-1-\
  1-1-1-1-1-1-1-\
  1-1-1-1-1-1-1-\
  1-1-1-1-1-1-1-';
    console.log(s);

    sendMessage(setReleDATATIME, s);

}
