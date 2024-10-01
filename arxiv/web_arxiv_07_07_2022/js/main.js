// "use strict";

// window.onload = function() {
// console.log(localStorage.getItem('test'));
// localStorage.setItem('nameDevice', 'miro-benech_1')
if (localStorage.getItem('nameDevice') != null) {
  console.log(localStorage.getItem('nameDevice'));
  document.querySelector('.info__local-storage').innerText = localStorage.getItem('nameDevice');
} else {
  console.log('none');
  document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
}

addEventListenerClick();

function addEventListenerClick() {
  let userName = localStorage.getItem('nameDevice');

  var monitor = document.querySelectorAll('.data-topic');
  let client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "userName-" + parseInt(Math.random() * 100, 10));
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  const printAnalogInput = document.querySelector('.popap-info__analog-input');
  const parentListEeprom = document.querySelectorAll('.address-eeprom__data');
  const tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
  const tableEepromAddress = document.querySelectorAll('.address-eeprom__address');
  const tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');

  const tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
  const btnClear = document.querySelectorAll('.address-eeprom__btn.clear');
  const btnChange = document.querySelectorAll('.address-eeprom__btn.change');
  const btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
  // const btnClearAll = document.querySelector('.address-eeprom__btn.clear-all');
  // const btnChangeAll = document.querySelector('.address-eeprom__btn.change-all');
  const parentListDevice = document.querySelectorAll('.address-device__data');

  const tableDeviceNumber = document.querySelectorAll('.address-device__number');
  const tableDeviceAddress = document.querySelectorAll('.address-device__address');
  const tableDeviceTemp = document.querySelectorAll('.address-device__temp');
  const releItem = document.querySelectorAll('.rele__item');
  const btnSave = document.querySelector('.address-eeprom__save');
  const inputControlAddress = document.querySelectorAll('.input-control-address');

  const releNameInput = document.querySelectorAll('.rele-name-input');
  const inputControlError = document.querySelectorAll('.input-control-error');
  const releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
  const releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
  const delayWhenTurned = document.querySelectorAll('.delay-when-turned');
  const releControlTimer = document.querySelectorAll('.delay-when-turned');
  const popapTemp = document.querySelectorAll('.popap-info__temp-item');

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


  const getReleDATATIME = userName + '_out-web-rele-data-time';

  const getSensorName = userName + '_sensor-name';
  const getReleName = userName + '_rele-name';
  const getReleEpromUprManual = userName + '_rele-out-eprom_upr-manual';
  const getSensorVklOtklTemp = userName + '_sensor-vkl-otkl';

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

  var downloadedDataEEprom = false;
  var downloadedDataDevice = false;
  var showEepromFlag = true;

  var timeMesage = void 0;
  var element = void 0;
  //==================================

  var options = {
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
    console.log('ALL');
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
    for (var key in obj) {
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
    var mes = new Paho.MQTT.Message(message);
    mes.destinationName = topic;
    mes.qos = 0;
    client.send(mes);
    console.log('KKKKKKKKKKKKKKKK');
  }
  // *************************************************************************************************************************
  var obj_1 = void 0;
  var obj_2 = void 0;
  var obj_3 = void 0;

  function onMessageArrived(message) {
    // called when a message arrives
    // console.log("onMessageArrived:  " + message.payloadString);
    //  console.log("onMessageArrived:  "+message.destinationName);
    //************************************************************************************************************** */
    if (message.destinationName === getanaloInputA0) {
      console.log(message.payloadString);
      printAnalogInput.innerText = message.payloadString;
    }
    //************************************************************************************************************** */
    if (message.destinationName === CONNECT_SSID) {
      console.log(message.payloadString);
      document.querySelector('.info__ssid').innerText = message.payloadString;
    }
    //************************************************************************************************************** */

    if (message.destinationName === LOCAL_IP) {
      console.log(message.payloadString);
      document.querySelector('.info__ip').innerText = message.payloadString;
    }

    //************************************************************************************************************** */

    if (message.destinationName === getEepromSensorData) {
      //Дані що знаходяться в EEPROM позиція, мак адрес, і температура сенсору
      objEeprom = JSON.parse(message.payloadString);
      // console.log(objEeprom);
      for (var _k = 0; _k < objEeprom.obj.length; _k++) {
        if (showEepromFlag) {
          tableEepromNumber[_k + 1].innerText = objEeprom.obj[_k].number;
          tableEepromAddress[_k + 1].innerText = objEeprom.obj[_k].address.toLocaleUpperCase();
        }
        tableEepromTemp[_k + 1].innerText = objEeprom.obj[_k].temp.toFixed(1);
        popapTemp[_k].innerText = objEeprom.obj[_k].temp.toFixed(1);
      }

      downloadedDataEEprom = true;
      if (downloadedDataDevice && downloadedDataEEprom) compareSensorAddress();
    }

    //************************************************************************************************************** */

    if (message.destinationName === getDeviceSensorData) {
      //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
      objDevice = JSON.parse(message.payloadString);
      console.log('objDevice');
      console.log(objDevice);
      for (var _k2 = 0; _k2 < objDevice.obj.length; _k2++) {
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

      var stanReleTemp = parseInt(message.payloadString);
      var releOFF = document.querySelectorAll('.lamp-off');
      var releON = document.querySelectorAll('.lamp-on');
      // var popapReleOFF = document.querySelectorAll('.popap-info .lamp-off');
      // var popapReleON = document.querySelectorAll('popap-info .lamp-on');

      for (n = 0; n < 8; n++) {
        //Засвічуємо або гасимо лампочки
        if (stanReleTemp & 1 << n) {
          releOFF[n].classList.add('disable');
          releON[n].classList.remove('disable');
          releOFF[n + 8].classList.add('disable');
          releON[n + 8].classList.remove('disable');
        } else {
          releOFF[n].classList.remove('disable');
          releON[n].classList.add('disable');
          releOFF[n + 8].classList.remove('disable');
          releON[n + 8].classList.add('disable');
        }
      }
    }

    //************************************************************************************************************** */

    if (message.destinationName === getSensorName) {
      (function () {
        //получаємо дані про стан кожного реле
        var objNameSensor = JSON.parse(message.payloadString);
        // console.log(message.payloadString);
        tableEepromNameSensor.forEach(function (e, i) {
          if (i > 0) {
            e.value = objNameSensor.obj[i - 1].nameSensor;
          }
        });
        // console.log(objNameSensor);
      })();
    }

    //************************************************************************************************************** */

    if (message.destinationName === getReleName) {
      console.log(message.payloadString);
      // (function () {
      //   //получаємо дані про стан кожного реле
      //   var objNameRele = JSON.parse(message.payloadString);
      //   releNameInput.forEach(function (e, i) {

      //     e.value = objNameRele.obj[i].nameRele;
      //   });
      //   console.log('objNameRele');
      // })();
    }

    //************************************************************************************************************** */

    if (message.destinationName === getReleEpromUprManual) {
      (function () {
        //получаємо дані про стан кожного реле
        var objManualRele = JSON.parse(message.payloadString);
        // console.log(message.payloadString);
        document.querySelectorAll('.input-control-manually').forEach(function (e, i) {
          var parent = e.closest('.rele__item');

          if (objManualRele.obj[i].namberRele == 1) {
            e.checked = true;
            parent.querySelector('.rele-control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
            parent.querySelector('.control-manually_on-off').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
          }

          if (objManualRele.obj[i].namberRele == 0) {
            e.checked = false;
            parent.querySelector('.rele-control-manually').classList.remove('block__show');
            parent.querySelector('.control-manually_on-off').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
          }
        });
      })();
    }
    //************************************************************************************************************** */

    if (message.destinationName === getReleDATATIME) {
      //получаємо дані про таймери
      var tempObj = JSON.parse(message.payloadString);
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
        console.log(objManualRele);

        var namberRele = parseInt(objManualRele.NUM);
        var dateTimeInput = releItem[namberRele].querySelectorAll('.datetime');
        var timeInput = releItem[namberRele].querySelectorAll('.time');
        var dayWikend = releItem[namberRele].querySelectorAll('.day');

        dateTimeInput.forEach(function (e) {
          e.value = '';
        });

        timeInput.forEach(function (e) {
          e.value = '';
        });

        dayWikend.forEach(function (e) {
          e.disabled = true;
        });

        var delaySecondStart = parseInt(objManualRele.DELAYSECONDSTART);

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

        for (i = 0; i < 35; i++) {
          if (objManualRele.DEY[i] == 1) dayWikend[i].checked = true;
          if (objManualRele.DEY[i] == 0) dayWikend[i].checked = false;
        }

        releItem.forEach(function (parent, i) {
          if (i == 0 || i == 1) {
            var firstDataElement = parent.querySelector('.datetime');
            var firstTimeElement = parent.querySelector('.datetime');
            var changeEvent = new Event('change'); // создаем событие
            firstDataElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            firstTimeElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            var clickEvent = new Event('click'); // создаем событие
            firstDataElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
            firstTimeElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
          }
        });
      }
      // 2022-5-17T14:26
    }
    //************************************************************************************************************** */
  }
  //*******************************************************************

  setInterval(function () {
    var date = new Date();
    var newDateFormat = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    document.querySelector('.popap-info__date-time').innerText = newDateFormat;
  }, 1000);

  // document.querySelectorAll('.timer-date__item').forEach(e => {
  //   e.classList.remove('show-block');
  // });

  // document.querySelectorAll('.rele-control-timer').forEach(e => {
  //   e.classList.add('block__show');
  // });

  // document.querySelector('.send__message'),addEventListener('click',()=>{
  //   sendMessage(outstartDataSensor, 'ALL');
  //   console.log('SEND MESSAGE');
  // });
  // function semd_mess(){
  //    sendMessage(outstartDataSensor, 'ALL');

  // }


  // -------------------------------------------------------------------------------------------------------



  function fun1() {

    if (!(objSensorEepromUpr.obj == undefined)) {
      //Якщо не пустий обєкт
      // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZ');
      // console.log(objSensorEepromUpr.obj);
      // console.log(objEeprom.obj);

      // inputControlAddress.forEach((e, clickRele) => {
      releItem.forEach(function (e, clickRele) {

        var select = e.querySelector('select');

        var radiochangeRadio = e.querySelectorAll('.rele-temp-change-radio');
        var radioSingle = e.querySelectorAll('.rele-temp-change-single');
        var releError = e.querySelectorAll('.input-control-error');

        k = objSensorEepromUpr.obj[clickRele].number;

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
        // ------------------------------------

        var option = select.querySelectorAll('option');
        option.forEach(function (e, i) {
          //видаляємо всі option elements для даного реле крім першого
          if (i > 0) e.remove();
        });

        for (var numEepromSensor = 0; numEepromSensor < 8; numEepromSensor++) {
          //перебираємо всі термодатчики

          var numRele = 15; //номер реле в якому записаний термодатчик
          for (var d = 0; d < 8; d++) {
            //
            z = objSensorEepromUpr.obj[d].number;
            z &= ~240;
            if (z == numEepromSensor) {
              //Нaходимо в масиві для реле номер термодатчика
              numRele = d;
              break;
            }
          }

          //якщо адрес не нуль добавляємо  і термодатчика немає в списку реле або він є але записаний в тому реле з яким ми працюємо option з адресом
          if (!(objEeprom.obj[numEepromSensor].address == '0000000000000000' || objEeprom.obj[numEepromSensor].address == 'ffffffffffffffff') && (numRele == clickRele || numRele == 15)) {

            // console.log('XXX  ' + numRele+ '  clickRele   ' + clickRele );


            var createOption = document.createElement('option');
            createOption.value = objEeprom.obj[numEepromSensor].number;
            createOption.className = "rele-control-option";
            createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objEeprom.obj[numEepromSensor].address.toLocaleUpperCase() + ' -- ' + objEeprom.obj[numEepromSensor].temp;

            if (numRele == clickRele) {
              createOption.selected = true; //Добавляємо вибраним реле яке є в списку керованих
            }
            select.appendChild(createOption);
          }
        }
      });
    }
  }
  // rele-temp-change-radio








  document.querySelectorAll('.rele-control-manually_on').forEach(function (e, i) {
    e.addEventListener('click', function () {
      s = i + 'x1k';
      console.log('s----' + s);

      sendMessage(setReleVklOtkl, s);

    });
  });

  document.querySelectorAll('.rele-control-manually_off').forEach(function (e, i) {
    e.addEventListener('click', function () {
      s = i + 'x0k';
      console.log('s----' + s);

      sendMessage(setReleVklOtkl, s);
    });
  });
  // -------------------------------------------------------------------------------------------------------


  // -------------------------------------------------------------------------------------------------------
  document.querySelector('.show_table').addEventListener('change', function (e) {
    var sensorContainer = document.querySelector('.sensor-container');
    if (e.target.checked == true) sensorContainer.classList.add('sensor-container-show');
    else sensorContainer.classList.remove('sensor-container-show');
  });
  // -------------------------------------------------------------------------------------------------------


  document.querySelectorAll('select').forEach(function (e) {
    e.addEventListener('change', function (k) {
      // console.log(e.selectedIndex);
      releItem.forEach(function (k, i) {
        if (k == e.closest('.rele__item')) {
          // опреділяєм в якому блоці ми знаходимося тобто номер реле
          console.log(i);
          console.log(e.querySelectorAll('option')[e.selectedIndex].value);
          // objSensorEepromUpr.obj[i] = e.querySelectorAll('option')[e.selectedIndex].value ;
          s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
          console.log('s----' + s);
          sendMessage(setReleEpromUpr, s);
        }
      });
    });
  });


  // **************************************************************************************

  document.querySelectorAll('.input-control-timer').forEach(function (e) {
    e.addEventListener('click', function (a) {
      var parent = e.closest('.rele__item');
      if (a.target.checked) {
        parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас відкриваємо Select
      } else {
        parent.querySelector('.rele-control-timer').classList.remove('block__show');
      }
    });
  });

  // **************************************************************************************

  document.querySelectorAll('.input-control-manually').forEach(function (e, num) {
    e.addEventListener('click', function (a) {
      var parent = e.closest('.rele__item');
      if (a.target.checked) {
        parent.querySelector('.rele-control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
        parent.querySelector('.control-manually_on-off').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
        console.log('num  ' + num);
        s = num + 'x' + '1' + 'k';
        console.log('s----' + s);

        sendMessage(setReleEpromUprManual, s);

      } else {
        parent.querySelector('.rele-control-manually').classList.remove('block__show');
        parent.querySelector('.control-manually_on-off').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
        console.log(e.name);
        s = num + 'x' + '0' + 'k';
        console.log('s----' + s);

        sendMessage(setReleEpromUprManual, s);
      }
    });
  });

  // **************************************************************************************


  document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').forEach(function (e) {
    e.addEventListener('keyup', function () {
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

  document.querySelectorAll('.rele-name-btn').forEach(function (e, i) {
    e.addEventListener('click', function () {
      s = i + 'v' + e.closest('.rele__item').querySelector('.rele-name-input').value + 'k';

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
      var ii = Math.trunc(i / 2);
      console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      var temp = objSensorEepromUpr.obj[ii].number;

      if (e.value == '0') {
        console.log('000');
        objSensorEepromUpr.obj[ii].number &= ~(1 << 6);
      } else if (e.value == '1') {
        console.log('111');
        objSensorEepromUpr.obj[ii].number |= 1 << 6;
      }
      s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
      console.log('setReleEpromUprErorrReleVklVukl----' + s);

      sendMessage(setReleEpromUprErorrReleVklVukl, s);
    });
  });

  // //  / Включаємо реле або Виключаємо реле  при зміні температури або часу
  releTempChangeRadio.forEach(function (e, i) {
    e.addEventListener('change', function () {
      var ii = Math.trunc(i / 2);
      console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      // let temp = objSensorEepromUpr.obj[ii].number;

      if (e.value == '0') {
        console.log('000');
        objSensorEepromUpr.obj[ii].number &= ~(1 << 5);
      } else if (e.value == '1') {
        console.log('111');
        objSensorEepromUpr.obj[ii].number |= 1 << 5;
      }
      s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
      console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);

      sendMessage(setReleEpromUprChangeOnOrOff, s);

    });
  });

  // Один діапазон температур або два
  releTempChangeSingle.forEach(function (e, i) {
    e.addEventListener('change', function () {
      var ii = Math.trunc(i / 2);
      console.log('i = ' + i + '  ' + 'e  = ' + e.value);
      console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
      var temp = objSensorEepromUpr.obj[ii].number;

      if (e.value == '1') {
        console.log('000');
        objSensorEepromUpr.obj[ii].number &= ~(1 << 4);
      } else if (e.value == '0') {
        console.log('111');
        objSensorEepromUpr.obj[ii].number |= 1 << 4;
      }
      s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
      console.log('setReleEpromUprOneOrTwoRangeTemp----' + s);

      sendMessage(setReleEpromUprOneOrTwoRangeTemp, s);

    });
  });
  // *************************************************************************
  function fun2() {
    var inputTempVkl = document.querySelectorAll('.rele-temp-vkl');
    var inputTempOtkl = document.querySelectorAll('.rele-temp-otkl');
    for (var _i = 0; _i < inputTempVkl.length; _i++) {

      inputTempVkl[_i].value = objSensorVklOtklTemp.obj[_i].vkl;
      inputTempOtkl[_i].value = objSensorVklOtklTemp.obj[_i].otkl;
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
      var parent = e.closest('.address-eeprom__data');
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

    var s = '';
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

  // btnDefineDevice.onclick = () => {
  //   let rezult = prompt("Підтвердіть введіть (ok)");
  //   if (rezult === 'ok') {
  //     popapClearDevice.classList.remove('disable__global');
  //     sendMessage(setDefineDevice, 'setDefineDevice');
  //     console.log(DEFAULT_DEVICE);
  //   }

  // };
  //*********************************************************************** */



  function CheckClickDevices() {
    var flag = false;
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
    for (var _k3 = 1; _k3 < objDevice.obj.length + 1; _k3++) {
      tableDeviceAddress[_k3].closest('.address-device__data').classList.add('red');
      for (var _n = 1; _n < 9; _n++) {
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
  document.querySelectorAll('.datetime, .time').forEach(function (e) {
    // let block2 = [];
    e.addEventListener('change', function (eve) {
      //при зміні на .datetime і  .time визивати обробку
      var parent = e.closest('.rele__item');
      chekDate(eve, parent);
      chekTime(eve, parent);
    });
  });
  // ********************************************************************************************************************************************************************

  // ********************************************************************************************************************************************************************
  function chekDate(eve, parent) {
    //обробка дати 
    var numberReleClick = parent.getAttribute('data-rele');
    var datetime = parent.querySelectorAll('.datetime');
    var time = parent.querySelectorAll('.time');
    var timerBlock = parent.querySelectorAll('.timer-date__item');

    datetime.forEach(function (k, i) {
      var dateInput = new Date(k.value).getTime();
      var curentDate = new Date().getTime();
      var ddd = new Date(k.value);

      // console.log("curentDate");
      // console.log(curentDate);
      // console.log(new Date().getTime());

      // console.log("dateInput");
      // console.log(dateInput);
      // console.log(ddd);

      // if (curentDate - 360000 < dateInput  &&  ) { // Якщо введена дата є меншою за дату ту яка є зараз +6 хвилин

      arrayDatetime[numberReleClick].Datetime[i] = dateInput;
      arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(k.value);

      if (k === eve.currentTarget) {
        //номер елемента на якому клік
        // console.log('IIIIII' + i);
        var ii = i;
        if (arrayDatetime[numberReleClick].DatetimeReal[i] != 'Invalid Date') {
          if (i % 2 == 0) {
            //neparnyy element
            if (time[ii * 5].value != '') {
              // console.log(arrayDatetime[numberReleClick].DatetimeReal[i]);
              datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i], 'start');
              if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);
            }
          } else {
            ii -= 1; //parnyy elemen
            if (time[ii * 5].value != '') {
              // console.log(formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i], 'end'));
              datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i], 'end');
              if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);
            }
          }
        }
        // console.log(time[ii * 5].value);
      }

      for (var _n2 = 0; _n2 < 9; _n2 += 2) {
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

        for (var _n3 = 0, _nn = 1; _n3 < 7; _n3 += 2, _nn++) {
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

  // ********************************************************************************************************************************************************************
  function chekTime(eve, parent) {
    //обробка часу
    var numberReleClick = parent.getAttribute('data-rele');
    var datetime = parent.querySelectorAll('.datetime');
    var time = parent.querySelectorAll('.time');
    var timerBlock = parent.querySelectorAll('.timer-date__item');
    var checkedDey = parent.querySelectorAll('.day');

    time.forEach(function (k, i) {
      t2 = new Date(0);
      str = k.value;
      // console.log(k)


      if (k.value !== '') {
        t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
        arrayDatetime[numberReleClick].timeReal[i] = t2;
        t2 = t2.getTime();
        arrayDatetime[numberReleClick].time[i] = t2;
      } else {
        arrayDatetime[numberReleClick].timeReal[i] = '';
        arrayDatetime[numberReleClick].time[i] = '';
      }

      //   // ********************************************************************************************************************************************************************

      for (var _n4 = 0; _n4 < 49; _n4 += 2) {

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

      for (var u = 1; u < 49; u += 10) {

        for (var _n5 = u; _n5 < u + 8; _n5 += 2) {
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

      //********************************************************************************************** */

      if (k === eve.currentTarget) {
        //номер елемента на якому клік

        for (x = 0; x < 41; x += 10) {
          // 0 10 20 30 40
          if (i == x) {
            // console.log("MMMMMMMMMMMMMMMMMMMMMM");
            // console.log(arrayDatetime[numberReleClick].DatetimeReal[i / 5]);
            // console.log( datetime[i / 5].value);
            if (arrayDatetime[numberReleClick].DatetimeReal[i / 5] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5] != undefined) {
              datetime[i / 5].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5], 'start');
              arrayDatetime[numberReleClick].DatetimeReal[i / 5] = new Date(datetime[i / 5].value);
              // console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
              // console.log(arrayDatetime[numberReleClick].DatetimeReal[i / 5]);
              // console.log( datetime[i / 5].value);
            }

            if (arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != undefined) {
              datetime[i / 5 + 1].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1], 'end');
              arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] = new Date(datetime[i / 5 + 1].value);
            }
          }
        }
      }

      for (var _u = 0, _nn2 = 1, nnn = 0; _u < 45; _u += 10, _nn2++, nnn += 7) {
        //u number section first element 0 10 20 30 40  nn вказує на номер секції 1 2 3 4 5


        for (var _n6 = _u; _n6 < _u + 9; _n6 += 2) {
          // n  перебираємо  парні  елементи в секції 0 2 4 6 8    10 12 14 16 18  20 22 24 26 28  30 32 34 36 38  40 42 44 46 48 
          if (_n6 < _u + 7)
            if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
              //Для розблокіровки для дальших рядків
              time[_n6 + 2].disabled = false;
              time[_n6 + 1 + 2].disabled = false;
            } else {
              time[_n6 + 2].disabled = true;
              time[_n6 + 1 + 2].disabled = true;
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


        if (time[_u].value != '' && time[_u] === eve.currentTarget && !time[_u].classList.contains('time-red__color')) {
          //Для розблокіровки сhecked element даного блоку
          for (f = 0; f < 7; f++) {
            checkedDey[nnn + f].disabled = false;
            checkedDey[nnn + f].checked = true;
          }
        } else {
          if (time[_u].value == '')
            for (f = 0; f < 7; f++) {
              checkedDey[nnn + f].disabled = true;
            }
        }
      }
      //   // ********************************************************************************************************************************************************************

    });
  }
  // ********************************************************************************************************************************************************************


  function formatDataAndTime(date, typ) {

    var strDate = date.getFullYear() + '-';
    strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    strDate += '-';
    strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    if (typ == 'start') strDate += 'T00:00';
    else if ('end') strDate += 'T23:59';
    console.log('strDatestrDatestrDate  ' + strDate);
    return strDate;
  }

  function formatDataAndTimeFull(date) {

    var strDate = date.getFullYear() + '-';
    strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    strDate += '-';
    strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    strDate += 'T';
    strDate += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    strDate += ':';
    strDate += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    console.log('strDatestrDatestrDate  ' + strDate);
    return strDate;
  }

  document.querySelectorAll('.day ').forEach(function (e, i) {
    e.addEventListener('click', function (ee) {
      var parent = e.closest('.rele__item');
      var numberReleClick = parent.getAttribute('data-rele');
      var daySelect = parent.querySelectorAll('.day');
    });
  });
  // 2022-06-12T00:00 format input date set


  document.querySelectorAll('.time__btn ').forEach(function (e, i) {

    e.addEventListener('click', function (ee) {
      var parent = e.closest('.rele__item');
      // let numberReleClick = parent.getAttribute('data-rele');
      // console.log(i);
      var error_class = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

      // console.log('length error  ' + error_class.length);

      if (error_class.length > 0) {
        (function () {
          //Якщо є класи з помилками

          var popapError = document.querySelector('.popap_error');
          popapError.classList.add('popap_error-show');
          var counter = 0;
          var timerId = setInterval(function () {

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
        })();
      } else {
        //Якщо нема класів з помилками то відправляємо повідомлення
        //Відправляємо дані
        // console.log(delayWhenTurned[i].value);

        var dayElement = parent.querySelectorAll('.day');
        var _s = 'RELE' + i + '-' + delayWhenTurned[i].value + '-';

        for (nn = 0; nn < 10; nn++) {
          // console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);

          if (arrayDatetime[i].DatetimeReal[nn] != 'Invalid Date') {
            console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);
            var dateInput = new Date(arrayDatetime[i].DatetimeReal[nn]).getTime();
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


        // let inter = 0;
        // const intervalSendMessage = setInterval(() => {
        //   messageDate(inter);
        //   if (inter >= 7) clearTimeout(intervalSendMessage);
        //   inter++;
        // }, 1500);
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

} // end fuction addEventListenerClick



// };


//*********************************************************************** */
//show menu local storage
document.querySelector('.popap-menu__btn-local-storage').addEventListener('click', () => {
  POPAP_MENU.classList.toggle('popap-menu__show');
  document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
  document.querySelector('.popap-local-storage__input-text').value = localStorage.getItem('nameDevice');

});

document.querySelector('.popap-local-storage__btn-close').addEventListener('click', () => {
  document.querySelector('.popap-local-storage').classList.remove('popap-local-storage__show');
});

document.querySelector('.popap-local-storage__btn-save').addEventListener('click', () => {
  localStorage.setItem('nameDevice', document.querySelector('.popap-local-storage__input-text').value)
  document.querySelector('.info__local-storage').innerHTML = localStorage.getItem('nameDevice');
  document.querySelector('.popap-local-storage').classList.remove('popap-local-storage__show');
  userName = localStorage.getItem('nameDevice');
});

const POPAP_MENU = document.querySelector('.popap-menu');

document.querySelector('.btn__menu').addEventListener('click', () => {
  POPAP_MENU.classList.toggle('popap-menu__show');
});