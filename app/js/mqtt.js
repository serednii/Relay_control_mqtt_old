




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
    sendMessage(outstartDataSensor, 'ALL');
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




function onMessageArrived11(message) {
    setTimeout(() => {
        try {
            handleAnalogInput(message);
            handleSSID(message);
            handleLocalIP(message);
            handleEepromSensorData(message);
            handleDeviceSensorData(message);
            handleReleEpromUpr(message);
            handleSensorVklOtklTemp(message);
            handleReleState(message);
            handleSensorNames(message);
            handleReleNames(message);
            handleReleEpromUprManual(message);
            handleReleDateTime(message);
        } catch (e) {
            console.error('Error in onMessageArrived: ', e);
        }
    }, 1000);
}

function handleAnalogInput(message) {
    try {
        if (message.destinationName === getanaloInputA0) {
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
        if (message.destinationName === getEepromSensorData) {
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
            popapTemp[index].textContent = sensorNames.obj[index].nameSensor + ' ' + eepromData.obj[index].temp.toFixed(1);
        } else {
            popapTemp[index].innerText = eepromData.obj[index].temp.toFixed(1);
        }
    } else {
        popapTemp[index].closest('.popap-info__lamp-item').classList.add('shiden');
    }
}

function handleDeviceSensorData(message) {
    try {
        if (message.destinationName === getDeviceSensorData) {
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
        if (message.destinationName === getReleEpromUpr) {
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
        if (message.destinationName === getSensorVklOtklTemp) {
            sensorOpenCloseTemperature = JSON.parse(message.payloadString);
            updateRelayTemperatureSettings();
        }
    } catch (e) {
        console.error('Error in handleSensorVklOtklTemp: ', e);
    }
}

function updateRelayTemperatureSettings() {
    // Логіка для оновлення температурних налаштувань реле
}

function handleReleState(message) {
    try {
        if (message.destinationName === stanRele) {
            const stanReleTemp = parseInt(message.payloadString);
            updateReleState(stanReleTemp);
        }
    } catch (e) {
        console.error('Error in handleReleState: ', e);
    }
}

function updateReleState(stanReleTemp) {
    const releOnOff = document.querySelectorAll('.rele__control-manually-on-off');
    for (let n = 0; n < 8; n++) {
        if (stanReleTemp & (1 << n)) {
            releOnOff[n].checked = false;
            popapInfoTempItem[n].classList.remove('on');
        } else {
            releOnOff[n].checked = true;
            popapInfoTempItem[n].classList.add('on');
        }
    }
}

function handleSensorNames(message) {
    try {
        if (message.destinationName === getSensorName) {
            sensorNames = JSON.parse(message.payloadString);
            updateSensorNames();
        }
    } catch (e) {
        console.error('Error in handleSensorNames: ', e);
        sendMessage(setDefineDevice, 'setDefineDevice');
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
        if (message.destinationName === getReleName) {
            relayNames = JSON.parse(message.payloadString);
            updateReleNames();
        }
    } catch (e) {
        console.error('Error in handleReleNames: ', e);
        sendMessage(setDefineDevice, 'setDefineDevice');
    }
}

function updateReleNames() {
    const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
    releItemTitleName.forEach((e, i) => {
        e.textContent = relayNames.obj[i].nameRele;
    });

    releNameInput.forEach(function (e, i) {
        e.value = relayNames.obj[i].nameRele;
        popapInfoTempItem[i].textContent = relayNames.obj[i].nameRele;
        releItemTitleName[i].textContent = relayNames.obj[i].nameRele;
    });
}

function handleReleEpromUprManual(message) {
    try {
        if (message.destinationName === getReleEpromUprManual) {
            let relaySettings = JSON.parse(message.payloadString);
            updateRelayManualSettings(relaySettings);
        }
    } catch (e) {
        console.error('Error in handleReleEpromUprManual: ', e);
    }
}

function updateRelayManualSettings(relaySettings) {
    document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
        const parent = e.closest('.rele__item');
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
        if (message.destinationName === getReleDATATIME) {
            let relaySettings = parseRelayDateTime(message.payloadString);
            updateRelayDateTimeSettings(relaySettings);
        }
    } catch (e) {
        console.error('Error in handleReleDateTime: ', e);
    }
}

function parseRelayDateTime(payload) {
    let obj_1, obj_2, obj_3;
    const tempObj = JSON.parse(payload);
    if (tempObj.obj.length == 3) {
        obj_1 = tempObj.obj[0];
        obj_2 = tempObj.obj[1];
        obj_3 = tempObj.obj[2];
    } else {
        obj_1 = tempObj.obj[0];
        obj_2 = tempObj.obj[0];
        obj_3 = tempObj.obj[0];
    }
    return [obj_1, obj_2, obj_3];
}

function updateRelayDateTimeSettings(relaySettings) {
    document.querySelectorAll('.rele__control-data-time').forEach(function (e, i) {
        const relayObj = relaySettings[i];
        e.querySelector('.rele__control-time-on').innerText = relayObj.timeOn;
        e.querySelector('.rele__control-time-off').innerText = relayObj.timeOff;
    });
}

function sendMessage(topic, message) {
    // Функція для надсилання повідомлень на MQTT сервер
}
