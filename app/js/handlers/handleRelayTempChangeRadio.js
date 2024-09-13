function handleRelayTempChangeRadio() {
    const relayTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');

    if (relayTempChangeRadio.length > 0) {
        relayTempChangeRadio.forEach(function (radioElement, index) {
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
                const message = `${sensorIndex}x${sensorObject.number}k`;
                console.log('Sending message: setReleEpromUprChangeOnOrOff - ' + message);

                // Відправляємо повідомлення
                sendMessage(setReleEpromUprChangeOnOrOff, message);
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
//       console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);
//       sendMessage(setReleEpromUprChangeOnOrOff, s);
//     });
//   });