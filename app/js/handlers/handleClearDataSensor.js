function handleClearDataSensor() {
    // Отримуємо всі кнопки з класом '.address-eeprom__btn.clear'
    const clearButtons = document.querySelectorAll('.address-eeprom__btn.clear');

    if (clearButtons.length > 0) {
        console.log('Found .address-eeprom__btn.clear elements: ' + clearButtons.length);

        clearButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // Знаходимо найближчий контейнер '.address-eeprom__data' для кожної кнопки
                const dataContainer = button.closest('.address-eeprom__data');

                if (dataContainer) {
                    // Очищуємо текст всередині елементів
                    dataContainer.querySelector('.address-eeprom__address').innerText = '0000000000000000';
                    dataContainer.querySelector('.address-eeprom__temp').innerText = '';

                    // Виділяємо несумісні адреси сенсорів
                    highlightMismatchedSensorAddresses();

                    // Можна також оновити стан клікабельності пристроїв, якщо потрібно
                    // updateClickableDevices();
                } else {
                    console.error('No parent .address-eeprom__data found');
                }
            });
        });
    } else {
        console.log('No .address-eeprom__btn.clear elements found');
    }
}

// function handleClearDataSensor() {
//     if (document.querySelector('.address-eeprom__btn.clear')) {
//         console.log('YES CLASSES address-eeprom__btn.clear ' + btnClear.length);
//         btnClear.forEach(function (e) {
//             e.addEventListener('click', function () {
//                 const parent = e.closest('.address-eeprom__data');
//                 console.log(parent);
//                 parent.querySelector('.address-eeprom__address').innerText = '0000000000000000';
//                 parent.querySelector('.address-eeprom__temp').innerText = '';
//                 highlightMismatchedSensorAddresses();
//                 //updateClickableDevices();
//             });
//         });
//     } else {
//         console.log('NOT CLASSES address-eeprom__btn.clear');
//     }
// }
