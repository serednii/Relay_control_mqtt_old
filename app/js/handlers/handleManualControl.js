


function handleManualControl() {
    const manualControls = document.querySelectorAll('.rele__control-manually-on-off');
    if (manualControls.length > 0) {
        manualControls.forEach((control, index) => {
            control.addEventListener('click', () => {
                const status = control.checked ? `${index}x1k` : `${index}x0k`;
                control.checked = !control.checked;
                console.log(`s---- ${status}`);
                try {
                    sendMessage(setRelayOnOff, status);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            });
        });
    } else {
        console.log('No elements found with the class rele__control-manually-on-off');
    }
}

  // if (document.querySelector('.rele__control-manually-on-off')) {
  //   document.querySelectorAll('.rele__control-manually-on-off').forEach(function (e, i) {
  //     e.addEventListener('change', function () {
  //       if (e.checked) s = i + 'x1k';
  //       else s = i + 'x0k';
  //       console.log('s----' + s);
  //       sendMessage(setRelayOnOff, s);
  //     });
  //   });
  // } else {
  //   console.log('NOT CLASSES rele__control-manually-on-off');
  // }

