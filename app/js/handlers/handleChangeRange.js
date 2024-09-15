
function handleChangeRange() {
    const RELAY_TEMP_SINGLE_CHANGE = document.querySelectorAll(CLASS_RELAY_TEMP_CHANGE_SINGLE);

    if (RELAY_TEMP_SINGLE_CHANGE.length > 0) {
        RELAY_TEMP_SINGLE_CHANGE.forEach(function (rangeElement, index) {
            rangeElement.addEventListener('change', function () {
                try {
                    let sensorIndex = Math.trunc(index / 2);
                    let sensorObject = sensorEepromControl.obj[sensorIndex];

                    // Оновлюємо 4-й біт залежно від значення перемикача
                    if (rangeElement.value == '1') {
                        sensorObject.number &= ~(1 << 4); // Вимикаємо 4-й біт (один діапазон)
                    } else if (rangeElement.value == '0') {
                        sensorObject.number |= 1 << 4; // Вмикаємо 4-й біт (два діапазони)
                    }

                    // Формуємо повідомлення
                    const message = `${sensorIndex}x${sensorObject.number}k`;
                    console.log('Sending message: SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP - ' + message);

                    // Відправляємо повідомлення
                    sendMessage(SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP, message);
                } catch (error) {
                    console.error('Error in handleChangeRange: ', error);
                }
            });
        });
    } else {
        console.log('No rele-temp-change-single elements found');
    }
}



//   function handleChangeRange() {

//     // Один діапазон температур або два
//     RELAY_TEMP_SINGLE_CHANGE.forEach(function (e, i) {
//       e.addEventListener('change', function () {
//         let ii = Math.trunc(i / 2);
//         if (e.value == '1') {
//           sensorEepromControl.obj[ii].number &= ~(1 << 4);
//         } else if (e.value == '0') {
//           sensorEepromControl.obj[ii].number |= 1 << 4;
//         }
//         s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
//         console.log('SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP----' + s);
//         sendMessage(SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP, s);

//       });
//     });
//   }