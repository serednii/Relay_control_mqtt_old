function handleDefineDevice() {
    if (btnDefineDevice) {
        console.log('YES CLASSES popap-menu__btn-define-device');

        btnDefineDevice.addEventListener('click', () => {
            const confirmation = prompt("Підтвердіть введіть (ok)");

            if (confirmation === 'ok') {
                // popapClearDevice.classList.remove('disable__global'); // Розкоментувати, якщо потрібно
                sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
                console.log('DEFAULT_DEVICE');
            } else {
                console.log('Введено неправильне значення');
            }
        });
    } else {
        console.log('NOT CLASSES popap-menu__btn-define-device');
    }

}


// if (btnDefineDevice) {
//     console.log('YES CLASSES popap-menu__btn-define-device');
//     btnDefineDevice.onclick = () => {
//         let rezult = prompt("Підтвердіть введіть (ok)");
//         if (rezult === 'ok') {
//             // popapClearDevice.classList.remove('disable__global');
//             sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
//             console.log('DEFAULT_DEVICE');
//         }
//     };
// } else {
//     console.log('NOT CLASSES popap-menu__btn-define-device');
// }