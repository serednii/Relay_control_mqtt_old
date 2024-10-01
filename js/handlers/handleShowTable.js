function handleShowTable() {
    const showTableCheckbox = document.querySelector('.show_table');
    const sensorContainer = document.querySelector('.sensor');

    if (showTableCheckbox && sensorContainer) {
        console.log('YES CLASSES show_table');

        showTableCheckbox.addEventListener('change', (e) => {
            sensorContainer.classList.toggle('sensor-show', e.target.checked);
        });

    } else {
        console.log('NO CLASSES show_table or sensor');
    }

}

  // if (document.querySelector('.show_table')) {
  //   console.log('YES CLASSES  show_table')
  //   document.querySelector('.show_table').addEventListener('change', function (e) {
  //     const sensorContainer = document.querySelector('.sensor');
  //     if (e.target.checked == true) sensorContainer.classList.add('sensor-show');
  //     else sensorContainer.classList.remove('sensor-show');
  //   });
  // } else {
  //   console.log('NO CLASSES  show_table')
  // }
