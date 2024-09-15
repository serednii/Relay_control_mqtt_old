

function handleChangeSelect() {
    const SELECT_ELEMENTS = document.querySelectorAll('select');
    // const releItems = document.querySelectorAll(CLASS_RELAY_ITEM);

    if (SELECT_ELEMENTS.length > 0) {
        console.log('YES CLASSES select  ' + SELECT_ELEMENTS.length);

        SELECT_ELEMENTS.forEach((selectElement) => {
            selectElement.addEventListener('change', () => {
                const SELECTED_VALUE = selectElement.value;
                const PARENT_RELAY_ITEM = selectElement.closest(CLASS_RELAY_ITEM);

                // Знаходимо відповідний індекс реле
                relayItem.forEach((relayItem, index) => {
                    if (relayItem === PARENT_RELAY_ITEM) {
                        const INDEX_SELECTED_VALUE = `${index}x${SELECTED_VALUE}k`;

                        sendMessage(SET_RELAY_EEPROM_UPR, INDEX_SELECTED_VALUE);
                    }
                });
            });
        });

    } else {
        console.log('NOT CLASSES select');
    }
}

// if (document.querySelector('select')) {
//     const relayItem = document.querySelectorAll(CLASS_RELAY_ITEM);
//     console.log('YES CLASSES select  ' + document.querySelectorAll('select').length);
//     document.querySelectorAll('select').forEach(function (e) {
//         e.addEventListener('change', function (k) {
//             // console.log(e.selectedIndex);
//             relayItem.forEach(function (k, i) {
//                 if (k == e.closest(CLASS_RELAY_ITEM)) {
//                     // опреділяєм в якому блоці ми знаходимося тобто номер реле
//                     s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
//                     sendMessage(SET_RELAY_EEPROM_UPR, s);
//                 }
//             });
//         });
//     });
// } else {
//     console.log('NOT CLASSES select');
// }