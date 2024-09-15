




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
    client.subscribe(GET_EEPROM_SENSOR_DATA);
    client.subscribe(GET_DEVICE_SENSOR_DATA);
    client.subscribe(GET_RELAY_EEPROM_UPR);
    client.subscribe(GET_SENSOR_TEMP_ON_OFF);
    client.subscribe(RELAY_STATUS);
    client.subscribe(GET_SENSOR_NAME);
    client.subscribe(GET_RELAY_NAME);
    client.subscribe(GET_RELAY_EEPROM_CONTROL_MANUAL);
    client.subscribe(GET_RELAY_DATA_TIME);
    client.subscribe(CONNECT_SSID);
    client.subscribe(LOCAL_IP);
    client.subscribe(GET_ANALOG_INPUT_A0);
    sendMessage(OUT_START_DATA_SENSOR, 'ALL');
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
}
// *************************************************************************************************************************



let obj_1, obj_2, obj_3;

function onMessageArrived(message) {
    try {
        handleAnalogInput(message);
        handleSSID(message);
        handleLocalIP(message);
        handleReleEpromUprManual(message);
        handleReleState(message);
        handleSensorVklOtklTemp(message);
        handleReleEpromUpr(message);
        handleEepromSensorData(message);
        handleDeviceSensorData(message);
        handleSensorNames(message);
        handleReleNames(message);
        handleReleDateTime(message);
    } catch (e) {
        console.error('Error in onMessageArrived: ', e);
    }
}

function handleAnalogInput(message) {
    try {
        if (message.destinationName === GET_ANALOG_INPUT_A0) {
            printAnalogInput.innerText = message.payloadString;
        }
    } catch (e) {
        console.error('Error in handleAnalogInput: ', e);
    }
}

function handleSSID(message) {
    try {
        if (message.destinationName === CONNECT_SSID) {
            document.querySelector('.info__ssid').innerText = message.payloadString;
        }
    } catch (e) {
        console.error('Error in handleSSID: ', e);
    }
}

function handleLocalIP(message) {
    try {
        if (message.destinationName === LOCAL_IP) {
            document.querySelector('.info__ip').innerText = message.payloadString;
        }
    } catch (e) {
        console.error('Error in handleLocalIP: ', e);
    }
}

function handleEepromSensorData(message) {
    try {
        if (message.destinationName === GET_EEPROM_SENSOR_DATA) {
            eepromData = JSON.parse(message.payloadString);
            for (let _k = 0; _k < eepromData.obj.length; _k++) {
                updateEepromTable(_k);
            }
            isEepromDataDownloaded = true;
            checkAndUpdateData();
        }
    } catch (e) {
        console.error('Error in handleEepromSensorData: ', e);
    }
}

function updateEepromTable(index) {
    if (showEepromData) {
        tableEepromNumber[index + 1].innerText = eepromData.obj[index].number;
        tableEepromAddress[index + 1].innerText = eepromData.obj[index].address.toUpperCase();
    }
    tableEepromTemp[index + 1].innerText = eepromData.obj[index].temp.toFixed(1);

    if (eepromData.obj[index].address != '0000000000000000') {
        if (sensorNames.obj != undefined) {
            popupTemp[index].textContent = sensorNames.obj[index].nameSensor + ' ' + eepromData.obj[index].temp.toFixed(1);
        } else {
            popupTemp[index].innerText = eepromData.obj[index].temp.toFixed(1);
        }
    } else {
        popupTemp[index].closest('.popap-info__lamp-item').classList.add('shiden');
    }
}

function handleDeviceSensorData(message) {
    try {
        if (message.destinationName === GET_DEVICE_SENSOR_DATA) {
            deviceData = JSON.parse(message.payloadString);
            for (let _k2 = 0; _k2 < deviceData.obj.length; _k2++) {
                updateDeviceTable(_k2);
            }
            isDeviceDataDownloaded = true;
            checkAndUpdateData();
        }
    } catch (e) {
        console.error('Error in handleDeviceSensorData: ', e);
    }
}

function updateDeviceTable(index) {
    tableDeviceNumber[index + 1].innerText = deviceData.obj[index].number;
    tableDeviceAddress[index + 1].innerText = deviceData.obj[index].address.toUpperCase();
    tableDeviceTemp[index + 1].innerText = deviceData.obj[index].temp.toFixed(1);
}

function checkAndUpdateData() {
    if (isDeviceDataDownloaded && isEepromDataDownloaded) {
        updateRelaySettings();
        highlightMismatchedSensorAddresses();
    }
}

function handleReleEpromUpr(message) {
    try {
        if (message.destinationName === GET_RELAY_EEPROM_UPR) {
            sensorEepromControl = JSON.parse(message.payloadString);
            updateRelaySettings();
        }
    } catch (e) {
        console.error('Error in handleReleEpromUpr: ', e);
    }
}

function updateRelaySettings() {
    // Логіка для оновлення налаштувань реле на основі sensorEepromControl
}

function handleSensorVklOtklTemp(message) {
    try {
        if (message.destinationName === GET_SENSOR_TEMP_ON_OFF) {
            sensorOpenCloseTemperature = JSON.parse(message.payloadString);
            updateRelayTemperatureSettings();
        }
    } catch (e) {
        console.error('Error in handleSensorVklOtklTemp: ', e);
    }
}


function handleReleState(message) {
    try {
        if (message.destinationName === RELAY_STATUS) {
            const stanReleTemp = parseInt(message.payloadString);
            console.log("message ", message)
            updateReleState(stanReleTemp);
        }
    } catch (e) {
        console.error('Error in handleReleState: ', e);
    }
}

function updateReleState(stanReleTemp) {
    const relayOnOff = document.querySelectorAll('.rele__control-manually-on-off');
    for (let n = 0; n < 8; n++) {
        if (stanReleTemp & (1 << n)) {
            relayOnOff[n].checked = false;
            popupInfoTempItem[n].classList.remove('on');
        } else {
            relayOnOff[n].checked = true;
            popupInfoTempItem[n].classList.add('on');
        }
    }
}

function handleSensorNames(message) {
    try {
        if (message.destinationName === GET_SENSOR_NAME) {
            sensorNames = JSON.parse(message.payloadString);
            updateSensorNames();
        }
    } catch (e) {
        console.error('Error in handleSensorNames: ', e);
        sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
    }
}

function updateSensorNames() {
    tableEepromNameSensor.forEach(function (e, i) {
        if (i > 0) {
            e.value = sensorNames.obj[i - 1].nameSensor;
        }
    });
}

function handleReleNames(message) {
    try {
        if (message.destinationName === GET_RELAY_NAME) {
            relayNames = JSON.parse(message.payloadString);
            updateReleNames();
        }
    } catch (e) {
        console.error('Error in handleReleNames: ', e);
        sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
    }
}

function updateReleNames() {
    const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
    releItemTitleName.forEach((e, i) => {
        e.textContent = relayNames.obj[i].nameRele;
    });

    relayNameInput.forEach(function (e, i) {
        e.value = relayNames.obj[i].nameRele;
        popupInfoTempItem[i].textContent = relayNames.obj[i].nameRele;
        releItemTitleName[i].textContent = relayNames.obj[i].nameRele;
    });
}

function handleReleEpromUprManual(message) {
    try {
        if (message.destinationName === GET_RELAY_EEPROM_CONTROL_MANUAL) {
            let relaySettings = JSON.parse(message.payloadString);
            updateRelayManualSettings(relaySettings);
        }
    } catch (e) {
        console.error('Error in handleReleEpromUprManual: ', e);
    }
}

function updateRelayManualSettings(relaySettings) {
    document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
        const parent = e.closest(CLASS_RELAY_ITEM);
        if (relaySettings.obj[i].namberRele == 1) {
            parent.querySelector('.input-control-manually-svg').classList.add('on');
            parent.querySelector('.rele__control-manually-show').classList.add('on');
            parent.querySelector('.rele__control-manually').classList.add('show-block');
            parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden');
        } else if (relaySettings.obj[i].namberRele == 0) {
            parent.querySelector('.input-control-manually-svg').classList.remove('on');
            parent.querySelector('.rele__control-manually-show').classList.remove('on');
            parent.querySelector('.rele__control-manually').classList.remove('show-block');
            parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden');
        }
    });
}

function handleReleDateTime(message) {
    try {
        if (message.destinationName === GET_RELAY_DATA_TIME) {
            parseRelayDateTime(message.payloadString);

        }
    } catch (e) {
        console.error('Error in handleReleDateTime: ', e);
    }
}

function parseRelayDateTime(payload) {
    const tempObj = JSON.parse(payload);
    if (tempObj.NUMPACKAGE === 1) {
        obj_1 = Object.assign({}, tempObj);
    }

    if (tempObj.NUMPACKAGE === 2) {
        obj_2 = Object.assign({}, tempObj);
    }

    if (tempObj.NUMPACKAGE === 3) {
        obj_2.TIME = obj_2.TIME.concat(tempObj.TIME);
    }

    if (tempObj.NUMPACKAGE === 4) {
        obj_3 = Object.assign({}, tempObj);
        relaySettings = Object.assign(obj_1, obj_2, obj_3);
        console.log(relaySettings);
        const namberRele = parseInt(relaySettings.NUM);
        const dateTimeInput = relayItem[namberRele].querySelectorAll(CLASS_DATE_TIME);
        const timeInput = relayItem[namberRele].querySelectorAll('.time');
        const dayWikend = relayItem[namberRele].querySelectorAll('.day');

        dateTimeInput.forEach(e => e.value = '');
        timeInput.forEach(e => e.value = '');
        dayWikend.forEach(e => e.checked = true);

        const delaySecondStart = parseInt(relaySettings.DELAYSECONDSTART);

        if (delaySecondStart < 36000) relayControlTimer[namberRele].value = delaySecondStart;
        else relayControlTimer[namberRele].value = '0';

        // dateTimeInput[0].value = "2022-05-02T12:55";
        for (let i = 0; i < 9; i += 2) {
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

        for (let i = 0; i < 49; i += 2) {
            if (relaySettings.TIME[i] != '99:99' && relaySettings.TIME[i + 1] != '99:99') {
                // console.log(relaySettings.TIME[i]); 
                // console.log( relaySettings.TIME[i+1]);
                timeInput[i].value = relaySettings.TIME[i];
                timeInput[i + 1].value = relaySettings.TIME[i + 1];
                dateTimeArray[namberRele].timeList[i] = new Date(relaySettings.DATATIME[i]);
                dateTimeArray[namberRele].timeRealList[i + 1] = new Date(relaySettings.DATATIME[i + 1]);
            }
        }

        for (let i = 0; i < 35; i++) {
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
            const time = parent.querySelectorAll('.time');
            checkDate(parent, datetime, time);
            checkTime(parent, datetime, time);
            showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
        });

    }
}



