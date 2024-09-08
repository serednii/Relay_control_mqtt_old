function handleChangeTempOnOff() {
    const releTempButtons = document.querySelectorAll('.rele-temp-btn');

    if (releTempButtons.length > 0) {
        console.log('YES CLASSES rele-temp-btn');

        releTempButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const releItem = button.closest('.rele__item');
                const releTempVkl = releItem.querySelector('.rele-temp-vkl');
                const releTempOtkl = releItem.querySelector('.rele-temp-change .rele-temp-otkl');

                // Перевірка наявності елементів та їх значень
                if (releTempVkl && releTempOtkl && releTempVkl.value !== '' && releTempOtkl.value !== '') {
                    const message = `${index}v${releTempVkl.value}o${releTempOtkl.value}k`;
                    sendMessage(outSaveDataSensorTemp, message);
                    console.log('Message sent: ', message);
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