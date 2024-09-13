function handleChangeTempOnOff() {
    const RELAY_TEMP_BUTTONS = document.querySelectorAll('.rele-temp-btn');

    if (RELAY_TEMP_BUTTONS.length > 0) {
        console.log('YES CLASSES rele-temp-btn');

        RELAY_TEMP_BUTTONS.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const PARENT_RELAY_ITEM = button.closest('.rele__item');
                const RELAY_TEMP_ON = PARENT_RELAY_ITEM.querySelector('.rele-temp-vkl');
                const RELAY_TEMP_OFF = PARENT_RELAY_ITEM.querySelector('.rele-temp-change .rele-temp-otkl');

                // Перевірка наявності елементів та їх значень
                if (RELAY_TEMP_ON && RELAY_TEMP_OFF && RELAY_TEMP_ON.value !== '' && RELAY_TEMP_OFF.value !== '') {
                    const MESSAGE = `${index}v${RELAY_TEMP_ON.value}o${RELAY_TEMP_OFF.value}k`;
                    sendMessage(OUT_SAVE_DATA_SENSOR_TEMP, MESSAGE);
                    console.log('Message sent: ', MESSAGE);
                } else {
                    console.log('Invalid temperature values');
                }
            });
        });

    } else {
        console.log('NOT CLASSES rele-temp-btn');
    }
}











// function handleChangeTempOnOff() {

//     if (document.querySelector('.rele-temp-btn')) {
//         console.log('YES CLASSES rele-temp-btn');
//         document.querySelectorAll('.rele-temp-btn').forEach(function (e, i) {
//             //
//             e.addEventListener('click', function () {
//                 s = i + 'v' + e.closest('.rele__item').querySelector('.rele-temp-vkl').value + 'o' + e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value + 'k';

//                 sendMessage(outSaveDataSensorTemp, s);
//                 console.log(s);
//             });
//         });
//     } else {
//         console.log('NOT CLASSES rele-temp-btn');
//     }
// }