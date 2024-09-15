// function handleClearDataSensor() {
//     // Отримуємо всі кнопки з класом 'CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME}'
//     const clearButtons = document.querySelectorAll(`${CLASS_ADDRESS_EEPROM_BTN}${CLASS_DATE_TIME}`);

//     if (clearButtons.length > 0) {
//         console.log('Found CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME} elements: ' + clearButtons.length);

//         clearButtons.forEach(function (button) {
//             button.addEventListener('click', function () {
//                 // Знаходимо найближчий контейнер CLASS_ADDRESS_EEPROM_DATA для кожної кнопки
//                 const dataContainer = button.closest(CLASS_ADDRESS_EEPROM_DATA);

//                 if (dataContainer) {
//                     // Очищуємо текст всередині елементів
//                     dataContainer.querySelector(CLASS_ADDRESS_EEPROM_ADDRESS).innerText = '0000000000000000';
//                     dataContainer.querySelector(CLASS_ADDRESS_EEPROM_TEMP).innerText = '';

//                     // Виділяємо несумісні адреси сенсорів
//                     highlightMismatchedSensorAddresses();

//                     // Можна також оновити стан клікабельності пристроїв, якщо потрібно
//                     // updateClickableDevices();
//                 } else {
//                     console.error('No parent .address-eeprom__data found');
//                 }
//             });
//         });
//     } else {
//         console.log('No CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME} elements found');
//     }
// }
function handleClearDataSensor() {
    // Отримуємо всі кнопки з класом 'CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME}'
    const CLEAR_BUTTONS = document.querySelectorAll(`${CLASS_ADDRESS_EEPROM_BTN}${CLASS_DATE_TIME}`);

    if (CLEAR_BUTTONS.length > 0) {
        console.log('Found CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME} elements: ' + CLEAR_BUTTONS.length);

        CLEAR_BUTTONS.forEach(function (button) {
            button.addEventListener('click', function () {
                // Знаходимо найближчий контейнер CLASS_ADDRESS_EEPROM_DATA для кожної кнопки
                const DATA_CONTAINER = button.closest(CLASS_ADDRESS_EEPROM_DATA);

                if (DATA_CONTAINER) {
                    // Очищуємо текст всередині елементів
                    DATA_CONTAINER.querySelector(CLASS_ADDRESS_EEPROM_ADDRESS).innerText = '0000000000000000';
                    DATA_CONTAINER.querySelector(CLASS_ADDRESS_EEPROM_TEMP).innerText = '';

                    // Виділяємо несумісні адреси сенсорів
                    highlightMismatchedSensorAddresses();

                    // Можна також оновити стан клікабельності пристроїв, якщо потрібно
                    updateClickableDevices();
                } else {
                    console.error('No parent .address-eeprom__data found');
                }
            });
        });
    } else {
        console.log('No CLASS_ADDRESS_EEPROM_BTN${CLASS_DATE_TIME} elements found');
    }
}

// function handleClearDataSensor() {
//     if (document.querySelector(`${CLASS_ADDRESS_EEPROM_BTN}${CLASS_DATE_TIME}`)) {
//         console.log('YES CLASSES address-eeprom__btn${CLASS_DATE_TIME} ' + btnClear.length);
//         btnClear.forEach(function (e) {
//             e.addEventListener('click', function () {
//                 const parent = e.closest(CLASS_ADDRESS_EEPROM_DATA);
//                 console.log(parent);
//                 parent.querySelector(CLASS_ADDRESS_EEPROM_ADDRESS).innerText = '0000000000000000';
//                 parent.querySelector(CLASS_ADDRESS_EEPROM_TEMP).innerText = '';
//                 highlightMismatchedSensorAddresses();
//                 //updateClickableDevices();
//             });
//         });
//     } else {
//         console.log('NOT CLASSES address-eeprom__btn${CLASS_DATE_TIME}');
//     }
// }
