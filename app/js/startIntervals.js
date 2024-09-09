function startIntervals() {
    const checkEmptyDataInterval = setInterval(checkEmptyData, 15000);
    const refreshEepromDataInterval = setInterval(refreshEepromData, 10000);
    const updateDateTimeInterval = setInterval(updateDateTime, 1000);

    function checkEmptyData() {
        if (isEmpty(eepromData) || isEmpty(deviceData) || isEmpty(sensorEepromControl) || isEmpty(sensorOpenCloseTemperature)) {
            console.log('Є пусті об’єкти');
            sendMessage(outstartDataSensor, 'ALL');
        } else {
            console.log('Немає пустих об’єктів');
        }
    }

    function refreshEepromData() {
        showEepromData = false;
        sendMessage(outstartDataSensor, 'readAddressSensor');
    }

    function updateDateTime() {
        let date = new Date();
        let newDateFormat = date.getFullYear() + '-' +
            addBeforeNullNUmber(date.getMonth() + 1) + '-' +
            addBeforeNullNUmber(date.getDate()) + ' ' +
            addBeforeNullNUmber(date.getHours()) + ':' +
            addBeforeNullNUmber(date.getMinutes()) + ':' +
            addBeforeNullNUmber(date.getSeconds());
        document.querySelector('.popap-info__date-time').innerText = newDateFormat;
    }
}
