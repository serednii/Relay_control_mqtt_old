function handleChangeDataSensor() {
    const CHANGE_BUTTONS = document.querySelectorAll('.address-eeprom__btn.change');

    if (CHANGE_BUTTONS.length > 0) {
        CHANGE_BUTTONS.forEach(function (button) {
            button.addEventListener('click', function (event) {
                const CURRENT_TARGET = event.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA);

                // Видаляємо клас 'active' з усіх інших елементів, крім активного
                parentListEeprom.forEach(function (item) {
                    if (!CURRENT_TARGET.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

                // Інвертуємо клас 'active' для  елемента на якому був клік
                CURRENT_TARGET.classList.toggle('active');

                // Оновлюємо стан клікабельності невибраних термодатчиків
                updateClickableDevices();

                // Якщо елемент став активним, зберігаємо посилання на нього
                if (event.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA)?.classList.contains('active')) {
                    selectEepromDataSensor = CURRENT_TARGET;
                }

            });
        });
    } else {
        console.log('No .address-eeprom__btn.change elements found');
    }
}


// function handleChangeDataSensor() {

//     if (document.querySelector('.address-eeprom__btn.change')) {
//       console.log('YES CLASSES address-eeprom__btn.change  ' + btnChange.length);
//       btnChange.forEach(function (e) {
//         e.addEventListener('click', function (k) {
//           parentListEeprom.forEach(function (m) {
//             //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
//             if (!k.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA).classList.contains('active')) {
//               //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
//               m.classList.remove('active');
//             }
//           });
//           e.closest(CLASS_ADDRESS_EEPROM_DATA).classList.toggle('active'); //інверсія класу
//           updateClickableDevices();
//           if (e.closest(CLASS_ADDRESS_EEPROM_DATA).classList.contains('active')) {
//             selectEepromDataSensor = e.closest(CLASS_ADDRESS_EEPROM_DATA);
//           }
//         });
//       });
//     } else {
//       console.log('NOT CLASSES address-eeprom__btn.change');
//     }
//   }