




let options = {
    onSuccess: onConnect,
    onFailure: doFail
};

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(getEepromSensorData);
    client.subscribe(getDeviceSensorData);
    client.subscribe(getReleEpromUpr);
    client.subscribe(getSensorVklOtklTemp);
    client.subscribe(stanRele);
    client.subscribe(getSensorName);
    client.subscribe(getReleName);
    client.subscribe(getReleEpromUprManual);
    client.subscribe(getReleDATATIME);
    client.subscribe(CONNECT_SSID);
    client.subscribe(LOCAL_IP);
    client.subscribe(getanaloInputA0);

    // sendMessage(outstartDataSensor, 'readAddressSensor');
    // sendMessage(outstartDataSensor, 'releControl');
    // sendMessage(outstartDataSensor, 'ReadTempVklOtkl');
    // sendMessage(outstartDataSensor, 'ReadDate');
    // sendMessage(outstartDataSensor, 'NameSensor');
    // sendMessage(outstartDataSensor, 'NameRele');
    // sendMessage(outstartDataSensor, 'ReleManual');

    // sendMessage(outCleareEPROM, 'ff');
    // sendMessage(outCleareEPROM, '00');
    sendMessage(outstartDataSensor, 'ALL');
    // console.log('ALL');
}

function doFail(e) { }
// console.log(e);
// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
//************************************************************************************************************** */
function sendMessage(topic, message) {
    let mes = new Paho.MQTT.Message(message);
    mes.destinationName = topic;
    mes.qos = 0;
    client.send(mes);
    // console.log('KKKKKKKKKKKKKKKK');
}
// *************************************************************************************************************************
let obj_1 = void 0;
let obj_2 = void 0;
let obj_3 = void 0;

function onMessageArrived(message) {
    setTimeout(() => {
        // called when a message arrives
        // console.log("onMessageArrived:  " + message.payloadString);
        //  console.log("onMessageArrived:  "+message.destinationName);
        //************************************************************************************************************** */
        if (message.destinationName === getanaloInputA0) {
            // console.log(message.payloadString);
            printAnalogInput.innerText = message.payloadString;
        }
        //************************************************************************************************************** */
        if (message.destinationName === CONNECT_SSID) {
            // console.log(message.payloadString);
            document.querySelector('.info__ssid').innerText = message.payloadString;
        }
        //************************************************************************************************************** */

        if (message.destinationName === LOCAL_IP) {
            // console.log(message.payloadString);
            document.querySelector('.info__ip').innerText = message.payloadString;
        }

        //************************************************************************************************************** */

        if (message.destinationName === getEepromSensorData) {
            //Дані що знаходяться в EEPROM позиція, мак адрес, і температура сенсору
            eepromData = JSON.parse(message.payloadString);
            // console.log(eepromData );
            for (let _k = 0; _k < eepromData.obj.length; _k++) {
                if (showEepromData) {
                    tableEepromNumber[_k + 1].innerText = eepromData.obj[_k].number;
                    tableEepromAddress[_k + 1].innerText = eepromData.obj[_k].address.toLocaleUpperCase();
                }
                tableEepromTemp[_k + 1].innerText = eepromData.obj[_k].temp.toFixed(1);

                if (eepromData.obj[_k].address != '0000000000000000') {
                    if (sensorNames.obj != undefined) {
                        // console.log('7777777777777 ');
                        // console.log(sensorNames.obj);
                        popapTemp[_k].textContent = (sensorNames.obj[_k].nameSensor) + ' ' + (eepromData.obj[_k].temp.toFixed(1));
                    } else {
                        popapTemp[_k].innerText = eepromData.obj[_k].temp.toFixed(1);
                    }
                } else {
                    popapTemp[_k].closest('.popap-info__lamp-item').classList.add('shiden');
                }


            }

            isEepromDataDownloaded = true;
            if (isDeviceDataDownloaded && isEepromDataDownloaded) compareSensorAddress();
        }

        //************************************************************************************************************** */

        if (message.destinationName === getDeviceSensorData) {
            //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
            deviceInfo = JSON.parse(message.payloadString);
            // console.log('deviceInfo ');
            // console.log(deviceInfo );
            for (let _k2 = 0; _k2 < deviceInfo.obj.length; _k2++) {
                tableDeviceNumber[_k2 + 1].innerText = deviceInfo.obj[_k2].number;
                tableDeviceAddress[_k2 + 1].innerText = deviceInfo.obj[_k2].address.toLocaleUpperCase();
                tableDeviceTemp[_k2 + 1].innerText = deviceInfo.obj[_k2].temp.toFixed(1);
            }
            isDeviceDataDownloaded = true;
            if (isDeviceDataDownloaded && isEepromDataDownloaded) {
                fun1();
                compareSensorAddress();
            }
        }

        //************************************************************************************************************** */
        //біт 0-3 номер датчика який управляє даним реле
        // біт 4 один або два діапазона контроля температрур
        // біт 5 вкл або викл реле при зміні температур або таймера
        // біт 6 стан реле при помилці термодатчмка
        if (message.destinationName === getReleEpromUpr) {
            //получаємо дані з памяті про датчики 
            sensorEepromControl = JSON.parse(message.payloadString);
            // console.log('sensorEepromControl  *****');
            // console.log(sensorEepromControl );

            fun1();
        }

        //************************************************************************************************************** */

        if (message.destinationName === getSensorVklOtklTemp) {
            //получаємо дані з памяті про температури включення і відкючення
            sensorOpenCloseTemperature = JSON.parse(message.payloadString);
            // console.log('sensorOpenCloseTemperature  *****');
            // console.log(message.payloadString);
            fun2();
        }

        //************************************************************************************************************** */

        if (message.destinationName === stanRele) {
            //получаємо дані про стан кожного реле включене або відключене 
            let stanReleTemp = parseInt(message.payloadString);
            const releOnOff = document.querySelectorAll('.rele__control-manually-on-off');
            for (n = 0; n < 8; n++) {
                //Засвічуємо або гасимо лампочки
                if (stanReleTemp & 1 << n) {
                    releOnOff[n].checked = false;
                    popapInfoTempItem[n].classList.remove('on')
                } else {
                    releOnOff[n].checked = true;
                    popapInfoTempItem[n].classList.add('on');
                }
            }
        }

        //************************************************************************************************************** */

        if (message.destinationName === getSensorName) {

            try {
                // console.log('getSensorName');
                // console.log(message.payloadString);
                //получаємо дані про стан кожного реле
                sensorNames = JSON.parse(message.payloadString);
                tableEepromNameSensor.forEach(function (e, i) {

                    if (i > 0) {
                        e.value = sensorNames.obj[i - 1].nameSensor;
                    }
                });
                // console.log(sensorNames);

            } catch (e) {
                console.log('ERROR NAME SENSOR' + e);
                sendMessage(setDefineDevice, 'setDefineDevice');
                console.log('DEFAULT_DEVICE');
            }
        }

        //************************************************************************************************************** */

        if (message.destinationName === getReleName) {
            try {
                // console.log('getReleName');
                // console.log(message.payloadString);

                //получаємо дані про стан кожного реле
                relayNames = JSON.parse(message.payloadString);

                const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
                releItemTitleName.forEach((e, i) => {
                    e.textContent = relayNames.obj[i].nameRele;

                });

                releNameInput.forEach(function (e, i) {
                    e.value = relayNames.obj[i].nameRele;
                    popapInfoTempItem[i].textContent = relayNames.obj[i].nameRele;
                    releItemTitleName[i].textContent = relayNames.obj[i].nameRele;
                });
                // console.log('relayNames');

            } catch (e) {
                console.log('ERROR NAME RELE' + e);
                sendMessage(setDefineDevice, 'setDefineDevice');
                console.log('DEFAULT_DEVICE');
            }

        }
        //" "
        //************************************************************************************************************** */

        if (message.destinationName === getReleEpromUprManual) {

            //получаємо дані про стан кожного реле
            let relaySettings = JSON.parse(message.payloadString);
            console.log('message.payloadString   ////// getReleEpromUprManual');
            console.log(message.payloadString);
            document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
                const parent = e.closest('.rele__item');
                console.log("testttt")
                if (relaySettings.obj[i].namberRele == 1) {
                    // e.checked = true;
                    parent.querySelector('.input-control-manually-svg').classList.add('on');
                    parent.querySelector('.rele__control-manually-show').classList.add('on');
                    parent.querySelector('.rele__control-manually').classList.add('show-block'); //Добавляємо клас відкриваємо Select
                    parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
                } else if (relaySettings.obj[i].namberRele == 0) {
                    // e.checked = false;
                    parent.querySelector('.input-control-manually-svg').classList.remove('on');
                    parent.querySelector('.rele__control-manually-show').classList.remove('on');

                    parent.querySelector('.rele__control-manually').classList.remove('show-block');
                    parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
                }
            });

        }

        //************************************************************************************************************** */

        if (message.destinationName === getReleDATATIME) {
            //получаємо дані про таймери
            let tempObj = JSON.parse(message.payloadString);
            // console.log(message.payloadString);
            if (tempObj.NUMPACKAGE === 1) {
                obj_1 = Object.assign({}, tempObj);
            }

            if (tempObj.NUMPACKAGE === 2) {
                obj_2 = Object.assign({}, tempObj);
                // console.log('obj_2');
                // console.log(obj_2);
            }

            if (tempObj.NUMPACKAGE === 3) {
                obj_2.TIME = obj_2.TIME.concat(tempObj.TIME);
                //  console.log('obj_2');
                //  console.log(obj_2);
            }

            if (tempObj.NUMPACKAGE === 4) {
                obj_3 = Object.assign({}, tempObj);
                // obj_3 = JSON.parse(message.payloadString);
                relaySettings = Object.assign(obj_1, obj_2, obj_3);
                // console.log(relaySettings);
                let namberRele = parseInt(relaySettings.NUM);
                const dateTimeInput = releItem[namberRele].querySelectorAll('.datetime');
                const timeInput = releItem[namberRele].querySelectorAll('.time');
                const dayWikend = releItem[namberRele].querySelectorAll('.day');
                // const parent =  releItem[namberRele];


                dateTimeInput.forEach(function (e) {
                    e.value = '';
                });

                timeInput.forEach(function (e) {
                    e.value = '';
                });

                dayWikend.forEach(function (e) {
                    e.checked = true; //ttt
                });

                let delaySecondStart = parseInt(relaySettings.DELAYSECONDSTART);

                if (delaySecondStart < 36000) releControlTimer[namberRele].value = delaySecondStart;
                else releControlTimer[namberRele].value = '0';

                // dateTimeInput[0].value = "2022-05-02T12:55";
                for (i = 0; i < 9; i += 2) {
                    if (relaySettings.DATATIME[i] != '65535-99-99T99:99' && relaySettings.DATATIME[i + 1] != '65535-99-99T99:99') {
                        // console.log(relaySettings.DATATIME[i]);
                        // console.log(relaySettings.DATATIME[i + 1]);
                        dateTimeInput[i].value = relaySettings.DATATIME[i];
                        dateTimeInput[i + 1].value = relaySettings.DATATIME[i + 1];
                        dateTimeArray[namberRele].Datetime[i] = new Date(relaySettings.DATATIME[i]).getTime();
                        dateTimeArray[namberRele].DatetimeReal[i] = new Date(relaySettings.DATATIME[i]);
                        dateTimeArray[namberRele].Datetime[i + 1] = new Date(relaySettings.DATATIME[i + 1]).getTime();
                        dateTimeArray[namberRele].DatetimeReal[i + 1] = new Date(relaySettings.DATATIME[i + 1]);
                    }
                }

                for (i = 0; i < 49; i += 2) {
                    if (relaySettings.TIME[i] != '99:99' && relaySettings.TIME[i + 1] != '99:99') {
                        // console.log(relaySettings.TIME[i]); 
                        // console.log( relaySettings.TIME[i+1]);

                        timeInput[i].value = relaySettings.TIME[i];
                        timeInput[i + 1].value = relaySettings.TIME[i + 1];
                        dateTimeArray[namberRele].time[i] = new Date(relaySettings.DATATIME[i]);
                        dateTimeArray[namberRele].timeReal[i + 1] = new Date(relaySettings.DATATIME[i + 1]);
                    }
                }


                // if(eve.target.checked){
                //   eve.target.previousElementSibling.classList.add('checked');
                // }else{
                //   eve.target.previousElementSibling.classList.remove('checked');
                // }


                for (i = 0; i < 35; i++) {
                    if (relaySettings.DEY[i] == 1) {
                        dayWikend[i].checked = true;
                        dayWikend[i].previousElementSibling.classList.add('checked');
                    } ///ttt
                    if (relaySettings.DEY[i] == 0) {
                        dayWikend[i].checked = false;
                        dayWikend[i].previousElementSibling.classList.remove('checked');
                    } ///ttt
                }

                // releItem.forEach(function (parent, i) {
                //   const firstDataElement = parent.querySelector('.datetime');
                //   const firstTimeElement = parent.querySelector('.time');
                //   const changeEvent = new Event('change'); // создаем событие
                //   firstDataElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
                //   firstTimeElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
                //   // const clickEvent = new Event('click'); // создаем событие
                //   // firstDataElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
                //   // firstTimeElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
                // });

                document.querySelectorAll('.rele__item').forEach((parent) => {
                    const datetime = parent.querySelectorAll('.datetime');
                    const time = parent.querySelectorAll('.time');
                    // switchSeting( parent);
                    // chekChecedDay(event);
                    chekDate(parent, datetime, time);
                    chekTime(parent, datetime, time);
                    showTimerIcons(parent, datetime, time); //Добавляє іконки таймера

                });

            }
            // 2022-5-17T14:26
        }
        //************************************************************************************************************** */
    }, 1000);

}

