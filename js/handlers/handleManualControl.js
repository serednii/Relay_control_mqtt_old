


function handleManualControl() {
    const MANUAL_CONTROL = document.querySelectorAll(CLASS_RELAY_CONTROL_MANUAL_ON_OFF);
    if (MANUAL_CONTROL.length > 0) {
        MANUAL_CONTROL.forEach((control, index) => {
            control.addEventListener('click', () => {
                const STATUS_RELAY = control.checked ? `${index}x1k` : `${index}x0k`;
                control.checked = !control.checked;
                console.log(`s---- ${STATUS_RELAY}`);
                try {
                    sendMessage(SET_RELAY_ON_OFF, STATUS_RELAY);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            });
        });
    } else {
        console.log('No elements found with the class rele__control-manually-on-off');
    }
}

  // if (document.querySelector(CLASS_RELAY_CONTROL_MANUAL_ON_OFF)) {
  //   document.querySelectorAll(CLASS_RELAY_CONTROL_MANUAL_ON_OFF).forEach(function (e, i) {
  //     e.addEventListener('change', function () {
  //       if (e.checked) s = i + 'x1k';
  //       else s = i + 'x0k';
  //       console.log('s----' + s);
  //       sendMessage(SET_RELAY_ON_OFF, s);
  //     });
  //   });
  // } else {
  //   console.log('NOT CLASSES rele__control-manually-on-off');
  // }

