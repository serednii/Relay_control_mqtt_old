function handleRelayTempChangeRadio() {
    const RELAY_TEMP_CHANGE_RADIO = document.querySelectorAll(CLASS_RELAY_CONTROL_CHANGE_RADIO);

    if (RELAY_TEMP_CHANGE_RADIO.length > 0) {
        RELAY_TEMP_CHANGE_RADIO.forEach(function (radioElement, index) {
            radioElement.addEventListener('change', function () {
                let sensorIndex = Math.trunc(index / 2);
                let sensorObject = sensorEepromControl.obj[sensorIndex];

                // Оновлюємо біт залежно від значення перемикача
                if (radioElement.value == '0') {
                    sensorObject.number &= ~(1 << 5); // Вимикаємо 5-й біт
                } else if (radioElement.value == '1') {
                    sensorObject.number |= 1 << 5; // Вмикаємо 5-й біт
                }

                // Формуємо повідомлення
                const MESSAGE = `${sensorIndex}x${sensorObject.number}k`;
                console.log('Sending message: SET_RELAY_EEPROM_UPR_CHANGE_ON_OR_OFF - ' + MESSAGE);

                // Відправляємо повідомлення
                sendMessage(SET_RELAY_EEPROM_UPR_CHANGE_ON_OR_OFF, MESSAGE);
            });
        });
    } else {
        console.log('No rele-temp-change-radio elements found');
    }
}

// relayTempChangeRadio.forEach(function (e, i) {
//     e.addEventListener('change', function () {
//       let ii = Math.trunc(i / 2);
//       if (e.value == '0') {
//         sensorEepromControl.obj[ii].number &= ~(1 << 5);
//       } else if (e.value == '1') {
//         sensorEepromControl.obj[ii].number |= 1 << 5;
//       }
//       s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
//       console.log('SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP----' + s);
//       sendMessage(SET_RELAY_EEPROM_UPR_CHANGE_ON_OR_OFF, s);
//     });
//   });