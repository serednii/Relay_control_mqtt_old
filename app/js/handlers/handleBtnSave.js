function handleBtnSave() {
    const BTN_SAVE = document.querySelector(CLASS_ADDRESS_EEPROM_SAVE);
    if (BTN_SAVE) {
        console.log('YES CLASSES CLASS_ADDRESS_EEPROM_SAVE');

        BTN_SAVE.addEventListener('click', function () {
            // Збираємо дані адрес сенсорів
            let sensorAddresses = '';
            tableEepromAddress.forEach(function (e, i) {
                if (i > 0) {
                    sensorAddresses += 'na' + e.textContent.toLocaleUpperCase();
                };
            });
            console.log(sensorAddresses);
            sendMessage(OUT_SAVE_DATA_SENSOR_EEPROM, sensorAddresses);

            // Збираємо назви сенсорів

            let sensorNames = '';
            tableEepromNameSensor.forEach(function (e, i) {
                if (i > 0) {
                    sensorNames += '*&' + e.value;
                };
            });
            console.log(sensorNames);
            sendMessage(OUT_SAVE_NAME_SENSOR_EEPROM, sensorNames);
        });
    } else {
        console.log('NOT CLASSES CLASS_ADDRESS_EEPROM_SAVE');
    }
}


// if (BTN_SAVE) {
//     console.log('YES CLASSES CLASS_ADDRESS_EEPROM_SAVE');

//     BTN_SAVE.addEventListener('click', function () {

//         let s = '';
//         tableEepromAddress.forEach(function (e, i) {
//             if (i > 0) {
//                 s += 'na' + e.textContent.toLocaleUpperCase();
//             };
//         });
//         console.log(s);

//         sendMessage(OUT_SAVE_DATA_SENSOR_EEPROM, s);


//         s = '';
//         tableEepromNameSensor.forEach(function (e, i) {
//             if (i > 0) {
//                 s += '*&' + e.value;
//             };
//         });
//         console.log(s);

//         sendMessage(OUT_SAVE_NAME_SENSOR_EEPROM, s);
//     });
// } else {
//     console.log('NOT CLASSES CLASS_ADDRESS_EEPROM_SAVE');
// }