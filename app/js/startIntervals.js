function startIntervals() {
    const checkEmptyDataInterval = setInterval(checkEmptyData, 15000);
    const refreshEepromDataInterval = setInterval(refreshEepromData, 10000);
    const updateDateTimeInterval = setInterval(updateDateTime, 1000);

    function checkEmptyData() {
        if (isEmpty(eepromData) || isEmpty(deviceData) || isEmpty(sensorEepromControl) || isEmpty(sensorOpenCloseTemperature)) {
            console.log('Є пусті об’єкти');
            sendMessage(OUT_START_DATA_SENSOR, 'ALL');
        } else {
            console.log('Немає пустих об’єктів');
        }
    }

    function refreshEepromData() {
        showEepromData = false;
        sendMessage(OUT_START_DATA_SENSOR, 'readAddressSensor');
    }

    function updateDateTime() {
        let date = new Date();
        let newDateFormat = date.getFullYear() + '-' +
            addBeforeNullNUmber(date.getMonth() + 1) + '-' +
            addBeforeNullNUmber(date.getDate()) + ' ' +
            addBeforeNullNUmber(date.getHours()) + ':' +
            addBeforeNullNUmber(date.getMinutes()) + ':' +
            addBeforeNullNUmber(date.getSeconds());
        document.querySelector('.popup-info__date-time').innerText = newDateFormat;
    }
}
