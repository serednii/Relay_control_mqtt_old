

function updateRelaySettings() {

    if (typeof sensorEepromControl?.obj === 'object' && sensorEepromControl?.obj !== undefined) {
        // Якщо об'єкт не порожній
        releItem.forEach(function (relayElement, relayIndex) {

            const sensorSelect = relayElement.querySelector('select');
            const tempRangeRadios = relayElement.querySelectorAll('.rele-temp-change-radio');
            const tempSingleRangeRadios = relayElement.querySelectorAll('.rele-temp-change-single');
            const relayErrorIndicators = relayElement.querySelectorAll('.input-control-error');

            let relaySensorData = sensorEepromControl.obj[relayIndex].number;
            const sensorNumber = relaySensorData & 0x0F; // номер сенсора, який керує реле

            // Налаштування діапазонів температур
            if (tempSingleRangeRadios !== null) {
                if (relaySensorData & (1 << 4)) {
                    // Два діапазони температур: включення і відключення
                    tempSingleRangeRadios[1].checked = true;
                    relayElement.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = false;
                } else {
                    // Один діапазон температур
                    relayElement.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = true;
                    tempSingleRangeRadios[0].checked = true;
                }
            }

            // Налаштування радіо перемикачів
            if (tempRangeRadios !== null) {
                if (relaySensorData & (1 << 5)) {
                    // Увімкнення або вимкнення реле при переключенні
                    tempRangeRadios[0].checked = true;
                } else {
                    tempRangeRadios[1].checked = true;
                }
            }

            // Перевірка на помилки реле
            if (relayErrorIndicators !== null) {
                if (relaySensorData & (1 << 6)) {
                    relayErrorIndicators[0].checked = true;
                } else {
                    relayErrorIndicators[1].checked = true;
                }
            }

            //------------------------------------

            const sensorOptions = sensorSelect.querySelectorAll('option');

            // Видалення всіх опцій, крім першої
            sensorOptions.forEach(function (option, index) {
                if (index > 0) option.remove();
            });

            for (let eepromSensorIndex = 0; eepromSensorIndex < 8; eepromSensorIndex++) {
                let relayWithSensor = 15;

                // Пошук реле, в якому зберігається сенсор
                for (let i = 0; i < 8; i++) {
                    let sensorData = sensorEepromControl.obj[i].number;
                    sensorData &= ~240;
                    if (sensorData === eepromSensorIndex) {
                        relayWithSensor = i;
                        console.log('relayWithSensor - ' + relayWithSensor);
                        break;
                    }
                }

                // Додавання опцій для сенсора
                if (typeof eepromData === 'object' && eepromData.obj !== undefined) {
                    if (!(eepromData.obj[eepromSensorIndex].address === '0000000000000000' || eepromData.obj[eepromSensorIndex].address === 'ffffffffffffffff') && (relayWithSensor === relayIndex || relayWithSensor === 15)) {
                        const createOption = document.createElement('option');
                        createOption.value = eepromData.obj[eepromSensorIndex].number;
                        createOption.className = "rele-control-option";

                        if (sensorNames.obj !== undefined && sensorNames.obj[eepromSensorIndex].nameSensor !== '') {
                            createOption.innerText = eepromData.obj[eepromSensorIndex].number + '--' + sensorNames.obj[eepromSensorIndex].nameSensor + ' -- ' + eepromData.obj[eepromSensorIndex].temp;
                        } else {
                            createOption.innerText = eepromData.obj[eepromSensorIndex].number + '--' + eepromData.obj[eepromSensorIndex].address.toLocaleUpperCase() + ' -- ' + eepromData.obj[eepromSensorIndex].temp;
                        }

                        if (relayWithSensor === relayIndex) {
                            createOption.selected = true;
                        }
                        sensorSelect.appendChild(createOption);
                    }

                    try {
                        if (sensorNumber !== 15) {
                            if (sensorNames.obj !== undefined && sensorNames.obj[sensorNumber].nameSensor !== '') {
                                if (sensorNumber < 8) relayElement.querySelector('.rele__seting-switch__sensor').innerText = sensorNames.obj[sensorNumber].nameSensor + '  ' + eepromData.obj[sensorNumber].temp;
                                else relayElement.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
                            } else {
                                if (sensorNumber < 8) relayElement.querySelector('.rele__seting-switch__sensor').innerText = eepromData.obj[sensorNumber].address.toLocaleUpperCase() + '  ' + eepromData.obj[sensorNumber].temp;
                                else relayElement.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
                            }
                        } else {
                            relayElement.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
                        }
                    } catch (error) {
                        console.log('ERROR sensorNumber  -- ' + sensorNumber);
                    }

                }

            }

        });
    }
}


function updateRelayTemperatureSettings() {
    const tempOnInputs = document.querySelectorAll('.rele-temp-vkl');
    const tempOffInputs = document.querySelectorAll('.rele-temp-otkl');
    const tempOnSwitches = document.querySelectorAll('.rele__seting-switch__temp-on');
    const tempOffSwitches = document.querySelectorAll('.rele__seting-switch__temp-off');

    try {
        for (let i = 0; i < tempOnInputs.length; i++) {
            if (tempOnSwitches) tempOnSwitches[i].innerText = 'TEMP_ON  ' + sensorOpenCloseTemperature.obj[i].vkl;
            if (tempOffSwitches) tempOffSwitches[i].innerText = 'TEMP_OFF  ' + sensorOpenCloseTemperature.obj[i].otkl;
            tempOnInputs[i].value = sensorOpenCloseTemperature.obj[i].vkl;
            tempOffInputs[i].value = sensorOpenCloseTemperature.obj[i].otkl;
        }
    } catch (error) {
        console.log('ERROR  ' + error);
    }
}



function updateClickableDevices() {
    let isEepromActive = false;

    // Перевіряємо, чи є клас "active" серед елементів EEPROM
    parentListEeprom.forEach(function (eepromElement) {
        if (eepromElement.classList.contains('active')) {
            isEepromActive = true;
        }
    });

    if (isEepromActive) {
        // Робимо клікабельними ті пристрої, яких немає у списку (з класом "red")
        parentListDevice.forEach(function (deviceElement, index) {
            if (index > 0 && deviceElement.classList.contains('red')) {
                deviceElement.classList.add('click');
            }
        });
    } else {
        // Якщо немає активних елементів, знімаємо клас "click"
        parentListDevice.forEach(function (deviceElement, index) {
            if (index > 0) {
                deviceElement.classList.remove('click');
            }
        });
    }
}

function highlightMismatchedSensorAddresses() {
    for (let deviceIndex = 1; deviceIndex < deviceData.obj.length + 1; deviceIndex++) {
        // Додаємо клас "red" для позначення пристроїв, чий адрес не знайдено
        tableDeviceAddress[deviceIndex].closest('.address-device__data').classList.add('red');

        for (let eepromIndex = 1; eepromIndex < 9; eepromIndex++) {
            // Якщо адрес пристрою співпадає з адресом у EEPROM
            if (tableDeviceAddress[deviceIndex].textContent === tableEepromAddress[eepromIndex].textContent) {
                // Видаляємо класи "red" і "click" для елементів, що знайшли відповідний адрес
                tableDeviceAddress[deviceIndex].closest('.address-device__data').classList.remove('red');
                tableDeviceAddress[deviceIndex].closest('.address-device__data').classList.remove('click');
                break;
            }
        }
    }
    // Викликаємо функцію для перевірки стану пристроїв
    updateClickableDevices();
}













