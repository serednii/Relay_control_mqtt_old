function handleChangeDataSensor() {
    const CHANGE_BUTTONS = document.querySelectorAll('.address-eeprom__btn.change');

    if (CHANGE_BUTTONS.length > 0) {
        console.log('Found .address-eeprom__btn.change elements: ' + CHANGE_BUTTONS.length);

        CHANGE_BUTTONS.forEach(function (button) {
            button.addEventListener('click', function (event) {
                const CARRENT_TARGET = event.CARRENT_TARGET.closest('.address-eeprom__data');

                // Видаляємо клас 'active' з усіх інших елементів, крім активного
                parentListEeprom.forEach(function (item) {
                    if (!CARRENT_TARGET.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });

                // Тогл класу 'active' для поточного елемента
                CARRENT_TARGET.classList.toggle('active');

                // Оновлюємо стан клікабельності пристроїв
                updateClickableDevices();

                // Якщо елемент став активним, зберігаємо посилання на нього
                if (currentTarget.classList.contains('active')) {
                    domElement = CARRENT_TARGET;
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
//             if (!k.currentTarget.closest('.address-eeprom__data').classList.contains('active')) {
//               //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
//               m.classList.remove('active');
//             }
//           });
//           e.closest('.address-eeprom__data').classList.toggle('active'); //інверсія класу
//           updateClickableDevices();
//           if (e.closest('.address-eeprom__data').classList.contains('active')) {
//             domElement = e.closest('.address-eeprom__data');
//           }
//         });
//       });
//     } else {
//       console.log('NOT CLASSES address-eeprom__btn.change');
//     }
//   }