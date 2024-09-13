function handleBtnSave() {

    if (btnSave) {
        console.log('YES CLASSES address-eeprom__save');

        btnSave.addEventListener('click', function () {
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
        console.log('NOT CLASSES address-eeprom__save');
    }
}


// if (btnSave) {
//     console.log('YES CLASSES address-eeprom__save');

//     btnSave.addEventListener('click', function () {

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
//     console.log('NOT CLASSES address-eeprom__save');
// }