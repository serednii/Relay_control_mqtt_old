
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

  removeShowBlock();
  printPin();
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
  handleSaveTime();
  handleClearTime();




}
























