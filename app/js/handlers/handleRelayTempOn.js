function handleRelayTempOn() {
  const tempInputs = document.querySelectorAll(`${CLASS_RELAY_TEMP_ON}, CLASS_RELAY_TEMP_OFF`);

  if (tempInputs.length > 0) {
    console.log('YES CLASSES rele-temp-otkl rele-temp-vkl ' + tempInputs.length);

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const handleInput = (event) => {
      let inputValue = parseFloat(event.target.value);

      // Перевірка, чи введене значення є числом
      if (!isNaN(inputValue)) {
        event.target.value = clampValue(inputValue, -50, 120);
      } else {
        event.target.value = ''; // Якщо значення не є числом, очищаємо поле
      }
    };

    tempInputs.forEach(input => {
      input.addEventListener('keyup', handleInput);
    });

  } else {
    console.log('NOT CLASSES rele-temp-otkl rele-temp-vkl');
  }


}
//handleRelayTempOn handleRelayTempOn


// if (document.querySelector('CLASS_RELAY_TEMP_OFF') && document.querySelector('CLASS_RELAY_TEMP_ON')) {
//   console.log('YES CLASSES rele-temp-otkl   rele-temp-vkl  ' + document.querySelectorAll('CLASS_RELAY_TEMP_ON, CLASS_RELAY_TEMP_OFF').length);
//   document.querySelectorAll('CLASS_RELAY_TEMP_ON, CLASS_RELAY_TEMP_OFF').forEach(function (e) {
//     e.addEventListener('keyup', function () { //при вводі даних перевірка на мінімальне і максимальне значення

//       if (e.value > 120) e.value = 120;
//       if (e.value < -50) e.value = -50;
//     });
//   });
// } else {
//   console.log('NOT CLASSES rele-temp-otkl   rele-temp-vkl');
// }