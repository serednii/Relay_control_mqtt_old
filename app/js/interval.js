
function interval() {

    setInterval(function () {
        // Провірка на дані прийшли чи ні якщо обєти пусті то відправляємо запрос на повторну загрузку

        if (isEmpty(eepromData) || isEmpty(deviceData) || isEmpty(sensorEepromControl) || isEmpty(sensorOpenCloseTemperature)) {
            console.log('Є пусті обкти   ');
            sendMessage(outstartDataSensor, 'ALL');
        } else {
            console.log('Немає пустих обктів   ');
        }
    }, 15000);

    setInterval(function () {
        showEepromData = false;
        sendMessage(outstartDataSensor, 'readAddressSensor');
    }, 10000);

    setInterval(function () {
        let date = new Date();
        let newDateFormat = date.getFullYear() + '-' +
            addBeforeNullNUmber(date.getMonth() + 1) + '-' +
            addBeforeNullNUmber(date.getDate()) + '  ' +
            addBeforeNullNUmber(date.getHours()) + ':' +
            addBeforeNullNUmber(date.getMinutes()) + ':' +
            addBeforeNullNUmber(date.getSeconds());
        document.querySelector('.popap-info__date-time').innerText = newDateFormat;
    }, 1000);
}
