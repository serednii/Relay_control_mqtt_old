// "use strict";
console.log(1%2)
// window.onload = function() {
// console.log(localStorage.getItem('test'));
// localStorage.setItem('nameDevice', 'miro-benech_1')
{


  //deleted
  // document.querySelectorAll('.rele__timer-seting-show__input')[0].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[1].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[2].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[3].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[4].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[5].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[6].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');
  // document.querySelectorAll('.rele__timer-seting-show__input')[7].closest('.rele__item').querySelector('.rele-control-timer').classList.add('block__show');





}

// document.querySelector('.releSetingSwitcIhnput').addEventListener('change', ()=>{
//   console.log('lkjj;lk')
// });

// try {
// if (localStorage.getItem('Device') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
//   arr = JSON.parse(localStorage.getItem('Device'));
// }
let userName;

{
  const language = localStorage.getItem('Language');
  if (language != null) {
    if (language == 'ua' || language == 'en' || language == 'cz') {
      languageChange(language);
    }
  }
}


if (localStorage.getItem('Device') != null) {
  console.log(localStorage.getItem('nameDevice'));
  arr = JSON.parse(localStorage.getItem('Device'));
  document.querySelector('.info__local-storage').innerText = arr.NameDevice + '  ---   ' + arr.Name;
  userName = arr.NameDevice;
} else {
  console.log('none');
  document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
}

const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuLine = document.querySelector('.burger-menu span');

// addEventListenerClick();

// function addEventListenerClick() {

// let userName = 'mykola';


const monitor = document.querySelectorAll('.data-topic');
let client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "userName-" + parseInt(Math.random() * 100, 10));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
const printAnalogInput = document.querySelector('.popap-info__analog-input');
const parentListEeprom = document.querySelectorAll('.address-eeprom__data');
const tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
const tableEepromAddress = document.querySelectorAll('.address-eeprom__address');
const tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');

//input and label class
const inputDey = document.querySelectorAll('.day');
const labelDey = document.querySelectorAll('.label-day');

const inputControlError = document.querySelectorAll('.input-control-error');
const inputControlErrorLabel = document.querySelectorAll('.input-control-error__label');

const releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
const releTempChangeLabel = document.querySelectorAll('.rele-temp-change__label');

const releSetingSensorSelectLabel = document.querySelectorAll('.rele__seting-sensor__select-label');
const releSetingSensorSelect = document.querySelectorAll('.rele__seting-sensor__select');


const releTempVklStartLabel = document.querySelectorAll(' .rele-temp-vkl-start-label');
const releTempVkl = document.querySelectorAll('.rele-temp-vkl');

const releSetingSwitcIhnput = document.querySelectorAll('.rele__seting-switch__input');
const releSetingSwitchLabel = document.querySelectorAll('.rele__seting-switch__label');

let arrayClass = [
  {
    labelData: '.rele__seting-switch__label',
    inputData: '.rele__seting-switch__input',
    nameData: 'seting-'
  },
  {
    labelData: '.label-day',
    inputData: '.day',
    nameData: 'time-id-'
  },
  {
    labelData: '.input-control-error__label',
    inputData: '.input-control-error',
    nameData: 'err_on_'
  },
  {
    labelData: '.rele-temp-change__label',
    inputData: '.rele-temp-change-radio',
    nameData: 'on_'
  },
  {
    labelData: '.rele__seting-sensor__select-label',
    inputData: '.rele__seting-sensor__select',
    nameData: 'cars'
  },
  {
    labelData: '.rele-temp-vkl-start-label',
    inputData: '.rele-temp-vkl',
    nameData: 'temp_start_'
  },
  {
    labelData: '.rele-temp-vkl-end-label',
    inputData: '.rele-temp-otkl',
    nameData: 'temp_end_'
  },
  {
    labelData: '.rele-temp-change-single__label',
    inputData: '.rele-temp-change-single',
    nameData: 'one_range_'
  },
  {
    labelData: '.rele__timer-seting-show__label',
    inputData: '.rele__timer-seting-show__input',
    nameData: 'show-time_'
  },
  {
    labelData: '.input-control-manually__label',
    inputData: '.input-control-manually__input',
    nameData: 'manual-'
  }
];

function convertToBinary1 (number) {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1; ) {
      num = parseInt(num / 2);
      binary =  (num % 2) + (binary);
  }
  console.log(binary);
}


const tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
const btnClear = document.querySelectorAll('.address-eeprom__btn.clear');
const btnChange = document.querySelectorAll('.address-eeprom__btn.change');
const btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
const localStorageBtnClose = document.querySelector('.popap-local-storage__btn-close');
// const btnClearAll = document.querySelector('.address-eeprom__btn.clear-all');
// const btnChangeAll = document.querySelector('.address-eeprom__btn.change-all');
const parentListDevice = document.querySelectorAll('.address-device__data');

const tableDeviceNumber = document.querySelectorAll('.address-device__number');
const tableDeviceAddress = document.querySelectorAll('.address-device__address');
const tableDeviceTemp = document.querySelectorAll('.address-device__temp');
const releItem = document.querySelectorAll('.rele__item');
const btnSave = document.querySelector('.address-eeprom__save');
const btnAddNewDevice = document.querySelector('.popap-menu__btn-local-storage');
const btnRestartDevice = document.querySelector('.popap-menu__btn-restart-device');
// const inputControlAddress = document.querySelectorAll('.rele__seting-sensor__title');

const releNameInput = document.querySelectorAll('.rele__name-input');

const releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
const delayWhenTurned = document.querySelectorAll('.delay-when-turned');
const releControlTimer = document.querySelectorAll('.delay-when-turned');
const popapTemp = document.querySelectorAll('.popap-info__temp-item');
//  const  btnMenu = document.querySelector('.popap-local-storage__btn-close');
const popapInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');
// console.log(btnMenu)
// const popapClearDevice = document.querySelector('.popap-clear-device');
// const popapClearDeviceItem = document.querySelectorAll('.popap-clear-device__item');
//**************************************************************************************** */

const CONNECT_SSID = userName + '_ssid';
const LOCAL_IP = userName + '_ip';
const getanaloInputA0 = userName + 'analogInputA0';
const stanRele = userName + '_stanRele';
const getEepromSensorData = userName + '_eepromSensorData';
const getDeviceSensorData = userName + '_deviceSensorData';
const outstartDataSensor = userName + '_start-data-sensor-eepromAndDevice';
const outSaveDataSensorEeprom = userName + '_save-data-sensor-eeprom';
const outSaveNameSensorEeprom = userName + '_save-name-sensor-eeprom';

const outSaveDataSensorTemp = userName + '_save-data-sensor-temp';
const outSaveReleName = userName + '_save-rele-name';

const getReleEpromUpr = userName + '_rele_eprom_upr';
const setReleEpromUpr = userName + '_rele_eprom_upr-set_number_sensor';
const setReleEpromUprErorrReleVklVukl = userName + '_rele_eprom_upr-set_erorr_rele_vkl_vukl';
const setReleEpromUprOneOrTwoRangeTemp = userName + '_rele_eprom_upr-set_one_or_two_range_temp';
const setReleEpromUprChangeOnOrOff = userName + '_rele_eprom_upr-set_change_on_or_off';
const setReleEpromUprManual = userName + '_rele-get-eprom_upr-manual';
const setReleVklOtkl = userName + '_set-rele-vkl-otkl';
const setReleDATATIME = userName + '_set-rele-data-time';
const setDefineDevice = userName + '_define_device';
const setResetFunction = userName + '_resetFunction';

const getReleDATATIME = userName + '_out-web-rele-data-time';

const getSensorName = userName + '_sensor-name';
const getReleName = userName + '_rele-name';
const getReleEpromUprManual = userName + '_rele-out-eprom_upr-manual';
const getSensorVklOtklTemp = userName + '_sensor-vkl-otkl';

const popapInfoWrapper = document.querySelector('.popap-info__wrapper');
$(document).ready(function () {
  $("#menu").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top - popapInfoWrapper.clientHeight - 20;
    // top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });
});

let objDevice = {};
let objEeprom = {};
let objSensorEepromUpr = {};
let objSensorVklOtklTemp = {};
let objNameSensor = {};
let objNameRele = {};
let objManualRele = {};

let arrayDatetime = [];
for (let i = 0; i < 8; i++) {
  arrayDatetime.push({
    Datetime: [],
    DatetimeReal: [],
    time: [],
    timeReal: []
  });
}

let downloadedDataEEprom = false;
let downloadedDataDevice = false;
let showEepromFlag = true;

let timeMesage = void 0;
let element = void 0;



{
  //Призначаємо for and id for label and input
  // setIdAndFor(releSetingSwitchLabel, releSetingSwitcIhnput,'seting-switch-');
  // setIdAndFor(labelDey, inputDey,'time-id-' );
  // setIdAndFor(inputControlErrorLabel, inputControlError,'err_on_' );
  // setIdAndFor(releTempChangeLabel, releTempChangeRadio,'on_' );
  // setIdAndFor(releSetingSensorSelectLabel, releSetingSensorSelect,'cars' );

  arrayClass.forEach(e => {
    let L = document.querySelectorAll(e.labelData);
    let I = document.querySelectorAll(e.inputData);
    setIdAndFor(L, I, e.nameData);
  });



  function setIdAndFor(classLabel, clasInput, nameId) {
    clasInput.forEach((e, i) => {
      e.setAttribute('id', (nameId + i));
      classLabel[i].setAttribute('for', ((nameId + i)));
      // console.log(classLabel[i])
    });
  }
}



//==================================

let options = {
  onSuccess: onConnect,
  onFailure: doFail
};

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(getEepromSensorData);
  client.subscribe(getDeviceSensorData);
  client.subscribe(getReleEpromUpr);
  client.subscribe(getSensorVklOtklTemp);
  client.subscribe(stanRele);
  client.subscribe(getSensorName);
  client.subscribe(getReleName);
  client.subscribe(getReleEpromUprManual);
  client.subscribe(getReleDATATIME);
  client.subscribe(CONNECT_SSID);
  client.subscribe(LOCAL_IP);
  client.subscribe(getanaloInputA0);

  // sendMessage(outstartDataSensor, 'readAddressSensor');
  // sendMessage(outstartDataSensor, 'releControl');
  // sendMessage(outstartDataSensor, 'ReadTempVklOtkl');
  // sendMessage(outstartDataSensor, 'NameSensor');
  // sendMessage(outstartDataSensor, 'NameRele');
  // sendMessage(outstartDataSensor, 'ReleManual');
  sendMessage(outstartDataSensor, 'ALL');
  // console.log('ALL');
}

function doFail(e) {}
// console.log(e);


// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

/************************************************************************************************************** */
setInterval(function () {
  // Провірка на дані прийшли чи ні якщо обєти пусті то відправляємо запрос на повторну загрузку

  if (isEmpty(objEeprom) || isEmpty(objDevice) || isEmpty(objSensorEepromUpr) || isEmpty(objSensorVklOtklTemp)) {
    console.log('Є пусті обкти   ');

    sendMessage(outstartDataSensor, 'ALL');

    console.log('objEeprom  ');
    console.log(isEmpty(objEeprom));

    console.log('objDevice  ');
    console.log(isEmpty(objDevice));

    console.log('objSensorEepromUpr  ');
    console.log(isEmpty(objSensorEepromUpr));

    console.log('objSensorVklOtklTemp  ');
    console.log(isEmpty(objSensorVklOtklTemp));

    console.log('**************************************************');
    console.log(' ');
  } else {
    console.log('Немає пустих обктів   ');
  }
}, 15000);
//************************************************************************************************************** */

//************************************************************************************************************** */
function isEmpty(obj) {
  //Провірка на пусті обєкти 
  for (let key in obj) {
    return false;
  }
  return true;
}
//************************************************************************************************************** */

//************************************************************************************************************** */

setInterval(function () {
  showEepromFlag = false;
  // console.log(client);
  sendMessage(outstartDataSensor, 'readAddressSensor');
}, 10000);

//************************************************************************************************************** */

//************************************************************************************************************** */
function sendMessage(topic, message) {
  let mes = new Paho.MQTT.Message(message);
  mes.destinationName = topic;
  mes.qos = 0;
  client.send(mes);
  // console.log('KKKKKKKKKKKKKKKK');
}
// *************************************************************************************************************************
let obj_1 = void 0;
let obj_2 = void 0;
let obj_3 = void 0;

function onMessageArrived(message) {
  // called when a message arrives
  // console.log("onMessageArrived:  " + message.payloadString);
  //  console.log("onMessageArrived:  "+message.destinationName);
  //************************************************************************************************************** */
  if (message.destinationName === getanaloInputA0) {
    // console.log(message.payloadString);
    printAnalogInput.innerText = message.payloadString;
  }
  //************************************************************************************************************** */
  if (message.destinationName === CONNECT_SSID) {
    // console.log(message.payloadString);
    document.querySelector('.info__ssid').innerText = message.payloadString;
  }
  //************************************************************************************************************** */

  if (message.destinationName === LOCAL_IP) {
    // console.log(message.payloadString);
    document.querySelector('.info__ip').innerText = message.payloadString;
  }

  //************************************************************************************************************** */

  if (message.destinationName === getEepromSensorData) {
    //Дані що знаходяться в EEPROM позиція, мак адрес, і температура сенсору
    objEeprom = JSON.parse(message.payloadString);
    // console.log(objEeprom);
    for (let _k = 0; _k < objEeprom.obj.length; _k++) {
      if (showEepromFlag) {
        tableEepromNumber[_k + 1].innerText = objEeprom.obj[_k].number;
        tableEepromAddress[_k + 1].innerText = objEeprom.obj[_k].address.toLocaleUpperCase();
      }
      tableEepromTemp[_k + 1].innerText = objEeprom.obj[_k].temp.toFixed(1);

      if (objEeprom.obj[_k].address != '0000000000000000') {
        if (objNameSensor.obj != undefined) {
          // console.log('7777777777777 ');
          // console.log(objNameSensor.obj);
          popapTemp[_k].textContent = (objNameSensor.obj[_k].nameSensor) + ' ' + (objEeprom.obj[_k].temp.toFixed(1));
        } else {
          popapTemp[_k].innerText = objEeprom.obj[_k].temp.toFixed(1);
        }
      } else {
        popapTemp[_k].closest('.popap-info__lamp-item').classList.add('shiden');
      }


    }

    downloadedDataEEprom = true;
    if (downloadedDataDevice && downloadedDataEEprom) compareSensorAddress();
  }

  //************************************************************************************************************** */

  if (message.destinationName === getDeviceSensorData) {
    //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
    objDevice = JSON.parse(message.payloadString);
    // console.log('objDevice');
    // console.log(objDevice);
    for (let _k2 = 0; _k2 < objDevice.obj.length; _k2++) {
      tableDeviceNumber[_k2 + 1].innerText = objDevice.obj[_k2].number;
      tableDeviceAddress[_k2 + 1].innerText = objDevice.obj[_k2].address.toLocaleUpperCase();
      tableDeviceTemp[_k2 + 1].innerText = objDevice.obj[_k2].temp.toFixed(1);
    }
    downloadedDataDevice = true;
    if (downloadedDataDevice && downloadedDataEEprom) {
      fun1();
      compareSensorAddress();
    }
  }

  //************************************************************************************************************** */
  //біт 0-3 номер датчика який управляє даним реле
  // біт 4 один або два діапазона контроля температрур
  // біт 5 вкл або викл реле при зміні температур або таймера
  // біт 6 стан реле при помилці термодатчмка
  if (message.destinationName === getReleEpromUpr) {
    //получаємо дані з памяті про датчики 
    objSensorEepromUpr = JSON.parse(message.payloadString);
    console.log('objSensorEepromUpr *****');
    console.log(objSensorEepromUpr);

    // convertToBinary1(objSensorEepromUpr.obj[0].number)
    // convertToBinary1(objSensorEepromUpr.obj[1].number)
    // convertToBinary1(objSensorEepromUpr.obj[2].number)
    // convertToBinary1(objSensorEepromUpr.obj[3].number)
    // convertToBinary1(objSensorEepromUpr.obj[4].number)
    // convertToBinary1(objSensorEepromUpr.obj[5].number)
    // convertToBinary1(objSensorEepromUpr.obj[6].number)
    // convertToBinary1(objSensorEepromUpr.obj[7].number)

    fun1();
  }

  //************************************************************************************************************** */

  if (message.destinationName === getSensorVklOtklTemp) {
    //получаємо дані з памяті про температури включення і відкючення
    objSensorVklOtklTemp = JSON.parse(message.payloadString);
    // console.log('objSensorVklOtklTemp *****');
    // console.log(message.payloadString);
    fun2();
  }

  //************************************************************************************************************** */

  if (message.destinationName === stanRele) {
    //получаємо дані про стан кожного реле включене або відключене 

    let stanReleTemp = parseInt(message.payloadString);
    const releOFF = document.querySelectorAll('.lamp-off');
    const releON = document.querySelectorAll('.lamp-on');


    for (n = 0; n < 8; n++) {
      //Засвічуємо або гасимо лампочки
      if (stanReleTemp & 1 << n) {
        releOFF[n].classList.add('disable');
        releON[n].classList.remove('disable');
        popapInfoTempItem[n].classList.remove('on')
        // releOFF[n + 8].classList.add('disable');
        // releON[n + 8].classList.remove('disable');
      } else {
        releOFF[n].classList.remove('disable');
        releON[n].classList.add('disable');
        popapInfoTempItem[n].classList.add('on')

        // releOFF[n + 8].classList.remove('disable');
        // releON[n + 8].classList.add('disable');
      }
    }
  }

  //************************************************************************************************************** */

  if (message.destinationName === getSensorName) {
    // console.log('getSensorName');
    // console.log(message.payloadString);

    try {
      (function () {
        //получаємо дані про стан кожного реле
        objNameSensor = JSON.parse(message.payloadString);
        tableEepromNameSensor.forEach(function (e, i) {

          if (i > 0) {
            e.value = objNameSensor.obj[i - 1].nameSensor;
          }
        });
        // console.log(objNameSensor);
      })();
    } catch (e) {
      console.log('ERROR NAME SENSOR' + e);
    }
  }

  //************************************************************************************************************** */

  if (message.destinationName === getReleName) {
    // console.log('getReleName');
    // console.log(message.payloadString);
    try {
      (function () {
        //получаємо дані про стан кожного реле
        objNameRele = JSON.parse(message.payloadString);

        const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
        // releItemTitleName.forEach((e,i) => {
        //     e.textContent = objNameRele.obj[i].nameRele;

        // });

        releNameInput.forEach(function (e, i) {
          e.value = objNameRele.obj[i].nameRele;
          popapInfoTempItem[i].textContent = objNameRele.obj[i].nameRele;
          releItemTitleName[i].textContent = objNameRele.obj[i].nameRele;
        });
        // console.log('objNameRele');
      })();
    } catch (e) {
      console.log('ERROR NAME RELE' + e);
    }

  }
  //" "
  //************************************************************************************************************** */

  if (message.destinationName === getReleEpromUprManual) {
    (
      function () {
        //получаємо дані про стан кожного реле
        let objManualRele = JSON.parse(message.payloadString);
        // console.log(message.payloadString);
        document.querySelectorAll('.input-control-manually__input').forEach(function (e, i) {
          const parent = e.closest('.rele__item');

          if (objManualRele.obj[i].namberRele == 1) {
            e.checked = true;
            parent.querySelector('.rele__control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
            parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
          } else if (objManualRele.obj[i].namberRele == 0) {
            e.checked = false;
            parent.querySelector('.rele__control-manually').classList.remove('block__show');
            parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
          }
        });
      }
    );
  }
  //************************************************************************************************************** */

  if (message.destinationName === getReleDATATIME) {
    //получаємо дані про таймери
    let tempObj = JSON.parse(message.payloadString);
    // console.log(message.payloadString);
    if (tempObj.NUMPACKAGE === 1) {
      obj_1 = Object.assign({}, tempObj);
    }

    if (tempObj.NUMPACKAGE === 2) {
      obj_2 = Object.assign({}, tempObj);
      // console.log('obj_2');
      // console.log(obj_2);
    }

    if (tempObj.NUMPACKAGE === 3) {
      obj_2.TIME = obj_2.TIME.concat(tempObj.TIME);
      //  console.log('obj_2');
      //  console.log(obj_2);
    }

    if (tempObj.NUMPACKAGE === 4) {
      obj_3 = Object.assign({}, tempObj);
      // obj_3 = JSON.parse(message.payloadString);
      objManualRele = Object.assign(obj_1, obj_2, obj_3);
      // console.log(objManualRele);
      let namberRele = parseInt(objManualRele.NUM);
      const dateTimeInput = releItem[namberRele].querySelectorAll('.datetime');
      const timeInput = releItem[namberRele].querySelectorAll('.time');
      const dayWikend = releItem[namberRele].querySelectorAll('.day');
      // const parent =  releItem[namberRele];


      dateTimeInput.forEach(function (e) {
        e.value = '';
      });

      timeInput.forEach(function (e) {
        e.value = '';
      });

      dayWikend.forEach(function (e) {
        e.checked = true; //ttt
      });

      let delaySecondStart = parseInt(objManualRele.DELAYSECONDSTART);

      if (delaySecondStart < 36000) releControlTimer[namberRele].value = delaySecondStart;
      else releControlTimer[namberRele].value = '0';

      // dateTimeInput[0].value = "2022-05-02T12:55";
      for (i = 0; i < 9; i += 2) {
        if (objManualRele.DATATIME[i] != '65535-99-99T99:99' && objManualRele.DATATIME[i + 1] != '65535-99-99T99:99') {
          // console.log(objManualRele.DATATIME[i]);
          // console.log(objManualRele.DATATIME[i + 1]);
          dateTimeInput[i].value = objManualRele.DATATIME[i];
          dateTimeInput[i + 1].value = objManualRele.DATATIME[i + 1];
          arrayDatetime[namberRele].Datetime[i] = new Date(objManualRele.DATATIME[i]).getTime();
          arrayDatetime[namberRele].DatetimeReal[i] = new Date(objManualRele.DATATIME[i]);
          arrayDatetime[namberRele].Datetime[i + 1] = new Date(objManualRele.DATATIME[i + 1]).getTime();
          arrayDatetime[namberRele].DatetimeReal[i + 1] = new Date(objManualRele.DATATIME[i + 1]);
        }
      }

      for (i = 0; i < 49; i += 2) {
        if (objManualRele.TIME[i] != '99:99' && objManualRele.TIME[i + 1] != '99:99') {
          // console.log(objManualRele.TIME[i]); 
          // console.log( objManualRele.TIME[i+1]);

          timeInput[i].value = objManualRele.TIME[i];
          timeInput[i + 1].value = objManualRele.TIME[i + 1];
          arrayDatetime[namberRele].time[i] = new Date(objManualRele.DATATIME[i]);
          arrayDatetime[namberRele].timeReal[i + 1] = new Date(objManualRele.DATATIME[i + 1]);
        }
      }


      // if(eve.target.checked){
      //   eve.target.previousElementSibling.classList.add('checked');
      // }else{
      //   eve.target.previousElementSibling.classList.remove('checked');
      // }


      for (i = 0; i < 35; i++) {
        if (objManualRele.DEY[i] == 1) {
          dayWikend[i].checked = true;
          dayWikend[i].previousElementSibling.classList.add('checked');
        } ///ttt
        if (objManualRele.DEY[i] == 0) {
          dayWikend[i].checked = false;
          dayWikend[i].previousElementSibling.classList.remove('checked');
        } ///ttt
      }

      // releItem.forEach(function (parent, i) {
      //   const firstDataElement = parent.querySelector('.datetime');
      //   const firstTimeElement = parent.querySelector('.time');
      //   const changeEvent = new Event('change'); // создаем событие
      //   firstDataElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
      //   firstTimeElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
      //   // const clickEvent = new Event('click'); // создаем событие
      //   // firstDataElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
      //   // firstTimeElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
      // });

      document.querySelectorAll('.rele__item').forEach((parent) => {
          const datetime = parent.querySelectorAll('.datetime');
          const time = parent.querySelectorAll('.time');  
          // switchSeting( parent);
          // chekChecedDay(event);
          chekDate(parent, datetime, time);
          chekTime( parent, datetime, time);
          showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
        
      });

    }
    // 2022-5-17T14:26
  }
  //************************************************************************************************************** */
}
//*******************************************************************

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

// document.querySelectorAll('.timer-date__item').forEach(e => {
//   e.classList.remove('show-block');
// });

// document.querySelectorAll('.rele-control-timer').forEach(e => {
//   e.classList.add('block__show');
// });

// document.querySelector('.send__message').addEventListener('click',()=>{
//   sendMessage(outstartDataSensor, 'ALL');
//   console.log('SEND MESSAGE');
// });
// function semd_mess(){
//    sendMessage(outstartDataSensor, 'ALL');

// }


// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
function addBeforeNullNUmber(number) {
  if (number > 9) return number;
  else return '0' + number;
}
// -------------------------------------------------------------------------------------------------------


function fun1() {

  if (objSensorEepromUpr.obj != undefined) {
    //Якщо не пустий обєкт
    // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZ');
    // console.log(objSensorEepromUpr.obj);
    // console.log(objEeprom.obj);
    releItem.forEach(function (e, clickRele) {

      const select = e.querySelector('select');
      const radiochangeRadio = e.querySelectorAll('.rele-temp-change-radio');
      const radioSingle = e.querySelectorAll('.rele-temp-change-single');
      const releError = e.querySelectorAll('.input-control-error');

      k = objSensorEepromUpr.obj[clickRele].number;
      const numSensor = k & 0x0F; // номер сенсора який управляє даним реле
      // console.log('k   +++ ' + clickRele + '  ' + (k &= ~240));
      console.log('--');
      console.log(numSensor);
      convertToBinary1(numSensor);

      if (radioSingle !== null) //якщо не пустий масив

        if (k & 1 << 4) {
          ////1-два діапазона температур включення і відключеня 0-один діапазон температур  включення або відключення
          radioSingle[1].checked = true;
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = false;
        } else {
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = true;
          radioSingle[0].checked = true;
        }

      if (radiochangeRadio !== null) //якщо не пустий масив
        if (k & 1 << 5) {
          //Провірка біт 4 rele_0_eprom_sensor вкл або викл реле при переключені
          radiochangeRadio[0].checked = true;;
          // radiochangeRadio[1].checked = false;
        } else {
          // radiochangeRadio[0].checked = false;
          radiochangeRadio[1].checked = true;
        }

      if (!(releError == null)) //якщо не пустий масив
        if (k & 1 << 6) {
          //біт 6 при несправності термодатчика або неможливість управляти таймером реле залишаємо вкл 1 або відключеним -0
          releError[0].checked = true;
          // releError[1].checked = false;
        } else {
          // releError[0].checked = false;
          releError[1].checked = true;
        }

      //------------------------------------

      const option = select.querySelectorAll('option');

      option.forEach(function (e, i) {
        //видаляємо всі option elements для даного реле крім першого
        if (i > 0) e.remove();
      });

      for (let numEepromSensor = 0; numEepromSensor < 8; numEepromSensor++) {
        //перебираємо всі термодатчики

        let numRele = 15; //номер реле в якому записаний термодатчик
        for (let d = 0; d < 8; d++) {
          //
          z = objSensorEepromUpr.obj[d].number;
          z &= ~240;
          if (z == numEepromSensor) {
            //Нaходимо в масиві для реле номер термодатчика
            numRele = d;
            console.log('numRele - ' + numRele);
            break;
          }
        }

        //якщо адрес не нуль добавляємо  і термодатчика немає в списку реле або він є але записаний в тому реле з яким ми працюємо option з адресом
        if (objEeprom.obj != undefined) {
          if (!(objEeprom.obj[numEepromSensor].address == '0000000000000000' || objEeprom.obj[numEepromSensor].address == 'ffffffffffffffff') && (numRele == clickRele || numRele == 15)) {

            const releSetingSwitchSensor = e.querySelector('.rele__seting-switch__sensor');

            const createOption = document.createElement('option');
            createOption.value = objEeprom.obj[numEepromSensor].number;
            createOption.className = "rele-control-option";

            if (objNameSensor.obj != undefined && objNameSensor.obj[numEepromSensor].nameSensor != '') {
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objNameSensor.obj[numEepromSensor].nameSensor + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            } else {
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objEeprom.obj[numEepromSensor].address.toLocaleUpperCase() + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            }

            if (numRele == clickRele) {
              createOption.selected = true; //Добавляємо вибраним реле яке є в списку керованих
            }
            select.appendChild(createOption);
          }

          try {
            if (numSensor != 15) {
              if (objNameSensor.obj != undefined && objNameSensor.obj[numSensor].nameSensor != '') {
                  if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objNameSensor.obj[numSensor].nameSensor + '  ' + objEeprom.obj[numSensor].temp;
                  else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';

              } else {
                  if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objEeprom.obj[numSensor].address.toLocaleUpperCase() + '  ' + objEeprom.obj[numSensor].temp;
                  else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
              }
            } else {
                e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
            }
          } catch (e) {
            console.log('ERROR numSensor  -- ' + numSensor)
          }

        }

      }

    });
  }
}
// rele-temp-change-radio


document.querySelectorAll('.rele__control-manually_on').forEach(function (e, i) {
  e.addEventListener('click', function () {
    s = i + 'x1k';
    console.log('s----' + s);

    sendMessage(setReleVklOtkl, s);

  });
});

document.querySelectorAll('.rele__control-manually_off').forEach(function (e, i) {
  e.addEventListener('click', function () {
    s = i + 'x0k';
    console.log('s----' + s);

    sendMessage(setReleVklOtkl, s);
  });
});
// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
document.querySelector('.show_table').addEventListener('change', function (e) {
  const sensorContainer = document.querySelector('.sensor');
  if (e.target.checked == true) sensorContainer.classList.add('sensor-show');
  else sensorContainer.classList.remove('sensor-show');
});
// -------------------------------------------------------------------------------------------------------


document.querySelectorAll('select').forEach(function (e) {
  e.addEventListener('change', function (k) {
    // console.log(e.selectedIndex);
    releItem.forEach(function (k, i) {
      if (k == e.closest('.rele__item')) {
        // опреділяєм в якому блоці ми знаходимося тобто номер реле
        // console.log(i);
        // console.log(e.querySelectorAll('option')[e.selectedIndex].value);
        // objSensorEepromUpr.obj[i] = e.querySelectorAll('option')[e.selectedIndex].value ;
        s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
        // console.log('s----' + s);
        sendMessage(setReleEpromUpr, s);
      }
    });
  });
});

// **************************************************************************************

document.querySelectorAll('.rele__timer-seting-show__input').forEach(function (e) {
  e.addEventListener('click', function (a) {
    const parent = e.closest('.rele__item');
    if (a.target.checked) {
      parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас відкриваємо Select
    } else {
      parent.querySelector('.rele-control-timer').classList.remove('block__show');
    }
  });
});




// **************************************************************************************

document.querySelectorAll('.input-control-manually__input').forEach(function (e, num) {
  e.addEventListener('click', function (a) {
    const parent = e.closest('.rele__item');
    if (a.target.checked) {
      parent.querySelector('.rele__control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
      parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
      // console.log('num  ' + num);
      s = num + 'x' + '1' + 'k';
      // console.log('s----' + s);

      sendMessage(setReleEpromUprManual, s);

    } else {
      parent.querySelector('.rele__control-manually').classList.remove('block__show');
      parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
      // console.log(e.name);
      s = num + 'x' + '0' + 'k';
      // console.log('s----' + s);

      sendMessage(setReleEpromUprManual, s);
    }
  });
});

// **************************************************************************************

document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').forEach(function (e) {
  e.addEventListener('keyup', function () { //при вводі даних перевірка на мінімальне і максимальне значення
    // console.log(e.value);
    if (e.value > 120) e.value = 120;
    if (e.value < -50) e.value = -50;
  });
});

document.querySelectorAll('.rele-temp-btn').forEach(function (e, i) {
  //
  e.addEventListener('click', function () {
    s = i + 'v' + e.closest('.rele__item').querySelector('.rele-temp-vkl').value + 'o' + e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value + 'k';

    sendMessage(outSaveDataSensorTemp, s);
    console.log(s);
  });
});

document.querySelectorAll('.rele__name-btn').forEach(function (e, i) {
  e.addEventListener('click', function () {
    s = i + '*#*' + e.closest('.rele__item').querySelector('.rele__name-input').value + '*&*';

    sendMessage(outSaveReleName, s);
    console.log(s);
  });
});

// const inputControlError = document.querySelectorAll('.input-control-error');
// const releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
// const releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');


// *************************************************************************
// // При несправності термодатчика або таймера реле залишаємо вкл або викл
inputControlError.forEach(function (e, i) {

  e.addEventListener('change', function () {
    try {
      let ii = Math.trunc(i / 2);
      // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      // let temp = objSensorEepromUpr.obj[ii].number;

      if (e.value == '0') {
        // console.log('000');
        objSensorEepromUpr.obj[ii].number &= ~(1 << 6);
      } else if (e.value == '1') {
        // console.log('111');
        objSensorEepromUpr.obj[ii].number |= 1 << 6;
      }
      s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprErorrReleVklVukl----' + s);
    convertToBinary1(objSensorEepromUpr.obj[ii].number)

      sendMessage(setReleEpromUprErorrReleVklVukl, s);
    } catch (e) {
      // console.log('ERROR  ' + e);
    }
  });
});

// //  / Включаємо реле або Виключаємо реле  при зміні температури або часу
releTempChangeRadio.forEach(function (e, i) {
  e.addEventListener('change', function () {
    let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    //  let temp = objSensorEepromUpr.obj[ii].number;

    if (e.value == '0') {
      // console.log('000');
      objSensorEepromUpr.obj[ii].number &= ~(1 << 5);
    } else if (e.value == '1') {
      // console.log('111');
      objSensorEepromUpr.obj[ii].number |= 1 << 5;
    }
    s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);
    convertToBinary1(objSensorEepromUpr.obj[ii].number)

    sendMessage(setReleEpromUprChangeOnOrOff, s);

  });
});

// Один діапазон температур або два
releTempChangeSingle.forEach(function (e, i) {
  e.addEventListener('change', function () {
    let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    // let temp = objSensorEepromUpr.obj[ii].number;

    if (e.value == '1') {
      // console.log('000');
      objSensorEepromUpr.obj[ii].number &= ~(1 << 4);
    } else if (e.value == '0') {
      // console.log('111');
      objSensorEepromUpr.obj[ii].number |= 1 << 4;
    }
    s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);
    convertToBinary1(objSensorEepromUpr.obj[ii].number)

    sendMessage(setReleEpromUprOneOrTwoRangeTemp, s);

  });
});
// *************************************************************************
function fun2() {
  const inputTempVkl = document.querySelectorAll('.rele-temp-vkl');
  const inputTempOtkl = document.querySelectorAll('.rele-temp-otkl');
  const releSetingSwitchTempOn = document.querySelectorAll('.rele__seting-switch__temp-on')
  const releSetingSwitchTempOff = document.querySelectorAll('.rele__seting-switch__temp-off')
  try {


    for (let _i = 0; _i < inputTempVkl.length; _i++) {
      if (releSetingSwitchTempOn != null && releSetingSwitchTempOn != undefined) releSetingSwitchTempOn[_i].innerText = 'TEMP_ON  ' + objSensorVklOtklTemp.obj[_i].vkl;
      if (releSetingSwitchTempOff != null && releSetingSwitchTempOff != undefined) releSetingSwitchTempOff[_i].innerText = 'TEMP_OFF  ' + objSensorVklOtklTemp.obj[_i].otkl;
      inputTempVkl[_i].value = objSensorVklOtklTemp.obj[_i].vkl;
      inputTempOtkl[_i].value = objSensorVklOtklTemp.obj[_i].otkl;
    }
  } catch (e) {
    console.log('ERROR  ' + e);
  }
}

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
      element = e.closest('.address-eeprom__data');
    }
  });
});

//=====================================

parentListDevice.forEach(function (e) {
  //добавляємо датчики яких немає в списку EEPROM
  e.addEventListener('click', function () {
    if (e.classList.contains('red') && e.classList.contains('click')) {
      element.querySelector('.address-eeprom__address').innerText = e.querySelector('.address-device__address').textContent;
      compareSensorAddressHtml();
      // CheckClickDevices();
    }
  });
});

// ------------------------------

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

// -------------------------------

// -------------------------------
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


//*********************************************************************** */
// popapClearDevice.classList.add('disable__global');
// popapClearDeviceItem.forEach((e) => e.classList.add('disable__global'));

btnDefineDevice.onclick = () => {
  let rezult = prompt("Підтвердіть введіть (ok)");
  if (rezult === 'ok') {
    // popapClearDevice.classList.remove('disable__global');
    sendMessage(setDefineDevice, 'setDefineDevice');
    console.log('DEFAULT_DEVICE');
  }

};
//*********************************************************************** */



function CheckClickDevices() {
  let flag = false;
  parentListEeprom.forEach(function (e) {
    if (e.classList.contains('active')) {
      //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
      flag = true;
    }
  });

  if (flag) {
    //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
    parentListDevice.forEach(function (e, i) {
      if (i > 0 && e.classList.contains('red')) {
        //якщо датчика немає в списку то ми його робимо клікабельним
        e.classList.add('click');
      }
    });
  } else {
    parentListDevice.forEach(function (e, i) {
      if (i > 0) {
        //якщо датчика немає в списку то ми його робимо клікабельним
        e.classList.remove('click');
      }
    });
  }
}

function compareSensorAddress() {
  compareSensorAddressHtml();
}

function compareSensorAddressHtml() {
  for (let _k3 = 1; _k3 < objDevice.obj.length + 1; _k3++) {
    tableDeviceAddress[_k3].closest('.address-device__data').classList.add('red');
    for (let _n = 1; _n < 9; _n++) {
      if (tableDeviceAddress[_k3].textContent == tableEepromAddress[_n].textContent) {
        tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('red');
        tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('click');
        break;
      }
    }
  }
  CheckClickDevices();
}

// document.querySelector('.time__btn').addEventListener('click', function () {});

// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************




// ********************************************************************************************************************************************************************
// document.querySelectorAll('.datetime, .time').forEach(function (e) {


document.querySelectorAll('.rele__item').forEach((parent) => {



  parent.addEventListener('change', function (event) {
    // console.log('/*/*/*/*/*/*')
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    // console.log(event.target);
    const datetime = parent.querySelectorAll('.datetime');
    const time = parent.querySelectorAll('.time');
    //при зміні на .datetime і  .time визивати обробку
    // const parent = parent.closest('.rele__item');
    // console.log(e)
    // console.log(event.target)
    // console.log(parent)

    if (event.target.classList.contains('rele__seting-switch__input')) switchSeting(event, parent);
    if (event.target.classList.contains('day')) chekChecedDay(event);
    if (event.target.classList.contains('datetime'))chekDate( parent, datetime, time);
    if (event.target.classList.contains('time'))chekTime( parent, datetime, time);
    showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
  });
});

// document.querySelectorAll('.rele__item').forEach(function (parent) {
//   e.addEventListener('click', function (event) {
//     event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
//     // console.log('/*/*/*/*/*/*')
//     // console.log(event.target.closest('.rele__item'));
//     // console.log(this);

//     //при зміні на .datetime і  .time визивати обробку
//     // const parent = parent.closest('.rele__item');

//     // console.log(e)
//     // console.log(parent

//   });
// });


// ********************************************************************************************************************************************************************
function showTimerIcons(parent, datetime, time) {
  const timerIcons = parent.querySelectorAll('.rele__timer-seting-icon');
  for (let d = 0, t = 0; d < 10; d += 2, t += 10) {
    const datetimeValue = new Date(datetime[d].value).getTime();
    const timeValue = time[t].value;
    if (d == 0) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[0].classList.add('show-block');
      else timerIcons[0].classList.remove('show-block');
    }
    if (d == 2) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[1].classList.add('show-block');
      else timerIcons[1].classList.remove('show-block');
    }
    if (d == 4) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[2].classList.add('show-block');
      else timerIcons[2].classList.remove('show-block');
    }
    if (d == 6) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[3].classList.add('show-block');
      else timerIcons[3].classList.remove('show-block');
    }
    if (d == 8) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[4].classList.add('show-block');
      else timerIcons[4].classList.remove('show-block');
    }
  }
}

function switchSeting(event, parent) {//Покузує або скриває блок з настройками
    if (event.target.checked) parent.querySelector('.rele__section-seting').classList.add('show-block');
    else parent.querySelector('.rele__section-seting').classList.remove('show-block');
}

function chekChecedDay(event) { //Включає виключає дні тижня
    event.target.previousElementSibling.classList.toggle('checked');
    if (event.target.checked) {
      event.target.previousElementSibling.classList.add('checked');
    } else {
      event.target.previousElementSibling.classList.remove('checked');
    }
}

// ********************************************************************************************************************************************************************
function chekDate( parent, datetime, time) {
  //обробка дати 
  const numberReleClick = parent.getAttribute('data-rele');
  const timerBlock = parent.querySelectorAll('.timer-date__item');

  datetime.forEach(function (k, i) {
    let dateInput = new Date(k.value).getTime();
    // console.log("curentDate");
    // console.log(numberReleClick);
    // console.log(new Date().getTime());

    arrayDatetime[numberReleClick].Datetime[i] = dateInput;//В секундах
    arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(k.value);//нермальний формат
   
    if (arrayDatetime[numberReleClick].DatetimeReal[i]  != 'Invalid Date') {//Якщо введена дата
      // console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
      // console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
      // console.log(time[i * 5].value)
      if (i % 2 == 0) {
        //neparnyy element
        if (time[i * 5].value != '') {//Якщо введений час
          datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'start');//Міняємо в даті годину на 00:00
          if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
        }
      } else {
       //parnyy elemen
        if (time[(i-1) * 5].value != '') {
          datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'end');//Міняємо в даті годину на 23:59
          if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
        }
      }
    }


    for (let _n2 = 0; _n2 < 9; _n2 += 2) {
      if (arrayDatetime[numberReleClick].Datetime[_n2] >= arrayDatetime[numberReleClick].Datetime[_n2 + 1]) {
        //Якщо в одному рядку друга дата менша або дорівнює першій
        datetime[_n2].classList.add('date-red__color');
        datetime[_n2 + 1].classList.add('date-red__color');
      } else {
        datetime[_n2].classList.remove('date-red__color');
        datetime[_n2 + 1].classList.remove('date-red__color');
      }

      if (datetime[_n2].value == '' && datetime[_n2 + 1].value !== '' || datetime[_n2].value !== '' && datetime[_n2 + 1].value == '') {
        //Якщо в рядку незаповнене одне з полів
        if (datetime[_n2].value == '') datetime[_n2].classList.add('date-blue__backround');
        else datetime[_n2 + 1].classList.add('date-blue__backround');
      } else {
        datetime[_n2].classList.remove('date-blue__backround');
        datetime[_n2 + 1].classList.remove('date-blue__backround');
      }

      for (let _n3 = 0, _nn = 1; _n3 < 7; _n3 += 2, _nn++) {
        // n= [0 1 2 3 4 5 6 7 ]    nn = [1 3 ]
        if (datetime[_n3].value != '' && datetime[_n3 + 1].value != '' && !datetime[_n3].classList.contains('date-red__color')) {
          //Для розблокіровки для дальших блоків
          // console.log('checkDaTETRUE');
          timerBlock[_nn].classList.add('date-show-block');
          // timerBlock[nn].classList.add('date-show-block');

          // block1[nn] = true;
        } else {
          // console.log('checkDaTEFALSE');

          // block1[nn] = false;

          timerBlock[_nn].classList.remove('date-show-block');
          // timerBlock[nn].classList.remove('date-show-block');
        }
      }
    }

    // ********************************************************************************************************************************************************************
    // } else {
    //   // k.value = '';
    //   // console.log('date error');
    // }
  });
}
// ********************************************************************************************************************************************************************


// function checkDataAndTime(datetime, time, numberReleClick){  // Якщо є вибрано поля дата і поля час то поле дата годину старт ставимо 00:00 а кінець 23:59
//   datetime.forEach(function (k, i) {
//     if (arrayDatetime[numberReleClick].DatetimeReal[i]  != 'Invalid Date') {//Якщо введена дата
//       console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
//       console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
//       console.log(time[i * 5].value)
//       if (i % 2 == 0) {
//         //neparnyy element
//         if (time[i * 5].value != '') {//Якщо введений час
//           datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'start');//Міняємо в даті годину на 00:00
//           if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       } else {
//        //parnyy elemen
//         if (time[(i-1) * 5].value != '') {
//           console.log(formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'end'));
//           datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'end');//Міняємо в даті годину на 23:59
//           if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       }
//     }
//   });
// }


// ********************************************************************************************************************************************************************
function chekTime(parent, datetime, time) {
  //обробка часу
  const numberReleClick = parent.getAttribute('data-rele');
  const timerBlock = parent.querySelectorAll('.timer-date__item');
  const checkedDey = parent.querySelectorAll('.day');


  time.forEach(function (k, i) {
    t2 = new Date(0);
    str = k.value;
    // console.log(k)

    if (k.value != '') {
      t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
      arrayDatetime[numberReleClick].timeReal[i] = t2;
      t2 = t2.getTime();
      arrayDatetime[numberReleClick].time[i] = t2;
    } else {
      arrayDatetime[numberReleClick].timeReal[i] = '';
      arrayDatetime[numberReleClick].time[i] = '';
    }

    //   // ********************************************************************************************************************************************************************

    for (let _n4 = 0; _n4 < 49; _n4 += 2) {

      if (arrayDatetime[numberReleClick].time[_n4] >= arrayDatetime[numberReleClick].time[_n4 + 1] && arrayDatetime[numberReleClick].time[_n4 + 1] !== '') {
        //Якщо в одному рядку друга дата менша або дорівнює першій
        time[_n4].classList.add('time-red__color');
        time[_n4 + 1].classList.add('time-red__color');
      } else {
        time[_n4].classList.remove('time-red__color');
        time[_n4 + 1].classList.remove('time-red__color');
      }

      if (time[_n4].value == '' && time[_n4 + 1].value !== '' || time[_n4].value !== '' && time[_n4 + 1].value == '') {
        //Якщо в рядку незаповнене одне з полів
        if (time[_n4].value == '') time[_n4].classList.add('time-blue__backround');
        else time[_n4 + 1].classList.add('time-blue__backround');
      } else {
        time[_n4].classList.remove('time-blue__backround');
        time[_n4 + 1].classList.remove('time-blue__backround');
      }
    }

    for (let u = 1; u < 49; u += 10) {

      for (let _n5 = u; _n5 < u + 8; _n5 += 2) {
        if (arrayDatetime[numberReleClick].time[_n5] + 1 > arrayDatetime[numberReleClick].time[_n5 + 1] && arrayDatetime[numberReleClick].time[_n5 + 1] !== '') {
          //Якщо  другий рядок є менший за перший рядок 
          time[_n5].classList.add('time-red__backround');
          time[_n5 + 1].classList.add('time-red__backround');
        } else {
          time[_n5].classList.remove('time-red__backround');
          time[_n5 + 1].classList.remove('time-red__backround');
        }
      }
    }
    //  checkDataAndTime(datetime, time, numberReleClick);
    //********************************************************************************************** */
    // console.log("MMMMMMMMMMMMMMMMMMMMMMAAAAAAAAAAAAAA");
    // console.log(k);
    // console.log(eve.currentTarget);

          if(i === 0 || i === 10 || i === 20 || i ===30 || i === 40) {

            // console.log('************  ' + numberReleClick + '  ****************  ' + i + '  *********')
            // console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
            // console.log(time[i].value)

          if (arrayDatetime[numberReleClick].DatetimeReal[i / 5] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5] != undefined && time[i].value != '') {
            datetime[i / 5].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5], 'start');
            arrayDatetime[numberReleClick].DatetimeReal[i / 5] = new Date(datetime[i / 5].value);
            // console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK");

          }

          if (arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != undefined && time[i].value != '') {
            datetime[i / 5 + 1].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1], 'end');
            arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] = new Date(datetime[i / 5 + 1].value);
            // console.log("NNNNNNNNNNNNNNNNNNNNNNNNNN");
          }
        }


    for (let _u = 0, _nn2 = 1, nnn = 0; _u < 45; _u += 10, _nn2++, nnn += 7) {
      //u number section first element 0 10 20 30 40  nn вказує на номер секції 1 2 3 4 5


      for (let _n6 = _u; _n6 < _u + 9; _n6 += 2) {
        // n  перебираємо  парні  елементи в секції 0 2 4 6 8    10 12 14 16 18  20 22 24 26 28  30 32 34 36 38  40 42 44 46 48 
        if (_n6 < _u + 7)
          if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
            //Для розблокіровки для дальших рядків
            time[_n6 + 2].classList.remove('hiden-time');
            time[_n6 + 1 + 2].classList.remove('hiden-time');
          } else {
            time[_n6 + 2].classList.add('hiden-time');
            time[_n6 + 1 + 2].classList.add('hiden-time');
          }
      }

      if (_nn2 < 5) {
        if (time[_u + 8].value != '' && time[_u + 9].value != '') {
          //Для розблокіровки для дальших блоків//розблокувати
          if (!timerBlock[_nn2].classList.contains('date-show-block')) timerBlock[_nn2].classList.add('time-show-block');

          // timerBlock[nn].classList.remove('time-show-block');
        } else {
          timerBlock[_nn2].classList.remove('time-show-block');

          // timerBlock[nn].classList.add('time-show-block');
        }
      }

      //   const error_class = parent.querySelectorAll('.time-red__color');
      // console.log('length error  ' + error_class.length);
      // if ((time[u].value != '' && !time[u].classList.contains('time-red__color')) ) { //Для розблокіровки сhecked element даного блоку


      if (time[_u].value != '' && !time[_u].classList.contains('time-red__color')) {
        // if (time[_u].value != '' && time[_u] === eve.currentTarget && !time[_u].classList.contains('time-red__color')) {

        //Для розблокіровки сhecked element даного блоку
        for (f = 0; f < 7; f++) {
          // checkedDey[nnn + f].disabled = false;//ttt
          // checkedDey[nnn + f].checked = true;//ttt
        }
      } else {
        if (time[_u].value == '')
          for (f = 0; f < 7; f++) {
            // checkedDey[nnn + f].disabled = true;//ttt
          }
      }
    }
    //   // ********************************************************************************************************************************************************************

  });
}
// ********************************************************************************************************************************************************************


function formatDataAndTime(date, typ) {

  let strDate = date.getFullYear() + '-';
  strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  strDate += '-';
  strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  if (typ == 'start') strDate += 'T00:00';
  else if ('end') strDate += 'T23:59';
  // console.log('strDatestrDatestrDate  ' + strDate);
  return strDate;
}

function formatDataAndTimeFull(date) {

  let strDate = date.getFullYear() + '-';
  strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  strDate += '-';
  strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  strDate += 'T';
  strDate += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  strDate += ':';
  strDate += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  // console.log('strDatestrDatestrDate  ' + strDate);
  return strDate;
}

// document.querySelectorAll('.day ').forEach(function (e, i) {
//   e.addEventListener('click', function (ee) {
//     const parent = e.closest('.rele__item');
//   });
// });


// 2022-06-12T00:00 format input date set


document.querySelectorAll('.time__btn ').forEach(function (e, i) {

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
        // console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);

        if (arrayDatetime[i].DatetimeReal[nn] != 'Invalid Date') {
          // console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);
          let dateInput = new Date(arrayDatetime[i].DatetimeReal[nn]).getTime();
          dateInput = dateInput / 1000;
          console.log("ZZZZZZZZZZZZ");
          console.log(arrayDatetime[i].DatetimeReal[nn]);
          _s += dateInput + '-'; //Рік  v minute
          _s += arrayDatetime[i].DatetimeReal[nn].getFullYear() + '-'; //Рік
          _s += arrayDatetime[i].DatetimeReal[nn].getMonth() + 1 + '-'; //Місяць
          _s += arrayDatetime[i].DatetimeReal[nn].getDate() + '-'; //день 1-31
          _s += arrayDatetime[i].DatetimeReal[nn].getHours() + '-'; //Година
          _s += arrayDatetime[i].DatetimeReal[nn].getMinutes() + '-'; //Хвилина
          _s += arrayDatetime[i].DatetimeReal[nn].getDay() + '-'; //День тижня 0-6
        } else {
          _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
        }
      }

      for (nn = 0; nn < 50; nn++) {
        // console.log( "HHHHHHHHH  " ); 

        console.log(arrayDatetime[i].timeReal[nn]);

        if (arrayDatetime[i].timeReal[nn] != undefined && arrayDatetime[i].timeReal[nn] != '') {
          _s += arrayDatetime[i].timeReal[nn].getHours() + "-" + arrayDatetime[i].timeReal[nn].getMinutes() + '-';
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

document.querySelectorAll('.time__btn-clear').forEach(function (e, i) {
  e.addEventListener('click', function () {
    messageDate(i);
    releItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
      e.value = '';
    });
  });
});

function messageDate(inter) {
  s = 'RELE' + inter + '-65535-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-';
  console.log(s);

  sendMessage(setReleDATATIME, s);

}

//*********************************************************************** */
//show menu local storage
const POPAP_MENU = document.querySelector('.popap-menu');

window.onclick = (e) => {
  if (e.target != POPAP_MENU)
    if (e.target != burgerMenu && e.target != burgerMenuLine) {
      POPAP_MENU.classList.remove('popap-menu__show');
      burgerMenu.classList.remove('showw');
    } else {
      POPAP_MENU.classList.toggle('popap-menu__show');
      burgerMenu.classList.toggle('showw');
    }
};

















btnAddNewDevice.addEventListener('click', () => {
  POPAP_MENU.classList.toggle('popap-menu__show');
  document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
  // document.querySelector('.popap-local-storage__input-text').value = localStorage.getItem('nameDevice');
});

localStorageBtnClose.addEventListener('click', () => {
  document.querySelector('.popap-local-storage').classList.remove('popap-local-storage__show');
});


btnRestartDevice.addEventListener('click', restartDevice);

function restartDevice() {
  let rezult = prompt("Підтвердіть введіть (ok)");
  if (rezult === 'ok') sendMessage(setResetFunction, 'resetFunction');
}


document.querySelector('.popap-local-storage__top-list').addEventListener('click', selectItem)
document.querySelector('.popap-local-storage-menu__list').addEventListener('click', selectItemMenu)

document.querySelector('.popap-local-storage__btn-add').addEventListener('click', checkForm)
document.querySelector('.popap-local-storage__btn-remove').addEventListener('click', removeItemList)
document.querySelector('.popap-local-storage__btn-close').addEventListener('click', closeForm)

function selectItem(event) {
  event.preventDefault();
  const dev = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-device').innerText;
  const nam = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-name').innerText;
  if (dev != 'Name Device' || nam != 'Name') {
    console.log(dev);
    console.log(nam);
    event.target.closest('.popap-local-storage__top-item').classList.toggle('click');
  }

}


function selectItemMenu(event) {
  event.preventDefault();
  const dev = event.target.closest('.popap-local-storage-menu__item').querySelector('.popap-local-storage-menu__device').innerText;
  const nam = event.target.closest('.popap-local-storage-menu__item').querySelector('.popap-local-storage-menu__name').innerText;
  if (dev != 'Name Device' || nam != 'Name') {
    console.log(dev);
    console.log(nam);
    document.querySelector('.info__local-storage').innerText = dev + '     ' + nam;
    userName = dev;
    let obj = {
      NameDevice: dev,
      Name: nam,
    }
    localStorage.setItem('Device', JSON.stringify(obj));
    // addEventListenerClick();
  }

}


{
  let arr = [];
  if (localStorage.getItem('DeviceArr') != null) {
    arr = JSON.parse(localStorage.getItem('DeviceArr'));
  }
  removeList();
  printListDevuci(arr);
}



////////////////////////////////////////////////////
function removeItemList(event) { //удаляємо видалені пристрої
  event.preventDefault();
  let arr = [];
  const itemDevice = document.querySelectorAll('.popap-local-storage__top-item');
  if (localStorage.getItem('DeviceArr') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
    arr = JSON.parse(localStorage.getItem('DeviceArr'));

    let newArr = [];
    let flafClick = false;
    itemDevice.forEach((e, i) => {
      if (i > 0) {
        console.log(arr);
        if (e.classList.contains('click')) {
          flafClick = true
          const deleteDevice = e.querySelector('.popap-local-storage__top-device').innerText;
          arr.forEach((ee) => {
            if (ee != null && ee.NameDevice != deleteDevice) {
              newArr.push(ee);
            }
          });
        }
      }
    });

    // console.log(newArr);
    if (flafClick == true) {
      localStorage.setItem('DeviceArr', JSON.stringify(newArr));
      removeList();
      printListDevuci(newArr);
    }

  } else return false;
}

//////////////////////////////////////////////////////////

function closeForm(event) {
  event.preventDefault();
}

function checkForm(event) {
  event.preventDefault();
  let arr = [];
  let obj = {
    // NameDevice: "",
    // Name: "",
  }

  const form = document.querySelector('.popap-local-storage__form');
  let nameDevice = form.device.value;
  let name = form.name.value;
  let fail
  if (localStorage.getItem('DeviceArr') != null) {
    arr = JSON.parse(localStorage.getItem('DeviceArr'));
  }


  if ((nameDevice == '' || name == '') && (nameDevice != 'Name Device' || name == 'Name'))
    fail = 'Заповніть всі поля';
  else if (arr != '') {
    arr.forEach(e => {
      if (e.NameDevice === nameDevice) {
        fail = 'Такий пристрій вже є';
      }
    })
  }

  if (fail != undefined) {
    alert(fail);
    return;
  }



  obj.NameDevice = nameDevice;
  obj.Name = name;
  arr.push(obj);
  localStorage.setItem('DeviceArr', JSON.stringify(arr));
  removeList();
  printListDevuci(arr);
}

function removeList() {
  const item = document.querySelectorAll('.popap-local-storage__top-item, .popap-local-storage-menu__item')
  item.forEach((e, i) => {
    if (i > 0) e.remove();
  })
}

function printListDevuci(arr) {
  //******************************************** */  
  arr.forEach((e) => {
    if (e != null) {
      const ul = document.querySelector('.popap-local-storage__top-list');
      const ulMenu = document.querySelector('.popap-local-storage-menu__list');
      let li = document.createElement('li');
      // let a = document.createElement('a');
      let p = document.createElement('p');
      let p1 = document.createElement('p');


      li.className = 'popap-local-storage__top-item';
      // a.href = "#";
      p.className = 'popap-local-storage__top-device';
      p.innerText = e.NameDevice;
      //  a.append(p);
      p1.className = 'popap-local-storage__top-name';
      p1.innerText = e.Name;
      // a.append(p1);
      li.append(p);
      li.append(p1);

      ul.append(li);

      let limenu = document.createElement('li');
      // let amenu = document.createElement('a');
      let pmenu = document.createElement('p');
      let p1menu = document.createElement('p');

      limenu.className = 'popap-local-storage-menu__item';
      // amenu.href = "#";
      pmenu.className = 'popap-local-storage-menu__device';
      pmenu.innerText = e.NameDevice;
      // amenu.append(pmenu);
      p1menu.className = 'popap-local-storage-menu__name';
      p1menu.innerText = e.Name;
      // amenu.append(p1menu);
      limenu.append(pmenu);

      limenu.append(p1menu);
      ulMenu.append(limenu);
    }
  });

  //******************************************** */
}



















// } // end fuction addEventListenerClick















const releItemTitlePin = document.querySelectorAll('.rele__item-title-pin');
releItemTitlePin[0].textContent = 'PIN 5'
releItemTitlePin[1].textContent = 'PIN 4'
releItemTitlePin[2].textContent = 'PIN 0'
releItemTitlePin[3].textContent = 'PIN 2'
releItemTitlePin[4].textContent = 'PIN 12'
releItemTitlePin[5].textContent = 'PIN 13'
releItemTitlePin[6].textContent = 'PIN 3'
releItemTitlePin[7].textContent = 'PIN 1'
// } catch (e) {
//   console.log('GLOBAL ERROR >>>  ' + e)
// }

// }