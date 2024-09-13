function handleSaveNameRelay() {
    const releNameButtons = document.querySelectorAll('.rele__name-btn');

    if (releNameButtons.length > 0) {
        console.log('Found rele__name-btn: ' + releNameButtons.length);

        releNameButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                const parentRelayItem = button.closest('.rele__item');
                const findRelayNameInput = parentRelayItem.querySelector('.rele__name-input');

                // Перевіряємо, чи існує поле вводу для імені
                if (findRelayNameInput && findRelayNameInput.value !== '') {
                    const message = `${index}*#*${findRelayNameInput.value}*&*`;
                    sendMessage(outSaveReleName, message);
                    console.log('Message sent: ', message);
                } else {
                    console.log('Name input is empty or missing');
                }
            });
        });
    } else {
        console.log('No rele__name-btn classes found');
    }
}




//     if (relayNameBtn > 0) {
//       console.log('NOT CLASSES rele__name-btn ' + relayNameBtn.length);
//       relayNameBtn.forEach(function (e, i) {
//         e.addEventListener('click', function () {
//           s = i + '*#*' + e.closest('.rele__item').querySelector('.rele__name-input').value + '*&*';

//           sendMessage(outSaveReleName, s);
//           console.log(s);
//         });
//       });
//     } else {
//       console.log('NOT CLASSES rele__name-btn');
//     }
