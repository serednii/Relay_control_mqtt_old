

function chekChecedDay(event) { //Включає виключає дні тижня
    event.target.previousElementSibling.classList.toggle('checked');
    if (event.target.checked) {
        event.target.previousElementSibling.classList.add('checked');
    } else {
        event.target.previousElementSibling.classList.remove('checked');
    }
}

// ********************************************************************************************************************************************************************
function chekDate(parent, datetime, time) {
    //обробка дати 
    const numberReleClick = parent.getAttribute('data-rele');
    const timerBlock = parent.querySelectorAll('.timer-date__item');

    datetime.forEach(function (k, i) {
        let dateInput = new Date(k.value).getTime();
        // console.log("curentDate");
        // console.log(numberReleClick);
        // console.log(new Date().getTime());

        dateTimeArray[numberReleClick].dateTimeList[i] = dateInput; //В секундах
        dateTimeArray[numberReleClick].dateTimeRealList[i] = new Date(k.value); //нермальний формат

        if (dateTimeArray[numberReleClick].dateTimeRealList[i] != 'Invalid Date') { //Якщо введена дата
            // console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
            // console.log(dateTimeArray[numberReleClick].dateTimeRealList[i] )
            // console.log(time[i * 5].value)
            if (i % 2 == 0) {
                //neparnyy element
                if (time[i * 5].value != '') { //Якщо введений час
                    datetime[i].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i], 'start'); //Міняємо в даті годину на 00:00
                    if (datetime[i].value != 'Invalid Date') dateTimeArray[numberReleClick].dateTimeRealList[i] = new Date(datetime[i].value); //записуємо в елемент datatime
                }
            } else {
                //parnyy elemen
                if (time[(i - 1) * 5].value != '') {
                    datetime[i].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i], 'end'); //Міняємо в даті годину на 23:59
                    if (datetime[i].value != 'Invalid Date') dateTimeArray[numberReleClick].dateTimeRealList[i] = new Date(datetime[i].value); //записуємо в елемент datatime
                }
            }
        }


        for (let _n2 = 0; _n2 < 9; _n2 += 2) {
            if (dateTimeArray[numberReleClick].dateTimeList[_n2] >= dateTimeArray[numberReleClick].dateTimeList[_n2 + 1]) {
                //Якщо в одному рядку друга дата менша або дорівнює першій
                datetime[_n2].classList.add('date-red__color');
                datetime[_n2 + 1].classList.add('date-red__color');
            } else {
                datetime[_n2].classList.remove('date-red__color');
                datetime[_n2 + 1].classList.remove('date-red__color');
            }

            if (datetime[_n2].value == '' && datetime[_n2 + 1].value !== '' || datetime[_n2].value !== '' && datetime[_n2 + 1].value == '') {
                //Якщо в рядку незаповнене одне з полів
                if (datetime[_n2].value == '') datetime[_n2].classList.add('date-blue__backround');
                else datetime[_n2 + 1].classList.add('date-blue__backround');
            } else {
                datetime[_n2].classList.remove('date-blue__backround');
                datetime[_n2 + 1].classList.remove('date-blue__backround');
            }

            for (let _n3 = 0, _nn = 1; _n3 < 7; _n3 += 2, _nn++) {
                // n= [0 1 2 3 4 5 6 7 ]    nn = [1 3 ]
                if (datetime[_n3].value != '' && datetime[_n3 + 1].value != '' && !datetime[_n3].classList.contains('date-red__color')) {
                    //Для розблокіровки для дальших блоків
                    // console.log('checkDaTETRUE');
                    timerBlock[_nn].classList.add('date-show-block');
                    // timerBlock[nn].classList.add('date-show-block');

                    // block1[nn] = true;
                } else {
                    // console.log('checkDaTEFALSE');

                    // block1[nn] = false;

                    timerBlock[_nn].classList.remove('date-show-block');
                    // timerBlock[nn].classList.remove('date-show-block');
                }
            }
        }

        // ********************************************************************************************************************************************************************
        // } else {
        //   // k.value = '';
        //   // console.log('date error');
        // }
    });
}
// ********************************************************************************************************************************************************************


// function checkDataAndTime(datetime, time, numberReleClick){  // Якщо є вибрано поля дата і поля час то поле дата годину старт ставимо 00:00 а кінець 23:59
//   datetime.forEach(function (k, i) {
//     if (dateTimeArray[numberReleClick].dateTimeRealList[i]  != 'Invalid Date') {//Якщо введена дата
//       console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
//       console.log(dateTimeArray[numberReleClick].dateTimeRealList[i] )
//       console.log(time[i * 5].value)
//       if (i % 2 == 0) {
//         //neparnyy element
//         if (time[i * 5].value != '') {//Якщо введений час
//           datetime[i].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i] , 'start');//Міняємо в даті годину на 00:00
//           if (datetime[i].value != 'Invalid Date') dateTimeArray[numberReleClick].dateTimeRealList[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       } else {
//        //parnyy elemen
//         if (time[(i-1) * 5].value != '') {
//           console.log(formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i] , 'end'));
//           datetime[i].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i] , 'end');//Міняємо в даті годину на 23:59
//           if (datetime[i].value != 'Invalid Date') dateTimeArray[numberReleClick].dateTimeRealList[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       }
//     }
//   });
// }
// ********************************************************************************************************************************************************************
function chekTime(parent, datetime, time) {
    //обробка часу
    const numberReleClick = parent.getAttribute('data-rele');
    const timerBlock = parent.querySelectorAll('.timer-date__item');
    const checkedDey = parent.querySelectorAll('.day');


    time.forEach(function (k, i) {
        t2 = new Date(0);
        str = k.value;
        // console.log(k)

        if (k.value != '') {
            t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
            dateTimeArray[numberReleClick].timeRealList[i] = t2;
            t2 = t2.getTime();
            dateTimeArray[numberReleClick].timeList[i] = t2;
        } else {
            dateTimeArray[numberReleClick].timeRealList[i] = '';
            dateTimeArray[numberReleClick].timeList[i] = '';
        }

        //   // ********************************************************************************************************************************************************************

        for (let _n4 = 0; _n4 < 49; _n4 += 2) {

            if (dateTimeArray[numberReleClick].timeList[_n4] >= dateTimeArray[numberReleClick].timeList[_n4 + 1] && dateTimeArray[numberReleClick].timeList[_n4 + 1] !== '') {
                //Якщо в одному рядку друга дата менша або дорівнює першій
                time[_n4].classList.add('time-red__color');
                time[_n4 + 1].classList.add('time-red__color');
            } else {
                time[_n4].classList.remove('time-red__color');
                time[_n4 + 1].classList.remove('time-red__color');
            }

            if (time[_n4].value == '' && time[_n4 + 1].value !== '' || time[_n4].value !== '' && time[_n4 + 1].value == '') {
                //Якщо в рядку незаповнене одне з полів
                if (time[_n4].value == '') time[_n4].classList.add('time-blue__backround');
                else time[_n4 + 1].classList.add('time-blue__backround');
            } else {
                time[_n4].classList.remove('time-blue__backround');
                time[_n4 + 1].classList.remove('time-blue__backround');
            }
        }

        for (let u = 1; u < 49; u += 10) {

            for (let _n5 = u; _n5 < u + 8; _n5 += 2) {
                if (dateTimeArray[numberReleClick].timeList[_n5] + 1 > dateTimeArray[numberReleClick].timeList[_n5 + 1] && dateTimeArray[numberReleClick].timeList[_n5 + 1] !== '') {
                    //Якщо  другий рядок є менший за перший рядок 
                    time[_n5].classList.add('time-red__backround');
                    time[_n5 + 1].classList.add('time-red__backround');
                } else {
                    time[_n5].classList.remove('time-red__backround');
                    time[_n5 + 1].classList.remove('time-red__backround');
                }
            }
        }
        //  checkDataAndTime(datetime, time, numberReleClick);
        //********************************************************************************************** */
        // console.log("MMMMMMMMMMMMMMMMMMMMMMAAAAAAAAAAAAAA");
        // console.log(k);
        // console.log(eve.currentTarget);

        if (i === 0 || i === 10 || i === 20 || i === 30 || i === 40) {

            // console.log('************  ' + numberReleClick + '  ****************  ' + i + '  *********')
            // console.log(dateTimeArray[numberReleClick].dateTimeRealList[i] )
            // console.log(time[i].value)

            if (dateTimeArray[numberReleClick].dateTimeRealList[i / 5] != 'Invalid Date' && dateTimeArray[numberReleClick].dateTimeRealList[i / 5] != undefined && time[i].value != '') {
                datetime[i / 5].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i / 5], 'start');
                dateTimeArray[numberReleClick].dateTimeRealList[i / 5] = new Date(datetime[i / 5].value);
                // console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK");

            }

            if (dateTimeArray[numberReleClick].dateTimeRealList[i / 5 + 1] != 'Invalid Date' && dateTimeArray[numberReleClick].dateTimeRealList[i / 5 + 1] != undefined && time[i].value != '') {
                datetime[i / 5 + 1].value = formatDataAndTime(dateTimeArray[numberReleClick].dateTimeRealList[i / 5 + 1], 'end');
                dateTimeArray[numberReleClick].dateTimeRealList[i / 5 + 1] = new Date(datetime[i / 5 + 1].value);
                // console.log("NNNNNNNNNNNNNNNNNNNNNNNNNN");
            }
        }


        for (let _u = 0, _nn2 = 1, nnn = 0; _u < 45; _u += 10, _nn2++, nnn += 7) {
            //u number section first element 0 10 20 30 40  nn вказує на номер секції 1 2 3 4 5


            for (let _n6 = _u; _n6 < _u + 9; _n6 += 2) {
                // n  перебираємо  парні  елементи в секції 0 2 4 6 8    10 12 14 16 18  20 22 24 26 28  30 32 34 36 38  40 42 44 46 48 
                if (_n6 < _u + 7)
                    if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
                        //Для розблокіровки для дальших рядків
                        time[_n6 + 2].classList.remove('hiden-time');
                        time[_n6 + 1 + 2].classList.remove('hiden-time');
                    } else {
                        time[_n6 + 2].classList.add('hiden-time');
                        time[_n6 + 1 + 2].classList.add('hiden-time');
                    }
            }

            if (_nn2 < 5) {
                if (time[_u + 8].value != '' && time[_u + 9].value != '') {
                    //Для розблокіровки для дальших блоків//розблокувати
                    if (!timerBlock[_nn2].classList.contains('date-show-block')) timerBlock[_nn2].classList.add('time-show-block');

                    // timerBlock[nn].classList.remove('time-show-block');
                } else {
                    timerBlock[_nn2].classList.remove('time-show-block');

                    // timerBlock[nn].classList.add('time-show-block');
                }
            }

            //   const error_class = parent.querySelectorAll('.time-red__color');
            // console.log('length error  ' + error_class.length);
            // if ((time[u].value != '' && !time[u].classList.contains('time-red__color')) ) { //Для розблокіровки сhecked element даного блоку


            if (time[_u].value != '' && !time[_u].classList.contains('time-red__color')) {
                // if (time[_u].value != '' && time[_u] === eve.currentTarget && !time[_u].classList.contains('time-red__color')) {

                //Для розблокіровки сhecked element даного блоку
                for (f = 0; f < 7; f++) {
                    // checkedDey[nnn + f].disabled = false;//ttt
                    // checkedDey[nnn + f].checked = true;//ttt
                }
            } else {
                if (time[_u].value == '')
                    for (f = 0; f < 7; f++) {
                        // checkedDey[nnn + f].disabled = true;//ttt
                    }
            }
        }
        //   // ********************************************************************************************************************************************************************

    });
}
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
