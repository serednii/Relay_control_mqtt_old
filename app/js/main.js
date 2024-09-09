
let deviceData = {};
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
    timeList: [],
    timeRealList: []
  });
}



async function go() {
  await innerHtmlText();
  await addIdAndFor();
  await startLocalStorage();
  await startSelector();
  await startAllFunctionsPromise();
}
go();



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




const startAllFunctionsPromise = () => {
  return promise = new Promise(resolve => {
    startAllFunctions();
    console.log('start function startAllFunctionsPromise()');
    resolve();
  });
}

const startAllFunctions = () => {
  interval();
  document.querySelectorAll('.timer-date__item').forEach(e => {
    e.classList.remove('show-block');
  });

  handleManualControl();
  handleShowTable();
  handleRelayTempOn();
  handleChangeSelect();
  handleChangeTempOnOff();
  handleSaveNameRelay();
  handleInputControlError();
  handleRelayTempChangeRadio();
  handleChangeRange();
  handleChangeDataSensor();
  handleClearDataSensor();
  handleSelectSensor()
  handleBtnSave();
  handleDefineDevice();






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
























