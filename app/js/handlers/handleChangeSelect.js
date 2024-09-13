

function handleChangeSelect() {
    const selectElements = document.querySelectorAll('select');
    const releItems = document.querySelectorAll('.rele__item');

    if (selectElements.length > 0) {
        console.log('YES CLASSES select  ' + selectElements.length);

        selectElements.forEach((selectElement) => {
            selectElement.addEventListener('change', () => {
                const selectedValue = selectElement.value;
                const parentReleItem = selectElement.closest('.rele__item');

                // Знаходимо відповідний індекс реле
                releItems.forEach((relayItem, index) => {
                    if (relayItem === parentReleItem) {
                        const s = `${index}x${selectedValue}k`;
                        sendMessage(setRelayEepromUpr, s);
                    }
                });
            });
        });

    } else {
        console.log('NOT CLASSES select');
    }
}

// if (document.querySelector('select')) {
//     const relayItem = document.querySelectorAll('.rele__item');
//     console.log('YES CLASSES select  ' + document.querySelectorAll('select').length);
//     document.querySelectorAll('select').forEach(function (e) {
//         e.addEventListener('change', function (k) {
//             // console.log(e.selectedIndex);
//             relayItem.forEach(function (k, i) {
//                 if (k == e.closest('.rele__item')) {
//                     // опреділяєм в якому блоці ми знаходимося тобто номер реле
//                     s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
//                     sendMessage(setRelayEepromUpr, s);
//                 }
//             });
//         });
//     });
// } else {
//     console.log('NOT CLASSES select');
// }