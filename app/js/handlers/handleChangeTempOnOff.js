function handleChangeTempOnOff() {
    const RELAY_TEMP_BUTTONS = document.querySelectorAll(CLASS_RELAY_ITEM);

    if (RELAY_TEMP_BUTTONS.length > 0) {
        console.log('YES CLASSES rele-temp-btn');

        RELAY_TEMP_BUTTONS.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const PARENT_RELAY_ITEM = button.closest(CLASS_RELAY_ITEM);
                const RELAY_TEMP_ON = PARENT_RELAY_ITEM.querySelector(CLASS_RELAY_TEMP_ON);
                const RELAY_TEMP_OFF = PARENT_RELAY_ITEM.querySelector(`${CLASS_RELAY_TEMP_CHANGE} ${CLASS_RELAY_TEMP_OFF}`);

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

//     if (document.querySelector(CLASS_RELAY_ITEM)) {
//         console.log('YES CLASSES rele-temp-btn');
//         document.querySelectorAll(CLASS_RELAY_ITEM).forEach(function (e, i) {
//             //
//             e.addEventListener('click', function () {
//                 s = i + 'v' + e.closest(CLASS_RELAY_ITEM).querySelector(CLASS_RELAY_TEMP_ON).value + 'o' + e.closest(CLASS_RELAY_TEMP_CHANGE).querySelector('.rele-temp-otkl').value + 'k';

//                 sendMessage(outSaveDataSensorTemp, s);
//                 console.log(s);
//             });
//         });
//     } else {
//         console.log('NOT CLASSES rele-temp-btn');
//     }
// }