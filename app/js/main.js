
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
  handleSelectSensor();
  handleBtnSave();
  handleDefineDevice();
  handleRelaySection();
  handleSaveTime()










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
























