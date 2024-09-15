function handleSelectSensor() {
    // Перевіряємо, чи є елементи з класом '.address-device__data'
    // const deviceElements = document.querySelectorAll('.address-device__data');

    if (parentListDevice.length > 0) {
        console.log('Found .address-device__data elements: ' + parentListDevice.length);

        parentListDevice.forEach(function (deviceElement) {
            deviceElement.addEventListener('click', function () {
                // Перевіряємо, чи елемент має класи 'red' та 'click'
                if (deviceElement.classList.contains('red') && deviceElement.classList.contains('click')) {
                    const addressDevice = deviceElement.querySelector('.address-device__address').textContent;

                    if (selectEepromDataSensor) {
                        // Оновлюємо адресу в елементі CLASS_ADDRESS_EEPROM_ADDRESS
                        selectEepromDataSensor.querySelector(CLASS_ADDRESS_EEPROM_ADDRESS).innerText = addressDevice;

                        // Виділяємо несумісні адреси сенсорів
                        highlightMismatchedSensorAddresses();

                        // Оновлюємо стан клікабельності пристроїв, якщо потрібно
                        // updateClickableDevices();
                    } else {
                        console.error('No active selectEepromDataSensor found');
                    }
                }
            });
        });
    } else {
        console.log('No .address-device__data elements found');
    }
}


// function handleSelectSensor() {

//     if (document.querySelector('.address-device__data')) {
//       console.log('YES CLASSES address-device__data  ' + parentListDevice.length);

//       parentListDevice.forEach(function (e) {
//         //добавляємо датчики яких немає в списку EEPROM
//         e.addEventListener('click', function () {
//           if (e.classList.contains('red') && e.classList.contains('click')) {
//             selectEepromDataSensor.querySelector(CLASS_ADDRESS_EEPROM_ADDRESS).innerText = e.querySelector('.address-device__address').textContent;
//             highlightMismatchedSensorAddresses();
//             // updateClickableDevices();
//           }
//         });
//       });
//     } else {
//       console.log('NOT CLASSES address-device__data');
//     }
//   }