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
            sendMessage(outSaveDataSensorEeprom, sensorAddresses);

            // Збираємо назви сенсорів

            let sensorNames = '';
            tableEepromNameSensor.forEach(function (e, i) {
                if (i > 0) {
                    sensorNames += '*&' + e.value;
                };
            });
            console.log(sensorNames);
            sendMessage(outSaveNameSensorEeprom, sensorNames);
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

//         sendMessage(outSaveDataSensorEeprom, s);


//         s = '';
//         tableEepromNameSensor.forEach(function (e, i) {
//             if (i > 0) {
//                 s += '*&' + e.value;
//             };
//         });
//         console.log(s);

//         sendMessage(outSaveNameSensorEeprom, s);
//     });
// } else {
//     console.log('NOT CLASSES address-eeprom__save');
// }