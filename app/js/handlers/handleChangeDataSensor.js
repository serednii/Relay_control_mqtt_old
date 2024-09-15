function handleChangeDataSensor() {
    const CHANGE_BUTTONS = document.querySelectorAll(`${CLASS_ADDRESS_EEPROM_BTN}${CLASS_CHANGE}`);

    if (CHANGE_BUTTONS.length > 0) {
        CHANGE_BUTTONS.forEach(function (button) {
            button.addEventListener('click', function (event) {
                const CURRENT_TARGET = event.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA);

                // Видаляємо клас CLASS_ACTIVE з усіх інших елементів, крім активного
                parentListEeprom.forEach(function (item) {
                    if (!CURRENT_TARGET.classList.contains(CLASS_ACTIVE)) {
                        item.classList.remove(CLASS_ACTIVE);
                    }
                });

                // Інвертуємо клас CLASS_ACTIVE для  елемента на якому був клік
                CURRENT_TARGET.classList.toggle(CLASS_ACTIVE);

                // Оновлюємо стан клікабельності невибраних термодатчиків
                updateClickableDevices();

                // Якщо елемент став активним, зберігаємо посилання на нього
                if (event.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA)?.classList.contains(CLASS_ACTIVE)) {
                    selectEepromDataSensor = CURRENT_TARGET;
                }

            });
        });
    } else {
        console.log('No CLASS_ADDRESS_EEPROM_BTN${CLASS_CHANGE} elements found');
    }
}


// function handleChangeDataSensor() {

//     if (document.querySelector(`${CLASS_ADDRESS_EEPROM_BTN}${CLASS_CHANGE}`)) {
//       console.log('YES CLASSES address-eeprom__btn${CLASS_CHANGE}  ' + btnChange.length);
//       btnChange.forEach(function (e) {
//         e.addEventListener('click', function (k) {
//           parentListEeprom.forEach(function (m) {
//             //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
//             if (!k.currentTarget.closest(CLASS_ADDRESS_EEPROM_DATA).classList.contains(CLASS_ACTIVE)) {
//               //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
//               m.classList.remove(CLASS_ACTIVE);
//             }
//           });
//           e.closest(CLASS_ADDRESS_EEPROM_DATA).classList.toggle(CLASS_ACTIVE); //інверсія класу
//           updateClickableDevices();
//           if (e.closest(CLASS_ADDRESS_EEPROM_DATA).classList.contains(CLASS_ACTIVE)) {
//             selectEepromDataSensor = e.closest(CLASS_ADDRESS_EEPROM_DATA);
//           }
//         });
//       });
//     } else {
//       console.log('NOT CLASSES address-eeprom__btn${CLASS_CHANGE}');
//     }
//   }