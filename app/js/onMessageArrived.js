function onMessageArrived11(message) {
    setTimeout(() => {
        // called when a message arrives
        // console.log("onMessageArrived:  " + message.payloadString);
        //  console.log("onMessageArrived:  "+message.destinationName);
        //************************************************************************************************************** */
        if (message.destinationName === GET_ANALOG_INPUT_A0) {
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

        if (message.destinationName === GET_EEPROM_SENSOR_DATA) {
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
                        popupTemp[_k].textContent = (sensorNames.obj[_k].nameSensor) + ' ' + (eepromData.obj[_k].temp.toFixed(1));
                    } else {
                        popupTemp[_k].innerText = eepromData.obj[_k].temp.toFixed(1);
                    }
                } else {
                    popupTemp[_k].closest('.popap-info__lamp-item').classList.add('shiden');
                }
            }

            isEepromDataDownloaded = true;
            if (isDeviceDataDownloaded && isEepromDataDownloaded) highlightMismatchedSensorAddresses();
        }

        //************************************************************************************************************** */

        if (message.destinationName === GET_DEVICE_SENSOR_DATA) {
            //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
            deviceData = JSON.parse(message.payloadString);
            // console.log('deviceData ');
            // console.log(deviceData );
            for (let _k2 = 0; _k2 < deviceData.obj.length; _k2++) {
                tableDeviceNumber[_k2 + 1].innerText = deviceData.obj[_k2].number;
                tableDeviceAddress[_k2 + 1].innerText = deviceData.obj[_k2].address.toLocaleUpperCase();
                tableDeviceTemp[_k2 + 1].innerText = deviceData.obj[_k2].temp.toFixed(1);
            }
            isDeviceDataDownloaded = true;
            if (isDeviceDataDownloaded && isEepromDataDownloaded) {
                updateRelaySettings();
                highlightMismatchedSensorAddresses();
            }
        }

        //************************************************************************************************************** */
        //біт 0-3 номер датчика який управляє даним реле
        // біт 4 один або два діапазона контроля температрур
        // біт 5 вкл або викл реле при зміні температур або таймера
        // біт 6 стан реле при помилці термодатчмка
        if (message.destinationName === GET_RELAY_EEPROM_UPR) {
            //получаємо дані з памяті про датчики 
            sensorEepromControl = JSON.parse(message.payloadString);
            // console.log('sensorEepromControl  *****');
            // console.log(sensorEepromControl );
            updateRelaySettings();
        }
        //************************************************************************************************************** */

        if (message.destinationName === GET_SENSOR_TEMP_ON_OFF) {
            //получаємо дані з памяті про температури включення і відкючення
            sensorOpenCloseTemperature = JSON.parse(message.payloadString);
            // console.log('sensorOpenCloseTemperature  *****');
            // console.log(message.payloadString);
            updateRelayTemperatureSettings();
        }

        //************************************************************************************************************** */

        if (message.destinationName === RELAY_STATUS) {
            //получаємо дані про стан кожного реле включене або відключене 
            const stanReleTemp = parseInt(message.payloadString);
            const releOnOff = document.querySelectorAll(CLASS_RELAY_CONTROL_MANUAL_ON_OFF);
            for (n = 0; n < 8; n++) {
                //Засвічуємо або гасимо лампочки
                if (stanReleTemp & 1 << n) {
                    releOnOff[n].checked = false;
                    popupInfoTempItem[n].classList.remove('on')
                } else {
                    releOnOff[n].checked = true;
                    popupInfoTempItem[n].classList.add('on');
                }
            }
        }

        //************************************************************************************************************** */

        if (message.destinationName === GET_SENSOR_NAME) {

            try {
                // console.log('GET_SENSOR_NAME');
                // console.log(message.payloadString);
                sensorNames = JSON.parse(message.payloadString);
                tableEepromNameSensor.forEach(function (e, i) {

                    if (i > 0) {
                        e.value = sensorNames.obj[i - 1].nameSensor;
                    }
                });
                // console.log(sensorNames);

            } catch (e) {
                console.log('ERROR NAME SENSOR' + e);
                sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
                console.log('DEFAULT_DEVICE');
            }
        }

        //************************************************************************************************************** */

        if (message.destinationName === GET_RELAY_NAME) {
            try {
                // console.log('GET_RELAY_NAME');
                // console.log(message.payloadString);
                relayNames = JSON.parse(message.payloadString);
                const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
                releItemTitleName.forEach((e, i) => {
                    e.textContent = relayNames.obj[i].nameRele;
                });

                relayNameInput.forEach(function (e, i) {
                    e.value = relayNames.obj[i].nameRele;
                    popupInfoTempItem[i].textContent = relayNames.obj[i].nameRele;
                    releItemTitleName[i].textContent = relayNames.obj[i].nameRele;
                });
                // console.log('relayNames');

            } catch (e) {
                console.log('ERROR NAME RELE' + e);
                sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
                console.log('DEFAULT_DEVICE');
            }
        }
        //" "
        //************************************************************************************************************** */

        if (message.destinationName === GET_RELAY_EEPROM_CONTROL_MANUAL) {


            let relaySettings = JSON.parse(message.payloadString);
            console.log('message.payloadString   ////// GET_RELAY_EEPROM_CONTROL_MANUAL');
            console.log(message.payloadString);
            document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
                const parent = e.closest(CLASS_RELAY_ITEM);
                if (relaySettings.obj[i].namberRele == 1) {
                    parent.querySelector('.input-control-manually-svg').classList.add('on');
                    parent.querySelector('.rele__control-manually-show').classList.add('on');
                    parent.querySelector('.rele__control-manually').classList.add('show-block'); //Добавляємо клас відкриваємо Select
                    parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
                } else if (relaySettings.obj[i].namberRele == 0) {
                    parent.querySelector('.input-control-manually-svg').classList.remove('on');
                    parent.querySelector('.rele__control-manually-show').classList.remove('on');
                    parent.querySelector('.rele__control-manually').classList.remove('show-block');
                    parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
                }
            });

        }

        //************************************************************************************************************** */

        if (message.destinationName === GET_RELAY_DATA_TIME) {

            //получаємо дані про таймери
            const tempObj = JSON.parse(message.payloadString);
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
                relaySettings = Object.assign(obj_1, obj_2, obj_3);
                // console.log(relaySettings);
                const namberRele = parseInt(relaySettings.NUM);
                const dateTimeInput = relayItem[namberRele].querySelectorAll(CLASS_DATE_TIME);
                const timeInput = relayItem[namberRele].querySelectorAll(CLASS_TIME);
                const dayWikend = relayItem[namberRele].querySelectorAll('.day');

                dateTimeInput.forEach(function (e) {
                    e.value = '';
                });

                timeInput.forEach(function (e) {
                    e.value = '';
                });

                dayWikend.forEach(function (e) {
                    e.checked = true; //ttt
                });

                const delaySecondStart = parseInt(relaySettings.DELAYSECONDSTART);

                if (delaySecondStart < 36000) relayControlTimer[namberRele].value = delaySecondStart;
                else relayControlTimer[namberRele].value = '0';

                // dateTimeInput[0].value = "2022-05-02T12:55";
                for (i = 0; i < 9; i += 2) {
                    if (relaySettings.DATATIME[i] != '65535-99-99T99:99' && relaySettings.DATATIME[i + 1] != '65535-99-99T99:99') {
                        // console.log(relaySettings.DATATIME[i]);
                        // console.log(relaySettings.DATATIME[i + 1]);
                        dateTimeInput[i].value = relaySettings.DATATIME[i];
                        dateTimeInput[i + 1].value = relaySettings.DATATIME[i + 1];
                        dateTimeArray[namberRele].dateTimeList[i] = new Date(relaySettings.DATATIME[i]).getTime();
                        dateTimeArray[namberRele].dateTimeRealList[i] = new Date(relaySettings.DATATIME[i]);
                        dateTimeArray[namberRele].dateTimeList[i + 1] = new Date(relaySettings.DATATIME[i + 1]).getTime();
                        dateTimeArray[namberRele].dateTimeRealList[i + 1] = new Date(relaySettings.DATATIME[i + 1]);
                    }
                }

                for (i = 0; i < 49; i += 2) {
                    if (relaySettings.TIME[i] != '99:99' && relaySettings.TIME[i + 1] != '99:99') {
                        // console.log(relaySettings.TIME[i]); 
                        // console.log( relaySettings.TIME[i+1]);
                        timeInput[i].value = relaySettings.TIME[i];
                        timeInput[i + 1].value = relaySettings.TIME[i + 1];
                        dateTimeArray[namberRele].timeList[i] = new Date(relaySettings.DATATIME[i]);
                        dateTimeArray[namberRele].timeRealList[i + 1] = new Date(relaySettings.DATATIME[i + 1]);
                    }
                }

                for (i = 0; i < 35; i++) {
                    if (relaySettings.DEY[i] == 1) {
                        dayWikend[i].checked = true;
                        dayWikend[i].previousElementSibling.classList.add('checked');
                    }
                    if (relaySettings.DEY[i] == 0) {
                        dayWikend[i].checked = false;
                        dayWikend[i].previousElementSibling.classList.remove('checked');
                    }
                }

                relayItem.forEach((parent) => {
                    const datetime = parent.querySelectorAll(CLASS_DATE_TIME);
                    const time = parent.querySelectorAll(CLASS_TIME);
                    checkDate(parent, datetime, time);
                    checkTime(parent, datetime, time);
                    showTimerIcons(parent, datetime, time); //Добавляє іконки таймера

                });

            }
            // 2022-5-17T14:26
        }
        //************************************************************************************************************** */
    }, 1000);

}

