// "use strict";

// window.onload = function() {
// console.log(localStorage.getItem('test'));
// localStorage.setItem('nameDevice', 'miro-benech_1')

// document.querySelector('.releSetingSwitcIhnput').addEventListener('change', ()=>{
//   console.log('lkjj;lk')
// });

// try {
// if (localStorage.getItem('Device') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
//   arr = JSON.parse(localStorage.getItem('Device'));
// }

// window.onload = function () {

// innerHtmlText().then(addIdAndFor).then(startLocalStoreg);
let deviceInfo = {};
let eepromData = {};
let sensorEepromControl = {};
let sensorOpenCloseTemperature = {};
let sensorNames = {};
let relayNames = {};
let relaySettings = {};
let isEepromDataDownloaded = false;
let isDeviceDataDownloaded = false;
let showEepromData = true;
//let timeMessage = null;
let domElement = null;
let dateTimeArray = [];

for (let i = 0; i < 8; i++) {
  dateTimeArray.push({
    dateTimeList: [],
    dateTimeRealList: [],
    time: [],
    timeRealList: []
  });
}



async function go() {
  await innerHtmlText();
  await addIdAndFor();
  await startLocalStoreg();
  await startSelector();
  await startAllFunctionsPromise();

}
go();




















// window.addEventListener('resize', showWidth);
// function showWidth() {
//   document.querySelector('.widthtablet').innerText = document.documentElement.clientWidth;
// }
// showWidth();


const popapInfoWrapper = document.querySelector('.popap-info__wrapper');
$(document).ready(function () {
  $("#menu").on("click", "a", function (event) {
    event.preventDefault();//при нажатии на ссылку, мы переходим по адресу этой ссылки. Вызов preventDefault() отменит это поведение
    var id = $(this).attr('href'),
      top = $(id).offset().top - popapInfoWrapper.clientHeight - 20;
    // top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });
});





// function convertToBinary1(number) {
//   let num = number;
//   let binary = (num % 2).toString();
//   for (; num > 1;) {
//     num = parseInt(num / 2);
//     binary = (num % 2) + (binary);
//   }
//   // console.log(binary);
// }




// }//window.onload = function  end





const startAllFunctionsPromise = () => {
  return promise = new Promise(resolve => {
    startAllFunctions();
    console.log('start function startAllFunctionsPromise()');

    resolve();
  });

}

const startAllFunctions = () => {
  //==================================

  //rozblokuvaty
  /************************************************************************************************************** */
  setInterval(function () {
    // Провірка на дані прийшли чи ні якщо обєти пусті то відправляємо запрос на повторну загрузку

    if (isEmpty(eepromData) || isEmpty(deviceInfo) || isEmpty(sensorEepromControl) || isEmpty(sensorOpenCloseTemperature)) {
      console.log('Є пусті обкти   ');

      sendMessage(outstartDataSensor, 'ALL');
      // sendMessage(outstartDataSensor, 'readAddressSensor');
      // sendMessage(outstartDataSensor, 'releControl'); //
      // sendMessage(outstartDataSensor, 'ReadTempVklOtkl'); //
      // sendMessage(outstartDataSensor, 'NameSensor');//
      // sendMessage(outstartDataSensor, 'NameRele');
      // sendMessage(outstartDataSensor, 'ReleManual');

      console.log('eepromData   ');
      console.log(isEmpty(eepromData));

      console.log('deviceInfo   ');
      console.log(isEmpty(deviceInfo));

      console.log('sensorEepromControl   ');
      console.log(isEmpty(sensorEepromControl));

      console.log('sensorOpenCloseTemperature   ');
      console.log(isEmpty(sensorOpenCloseTemperature));

      console.log('**************************************************');
      console.log(' ');
    } else {
      console.log('Немає пустих обктів   ');
    }
  }, 15000);
  // ************************************************************************************************************** */


  //************************************************************************************************************** */
  //rozblokuvaty
  setInterval(function () {
    showEepromData = false;
    // console.log(client);
    sendMessage(outstartDataSensor, 'readAddressSensor');
  }, 10000);

  //************************************************************************************************************** */


  //*******************************************************************
  //rozblokuvaty


  setInterval(function () {
    let date = new Date();
    let newDateFormat = date.getFullYear() + '-' +
      addBeforeNullNUmber(date.getMonth() + 1) + '-' +
      addBeforeNullNUmber(date.getDate()) + '  ' +
      addBeforeNullNUmber(date.getHours()) + ':' +
      addBeforeNullNUmber(date.getMinutes()) + ':' +
      addBeforeNullNUmber(date.getSeconds());
    document.querySelector('.popap-info__date-time').innerText = newDateFormat;
  }, 1000);



  document.querySelectorAll('.timer-date__item').forEach(e => {
    e.classList.remove('show-block');
  });

  // document.querySelectorAll('.rele-control-timer').forEach(e => {
  //   e.classList.add('block__show');
  // });

  // document.querySelector('.send__message').addEventListener('click', () => {
  //   sendMessage(outstartDataSensor, 'ALL');
  //   console.log('SEND MESSAGE');
  // });




  if (document.querySelector('.rele__control-manually-on-off')) {
    // console.log(document.querySelector('.rele__control-manually-on-off ' + document.querySelectorAll('.rele__control-manually-on-off').length))
    document.querySelectorAll('.rele__control-manually-on-off').forEach(function (e, i) {
      e.addEventListener('change', function () {
        if (e.checked) s = i + 'x1k';
        else s = i + 'x0k';
        console.log('s----' + s);
        sendMessage(setReleVklOtkl, s);
      });
    });
  } else {
    console.log('NOT CLASSES rele__control-manually-on-off');
  }

  // document.querySelectorAll('.rele__control-manually_off').forEach(function (e, i) {
  //   e.addEventListener('click', function () {
  //     s = i + 'x0k';
  //     console.log('s----' + s);

  //     sendMessage(setReleVklOtkl, s);
  //   });
  // });


  // -------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------------------
  if (document.querySelector('.show_table')) {
    console.log('YES CLASSES  show_table')
    document.querySelector('.show_table').addEventListener('change', function (e) {
      const sensorContainer = document.querySelector('.sensor');
      if (e.target.checked == true) sensorContainer.classList.add('sensor-show');
      else sensorContainer.classList.remove('sensor-show');
    });
  } else {
    console.log('NO CLASSES  show_table')
  }
  // -------------------------------------------------------------------------------------------------------

  if (document.querySelector('select')) {
    const releItem = document.querySelectorAll('.rele__item');
    console.log('YES CLASSES select  ' + document.querySelectorAll('select').length);
    document.querySelectorAll('select').forEach(function (e) {
      e.addEventListener('change', function (k) {
        // console.log(e.selectedIndex);
        releItem.forEach(function (k, i) {
          if (k == e.closest('.rele__item')) {
            // опреділяєм в якому блоці ми знаходимося тобто номер реле
            // console.log(i);
            // console.log(e.querySelectorAll('option')[e.selectedIndex].value);
            // sensorEepromControl .obj[i] = e.querySelectorAll('option')[e.selectedIndex].value ;
            s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
            // console.log('s----' + s);
            sendMessage(setReleEpromUpr, s);
          }
        });
      });
    });
  } else {
    console.log('NOT CLASSES select');
  }
  // **************************************************************************************




  // **************************************************************************************
  //ненайдено в HTML class input-control-manually__input
  // document.querySelectorAll('.input-control-manually__input').forEach(function (e, num) {
  //   e.addEventListener('click', function (a) {
  //     const parent = e.closest('.rele__item');
  //     if (a.target.checked) {`
  //       parent.querySelector('.rele__control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
  //       parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
  //       // console.log('num  ' + num);
  //       s = num + 'x' + '1' + 'k';
  //       console.log('s----' + s);
  //       sendMessage(setReleEpromUprManual, s);
  //     } else {
  //       parent.querySelector('.rele__control-manually').classList.remove('block__show');
  //       parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
  //       // console.log(e.name);
  //       s = num + 'x' + '0' + 'k';
  //       console.log('s----' + s);
  //       sendMessage(setReleEpromUprManual, s);
  //     }
  //   });
  // });
  // **************************************************************************************
  if (document.querySelector('.rele-temp-otkl') && document.querySelector('.rele-temp-vkl')) {
    console.log('YES CLASSES rele-temp-otkl   rele-temp-vkl  ' + document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').length);
    document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').forEach(function (e) {
      e.addEventListener('keyup', function () { //при вводі даних перевірка на мінімальне і максимальне значення
        // console.log(e.value);
        if (e.value > 120) e.value = 120;
        if (e.value < -50) e.value = -50;
      });
    });
  } else {
    console.log('NOT CLASSES rele-temp-otkl   rele-temp-vkl');
  }

  if (document.querySelector('.rele-temp-btn')) {
    console.log('YES CLASSES rele-temp-btn');
    document.querySelectorAll('.rele-temp-btn').forEach(function (e, i) {
      //
      e.addEventListener('click', function () {
        s = i + 'v' + e.closest('.rele__item').querySelector('.rele-temp-vkl').value + 'o' + e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value + 'k';

        sendMessage(outSaveDataSensorTemp, s);
        console.log(s);
      });
    });
  } else {
    console.log('NOT CLASSES rele-temp-btn');
  }



  if (releNameBtn > 0) {
    console.log('NOT CLASSES rele__name-btn ' + releNameBtn.length);
    releNameBtn.forEach(function (e, i) {
      e.addEventListener('click', function () {
        s = i + '*#*' + e.closest('.rele__item').querySelector('.rele__name-input').value + '*&*';

        sendMessage(outSaveReleName, s);
        console.log(s);
      });
    });
  } else {
    console.log('NOT CLASSES rele__name-btn');
  }






  // *************************************************************************

  // // При несправності термодатчика або таймера реле залишаємо вкл або викл
  if (document.querySelector('.input-control-error')) {
    console.log('YES CLASSES rele-temp-otkl   rele-temp-vkl  ' + inputControlError.length);

    inputControlError.forEach(function (e, i) {

      e.addEventListener('change', function () {
        try {
          let ii = Math.trunc(i / 2);
          // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
          // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
          // let temp = sensorEepromControl .obj[ii].number;

          if (e.value == '0') {
            // console.log('000');
            sensorEepromControl.obj[ii].number &= ~(1 << 6);
          } else if (e.value == '1') {
            // console.log('111');
            sensorEepromControl.obj[ii].number |= 1 << 6;
          }
          s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
          console.log('setReleEpromUprErorrReleVklVukl----' + s);
          // convertToBinary1(sensorEepromControl .obj[ii].number)

          sendMessage(setReleEpromUprErorrReleVklVukl, s);
        } catch (e) {
          // console.log('ERROR  ' + e);
        }
      });
    });
  } else {
    console.log('NOT CLASSES input-control-error');
  }





  releTempChangeRadio.forEach(function (e, i) {
    e.addEventListener('change', function () {
      let ii = Math.trunc(i / 2);
      // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      //  let temp = sensorEepromControl .obj[ii].number;

      if (e.value == '0') {
        // console.log('000');
        sensorEepromControl.obj[ii].number &= ~(1 << 5);
      } else if (e.value == '1') {
        // console.log('111');
        sensorEepromControl.obj[ii].number |= 1 << 5;
      }
      s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
      console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);
      // convertToBinary1(sensorEepromControl .obj[ii].number)

      sendMessage(setReleEpromUprChangeOnOrOff, s);

    });
  });

  // //  / Включаємо реле або Виключаємо реле  при зміні температури або часу


  // Один діапазон температур або два
  releTempChangeSingle.forEach(function (e, i) {
    e.addEventListener('change', function () {
      let ii = Math.trunc(i / 2);
      // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      // let temp = sensorEepromControl .obj[ii].number;

      if (e.value == '1') {
        // console.log('000');
        sensorEepromControl.obj[ii].number &= ~(1 << 4);
      } else if (e.value == '0') {
        // console.log('111');
        sensorEepromControl.obj[ii].number |= 1 << 4;
      }
      s = ii + 'x' + sensorEepromControl.obj[ii].number + 'k';
      console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);
      // convertToBinary1(sensorEepromControl .obj[ii].number)

      sendMessage(setReleEpromUprOneOrTwoRangeTemp, s);

    });
  });
  // *************************************************************************

  if (document.querySelector('.address-eeprom__btn.change')) {
    console.log('YES CLASSES address-eeprom__btn.change  ' + btnChange.length);
    btnChange.forEach(function (e) {
      e.addEventListener('click', function (k) {
        parentListEeprom.forEach(function (m) {
          //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
          if (!k.currentTarget.closest('.address-eeprom__data').classList.contains('active')) {
            //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
            m.classList.remove('active');
          }
        });
        e.closest('.address-eeprom__data').classList.toggle('active'); //інверсія класу
        CheckClickDevices();
        if (e.closest('.address-eeprom__data').classList.contains('active')) {
          domElement = e.closest('.address-eeprom__data');
        }
      });
    });
  } else {
    console.log('NOT CLASSES address-eeprom__btn.change');
  }
  //=====================================



  if (document.querySelector('.address-device__data')) {
    console.log('YES CLASSES address-device__data  ' + parentListDevice.length);

    parentListDevice.forEach(function (e) {
      //добавляємо датчики яких немає в списку EEPROM
      e.addEventListener('click', function () {
        if (e.classList.contains('red') && e.classList.contains('click')) {
          domElement.querySelector('.address-eeprom__address').innerText = e.querySelector('.address-device__address').textContent;
          compareSensorAddressHtml();
          // CheckClickDevices();
        }
      });
    });
  } else {
    console.log('NOT CLASSES address-device__data');
  }
  // ------------------------------

  if (document.querySelector('.address-eeprom__btn.clear')) {
    console.log('YES CLASSES address-eeprom__btn.clear ' + btnClear.length);
    btnClear.forEach(function (e) {
      e.addEventListener('click', function () {
        const parent = e.closest('.address-eeprom__data');
        console.log(parent);
        parent.querySelector('.address-eeprom__address').innerText = '0000000000000000';
        parent.querySelector('.address-eeprom__temp').innerText = '';
        compareSensorAddressHtml();
        //CheckClickDevices();
      });
    });
  } else {
    console.log('NOT CLASSES address-eeprom__btn.clear');
  }
  // -------------------------------

  // -------------------------------

  if (btnSave) {
    console.log('YES CLASSES address-eeprom__save');

    btnSave.addEventListener('click', function () {

      let s = '';
      tableEepromAddress.forEach(function (e, i) {
        if (i > 0) {
          s += 'na' + e.textContent.toLocaleUpperCase();
        };
      });
      console.log(s);

      sendMessage(outSaveDataSensorEeprom, s);


      s = '';
      tableEepromNameSensor.forEach(function (e, i) {
        if (i > 0) {
          s += '*&' + e.value;
        };
      });
      console.log(s);

      sendMessage(outSaveNameSensorEeprom, s);
    });
  } else {
    console.log('NOT CLASSES address-eeprom__save');
  }

  //*********************************************************************** */
  // popapClearDevice.classList.add('disable__global');
  // popapClearDeviceItem.forEach((e) => e.classList.add('disable__global'));

  if (btnDefineDevice) {
    console.log('YES CLASSES popap-menu__btn-define-device');
    btnDefineDevice.onclick = () => {
      let rezult = prompt("Підтвердіть введіть (ok)");
      if (rezult === 'ok') {
        // popapClearDevice.classList.remove('disable__global');
        sendMessage(setDefineDevice, 'setDefineDevice');
        console.log('DEFAULT_DEVICE');
      }

    };
  } else {
    console.log('NOT CLASSES popap-menu__btn-define-device');
  }
  //*********************************************************************** */

  // ********************************************************************************************************************************************************************
  // document.querySelectorAll('.datetime, .time').forEach(function (e) {

  if (releItem.length > 0) {
    console.log('YES CLASSES  rele__item ' + releItem.length);

    document.querySelectorAll('.rele__item').forEach((parent, num) => {

      parent.addEventListener('change', function (event) {
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
        const datetime = parent.querySelectorAll('.datetime');
        const time = parent.querySelectorAll('.time');
        //при зміні на .datetime і  .time визивати обробку
        // const parent = parent.closest('.rele__item');
        // console.log(e)
        // console.log(event.target)
        // console.log(parent)
        if (event.target.classList.contains('day')) chekChecedDay(event);
        if (event.target.classList.contains('datetime')) chekDate(parent, datetime, time);
        if (event.target.classList.contains('time')) chekTime(parent, datetime, time);
        showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
      });

      parent.addEventListener('click', function (event) {
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
        console.log(event.target);
        if (event.target.classList.contains('rele__seting-switch__input')) showSectionTimeAndSeting(event, parent, '.rele__seting-svg', '.rele__section-seting');
        if (event.target.classList.contains('rele__timer-seting-show__input')) showSectionTimeAndSeting(event, parent, '.rele__timer-seting-svg', '.rele-control-timer');
        if (event.target.classList.contains('rele__control-manually-show')) showSectionTimeAndSeting(event, parent, '.input-control-manually-svg', '.rele__control-manually', num);
      });

    });
  } else {
    console.log('NOT CLASSES  rele__item ');
  }




  // document.querySelectorAll('.day ').forEach(function (e, i) {
  //   e.addEventListener('click', function (ee) {
  //     const parent = e.closest('.rele__item');
  //   });
  // });


  // 2022-06-12T00:00 format input date set

  if (timeBtn.length > 0) {
    console.log('YES CLASSES  time__btn ' + timeBtn.length);

    timeBtn.forEach(function (e, i) {

      e.addEventListener('click', function (ee) {
        const parent = e.closest('.rele__item');
        // let numberReleClick = parent.getAttribute('data-rele');
        // console.log(i);
        const error_class = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

        // console.log('length error  ' + error_class.length);

        if (error_class.length > 0) {

          //Якщо є класи з помилками

          const popapError = document.querySelector('.popap_error');
          popapError.classList.add('popap_error-show');
          let counter = 0;

          let timerId = setInterval(function () {
            error_class.forEach(function (e) {
              if (counter % 2 == 0) e.classList.add('blink__eror-red');
              if (counter % 2 != 0) e.classList.remove('blink__eror-red');
            });

            counter++;
            // console.log('counter  ' + counter);
            if (counter > 9) {
              clearTimeout(timerId);
              popapError.classList.remove('popap_error-show');
            }
          }, 300);
        } else {
          //Якщо нема класів з помилками то відправляємо повідомлення
          //Відправляємо дані
          // console.log(delayWhenTurned[i].value);

          const dayElement = parent.querySelectorAll('.day');
          let _s = 'RELE' + i + '-' + delayWhenTurned[i].value + '-';

          for (nn = 0; nn < 10; nn++) {
            // console.log('dayElement  ' + dateTimeArray[i].dateTimeRealList[nn]);

            if (dateTimeArray[i].dateTimeRealList[nn] != 'Invalid Date') {
              // console.log('dayElement  ' + dateTimeArray[i].dateTimeRealList[nn]);
              let dateInput = new Date(dateTimeArray[i].dateTimeRealList[nn]).getTime();
              dateInput = dateInput / 1000;
              console.log("ZZZZZZZZZZZZ");
              console.log(dateTimeArray[i].dateTimeRealList[nn]);
              _s += dateInput + '-'; //Рік  v minute
              _s += dateTimeArray[i].dateTimeRealList[nn].getFullYear() + '-'; //Рік
              _s += dateTimeArray[i].dateTimeRealList[nn].getMonth() + 1 + '-'; //Місяць
              _s += dateTimeArray[i].dateTimeRealList[nn].getDate() + '-'; //день 1-31
              _s += dateTimeArray[i].dateTimeRealList[nn].getHours() + '-'; //Година
              _s += dateTimeArray[i].dateTimeRealList[nn].getMinutes() + '-'; //Хвилина
              _s += dateTimeArray[i].dateTimeRealList[nn].getDay() + '-'; //День тижня 0-6
            } else {
              _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
            }
          }

          for (nn = 0; nn < 50; nn++) {
            // console.log( "HHHHHHHHH  " ); 

            console.log(dateTimeArray[i].timeRealList[nn]);

            if (dateTimeArray[i].timeRealList[nn] != undefined && dateTimeArray[i].timeRealList[nn] != '') {
              _s += dateTimeArray[i].timeRealList[nn].getHours() + "-" + dateTimeArray[i].timeRealList[nn].getMinutes() + '-';
            } else _s += '99-99-';
          }

          // s += 'DAY---';
          dayElement.forEach(function (e) {
            if (e.checked) {
              _s += '1-';
            } else {
              _s += '0-';
            }
          });
          console.log(_s);

          sendMessage(setReleDATATIME, _s);

        }
      });
    });
  } else {
    console.log('NOT CLASSES  time__btn ');
  }

  if (timeBtnClear.length > 0) {
    console.log('YES CLASSES  time__btn-clear ' + timeBtnClear.length);
    timeBtnClear.forEach(function (e, i) {
      e.addEventListener('click', function () {
        messageDate(i);
        releItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
          e.value = '';
        });
      });
    });
  } else {
    console.log('NOT CLASSES  time__btn-clear ');
  }




  //*********************************************************************** */
  //show menu local storage

  // } // end fuction addEventListenerClick

  if (releItemTitlePin.length > 0) {
    console.log('YES CLASSES rele__item-title-pin ' + releItemTitlePin.length);
    releItemTitlePin[0].textContent = 'PIN 5'
    releItemTitlePin[1].textContent = 'PIN 4'
    releItemTitlePin[2].textContent = 'PIN 0'
    releItemTitlePin[3].textContent = 'PIN 2'
    releItemTitlePin[4].textContent = 'PIN 12'
    releItemTitlePin[5].textContent = 'PIN 13'
    releItemTitlePin[6].textContent = 'PIN 3'
    releItemTitlePin[7].textContent = 'PIN 1'
  } else {
    console.log('NOT CLASSES rele__item-title-pin ' + releItemTitlePin.length);
  }


}
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */
//************************************************************************************************************************************************************************************************ */




























