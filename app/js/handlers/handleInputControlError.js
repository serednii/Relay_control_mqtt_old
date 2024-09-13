function handleInputControlError() {
    const INPUT_CONTROL_ERRORS = document.querySelectorAll('.input-control-error');

    if (INPUT_CONTROL_ERRORS.length > 0) {
        console.log('Found input-control-error elements: ' + INPUT_CONTROL_ERRORS.length);

        INPUT_CONTROL_ERRORS.forEach(function (inputElement, index) {
            inputElement.addEventListener('change', function () {
                try {
                    let sensorIndex = Math.trunc(index / 2);
                    let sensorObject = sensorEepromControl.obj[sensorIndex];

                    // Оновлюємо біт залежно від значення
                    if (inputElement.value == '0') {
                        sensorObject.number &= ~(1 << 6); // Вимикаємо біт
                    } else if (inputElement.value == '1') {
                        sensorObject.number |= 1 << 6; // Вмикаємо біт
                    }

                    // Формуємо та відправляємо повідомлення
                    const MESSAGE = `${sensorIndex}x${sensorObject.number}k`;
                    sendMessage(SET_RELAY_EEPROM_UPR_ERROR_RELAY_ON_OFF, MESSAGE);

                    console.log('Message sent: ', MESSAGE);
                } catch (error) {
                    console.error('Error handling input change: ', error);
                }
            });
        });
    } else {
        console.log('No input-control-error elements found');
    }
}


// // // При несправності термодатчика або таймера реле залишаємо вкл або викл
// if (document.querySelector('.input-control-error')) {
//   console.log('YES CLASSES rele-temp-otkl   rele-temp-vkl  ' + inputControlError.length);

//   inputControlError.forEach(function (e, i) {

//     e.addEventListener('change', function () {
//       try {
//         let ii = Math.trunc(i / 2);

//         if (e.value == '0') {
//           sensorEepromControl.obj[ii].number &= ~(1 << 6);
//         } else if (e.value == '1') {
//           sensorEepromControl.obj[ii].number |= 1 << 6;
//         }
//         s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
//         sendMessage(SET_RELAY_EEPROM_UPR_ERROR_RELAY_ON_OFF, s);
//       } catch (e) {
//         console.log('ERROR  ' + e);
//       }
//     });
//   });
// } else {
//   console.log('NOT CLASSES input-control-error');
// }