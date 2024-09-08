

function fun1() {

    if (sensorEepromControl.obj != undefined) {
        //Якщо не пустий обєкт
        // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZ');
        // console.log(sensorEepromControl .obj);
        // console.log(eepromData .obj);
        releItem.forEach(function (e, clickRele) {

            const select = e.querySelector('select');
            const radiochangeRadio = e.querySelectorAll('.rele-temp-change-radio');
            const radioSingle = e.querySelectorAll('.rele-temp-change-single');
            const releError = e.querySelectorAll('.input-control-error');

            k = sensorEepromControl.obj[clickRele].number;
            const numSensor = k & 0x0F; // номер сенсора який управляє даним реле
            // console.log('k   +++ ' + clickRele + '  ' + (k &= ~240));
            // console.log('--');
            // console.log(numSensor);
            // convertToBinary1(numSensor);

            if (radioSingle !== null) //якщо не пустий масив

                if (k & 1 << 4) {
                    ////1-два діапазона температур включення і відключеня 0-один діапазон температур  включення або відключення
                    radioSingle[1].checked = true;
                    e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = false;
                } else {
                    e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = true;
                    radioSingle[0].checked = true;
                }

            if (radiochangeRadio !== null) //якщо не пустий масив
                if (k & 1 << 5) {
                    //Провірка біт 4 rele_0_eprom_sensor вкл або викл реле при переключені
                    radiochangeRadio[0].checked = true;;
                    // radiochangeRadio[1].checked = false;
                } else {
                    // radiochangeRadio[0].checked = false;
                    radiochangeRadio[1].checked = true;
                }

            if (!(releError == null)) //якщо не пустий масив
                if (k & 1 << 6) {
                    //біт 6 при несправності термодатчика або неможливість управляти таймером реле залишаємо вкл 1 або відключеним -0
                    releError[0].checked = true;
                    // releError[1].checked = false;
                } else {
                    // releError[0].checked = false;
                    releError[1].checked = true;
                }

            //------------------------------------

            const option = select.querySelectorAll('option');

            option.forEach(function (e, i) {
                //видаляємо всі option elements для даного реле крім першого
                if (i > 0) e.remove();
            });

            for (let numEepromSensor = 0; numEepromSensor < 8; numEepromSensor++) {
                //перебираємо всі термодатчики
                let numRele = 15; //номер реле в якому записаний термодатчик
                for (let d = 0; d < 8; d++) {
                    //
                    z = sensorEepromControl.obj[d].number;
                    z &= ~240;
                    if (z == numEepromSensor) {
                        //Нaходимо в масиві для реле номер термодатчика
                        numRele = d;
                        console.log('numRele - ' + numRele);
                        break;
                    }
                }

                //якщо адрес не нуль добавляємо  і термодатчика немає в списку реле або він є але записаний в тому реле з яким ми працюємо option з адресом
                if (eepromData.obj != undefined) {
                    if (!(eepromData.obj[numEepromSensor].address == '0000000000000000' || eepromData.obj[numEepromSensor].address == 'ffffffffffffffff') && (numRele == clickRele || numRele == 15)) {

                        const releSetingSwitchSensor = e.querySelector('.rele__seting-switch__sensor');

                        const createOption = document.createElement('option');
                        createOption.value = eepromData.obj[numEepromSensor].number;
                        createOption.className = "rele-control-option";

                        if (sensorNames.obj != undefined && sensorNames.obj[numEepromSensor].nameSensor != '') {
                            createOption.innerText = eepromData.obj[numEepromSensor].number + '--' + sensorNames.obj[numEepromSensor].nameSensor + ' -- ' + eepromData.obj[numEepromSensor].temp;
                        } else {
                            createOption.innerText = eepromData.obj[numEepromSensor].number + '--' + eepromData.obj[numEepromSensor].address.toLocaleUpperCase() + ' -- ' + eepromData.obj[numEepromSensor].temp;
                        }

                        if (numRele == clickRele) {
                            createOption.selected = true; //Добавляємо вибраним реле яке є в списку керованих
                        }
                        select.appendChild(createOption);
                    }

                    try {
                        if (numSensor != 15) {
                            if (sensorNames.obj != undefined && sensorNames.obj[numSensor].nameSensor != '') {
                                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = sensorNames.obj[numSensor].nameSensor + '  ' + eepromData.obj[numSensor].temp;
                                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';

                            } else {
                                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = eepromData.obj[numSensor].address.toLocaleUpperCase() + '  ' + eepromData.obj[numSensor].temp;
                                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
                            }
                        } else {
                            e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
                        }
                    } catch (e) {
                        console.log('ERROR numSensor  -- ' + numSensor)
                    }

                }

            }

        });
    }
}

function fun2() {
    const inputTempVkl = document.querySelectorAll('.rele-temp-vkl');
    const inputTempOtkl = document.querySelectorAll('.rele-temp-otkl');
    const releSetingSwitchTempOn = document.querySelectorAll('.rele__seting-switch__temp-on')
    const releSetingSwitchTempOff = document.querySelectorAll('.rele__seting-switch__temp-off')
    try {


        for (let _i = 0; _i < inputTempVkl.length; _i++) {
            // if (releSetingSwitchTempOn != null && releSetingSwitchTempOn != undefined) releSetingSwitchTempOn[_i].innerText = 'TEMP_ON  ' + sensorOpenCloseTemperature .obj[_i].vkl;
            // if (releSetingSwitchTempOff != null && releSetingSwitchTempOff != undefined) releSetingSwitchTempOff[_i].innerText = 'TEMP_OFF  ' + sensorOpenCloseTemperature .obj[_i].otkl;
            if (releSetingSwitchTempOn) releSetingSwitchTempOn[_i].innerText = 'TEMP_ON  ' + sensorOpenCloseTemperature.obj[_i].vkl;
            if (releSetingSwitchTempOff) releSetingSwitchTempOff[_i].innerText = 'TEMP_OFF  ' + sensorOpenCloseTemperature.obj[_i].otkl;
            inputTempVkl[_i].value = sensorOpenCloseTemperature.obj[_i].vkl;
            inputTempOtkl[_i].value = sensorOpenCloseTemperature.obj[_i].otkl;
        }
    } catch (e) {
        console.log('ERROR  ' + e);
    }
}

function semd_mess() {
    sendMessage(outstartDataSensor, 'ALL');
}

// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
function addBeforeNullNUmber(number) {
    if (number > 9) return number;
    else return '0' + number;
}
// -------------------------------------------------------------------------------------------------------


function CheckClickDevices() {
    let flag = false;
    parentListEeprom.forEach(function (e) {
        if (e.classList.contains('active')) {
            //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
            flag = true;
        }
    });

    if (flag) {
        //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
        parentListDevice.forEach(function (e, i) {
            if (i > 0 && e.classList.contains('red')) {
                //якщо датчика немає в списку то ми його робимо клікабельним
                e.classList.add('click');
            }
        });
    } else {
        parentListDevice.forEach(function (e, i) {
            if (i > 0) {
                //якщо датчика немає в списку то ми його робимо клікабельним
                e.classList.remove('click');
            }
        });
    }
}

function compareSensorAddress() {
    compareSensorAddressHtml();
}

function compareSensorAddressHtml() {
    for (let _k3 = 1; _k3 < deviceInfo.obj.length + 1; _k3++) {
        tableDeviceAddress[_k3].closest('.address-device__data').classList.add('red');
        for (let _n = 1; _n < 9; _n++) {
            if (tableDeviceAddress[_k3].textContent == tableEepromAddress[_n].textContent) {
                tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('red');
                tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('click');
                break;
            }
        }
    }
    CheckClickDevices();
}



//************************************************************************************************************** */
function isEmpty(obj) {
    //Провірка на пусті обєкти 
    for (let key in obj) {
        return false;
    }
    return true;
}
//************************************************************************************************************** */

function showSectionTimeAndSeting(event, parent, classLink, classShowSection, num) { //Покузує або скриває блок з настройками
    event.preventDefault();
    if (event.target.classList.contains('on')) {
        parent.querySelector(classLink).classList.remove(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.remove('show-block');
        if (event.target.classList.contains('rele__control-manually-show')) {
            parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
            s = num + 'x' + '0' + 'k';
            console.log('s----' + s);
            sendMessage(setReleEpromUprManual, s);
        }
        event.target.classList.remove('on');
    } else {
        parent.querySelector(classLink).classList.add(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.add('show-block');
        if (event.target.classList.contains('rele__control-manually-show')) {
            parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
            s = num + 'x' + '1' + 'k';
            console.log('s----' + s);
            sendMessage(setReleEpromUprManual, s);
        }
        event.target.classList.add('on');
    }
}

function switchSeting(event, parent) { //Покузує або скриває блок з настройками
    console.log('testtest')
    if (event.target.classList.contains('on')) {
        parent.querySelector('.rele__seting-svg').classList.add('rele__seting-svg-on');
        parent.querySelector('.rele__section-seting').classList.add('show-block');
        event.target.classList.remove('on');
    } else {
        parent.querySelector('.rele__seting-svg').classList.remove('rele__seting-svg-on');
        parent.querySelector('.rele__section-seting').classList.remove('show-block');
        event.target.classList.add('on');
    }
}

function showSectionTime(event, parent) {
    if (event.target.classList.contains('on')) {
        parent.querySelector('.rele__timer-seting-svg').classList.add('rele__timer-seting-svg-on');
        parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас
        event.target.classList.remove('on');
    } else {
        parent.querySelector('.rele__timer-seting-svg').classList.remove('rele__timer-seting-svg-on');
        parent.querySelector('.rele-control-timer').classList.remove('block__show');
        event.target.classList.add('on');
    }
}
// ********************************************************************************************************************************************************************
function showTimerIcons(parent, datetime, time) {
    const timerIcons = parent.querySelectorAll('.rele__timer-seting-icon');
    for (let d = 0, t = 0; d < 10; d += 2, t += 10) {
        const datetimeValue = new Date(datetime[d].value).getTime();
        const timeValue = time[t].value;
        if (d == 0) {
            if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[0].classList.add('show-block');
            else timerIcons[0].classList.remove('show-block');
        }
        if (d == 2) {
            if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[1].classList.add('show-block');
            else timerIcons[1].classList.remove('show-block');
        }
        if (d == 4) {
            if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[2].classList.add('show-block');
            else timerIcons[2].classList.remove('show-block');
        }
        if (d == 6) {
            if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[3].classList.add('show-block');
            else timerIcons[3].classList.remove('show-block');
        }
        if (d == 8) {
            if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[4].classList.add('show-block');
            else timerIcons[4].classList.remove('show-block');
        }
    }
}






//       parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас відкриваємо Select
//     } else {
//       parent.querySelector('.rele-control-timer').classList.remove('block__show');



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
            dateTimeArray[numberReleClick].time[i] = t2;
        } else {
            dateTimeArray[numberReleClick].timeRealList[i] = '';
            dateTimeArray[numberReleClick].time[i] = '';
        }

        //   // ********************************************************************************************************************************************************************

        for (let _n4 = 0; _n4 < 49; _n4 += 2) {

            if (dateTimeArray[numberReleClick].time[_n4] >= dateTimeArray[numberReleClick].time[_n4 + 1] && dateTimeArray[numberReleClick].time[_n4 + 1] !== '') {
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
                if (dateTimeArray[numberReleClick].time[_n5] + 1 > dateTimeArray[numberReleClick].time[_n5 + 1] && dateTimeArray[numberReleClick].time[_n5 + 1] !== '') {
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



