
"use strict"

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

let userName;

if (localStorage.getItem('Device') != null) {
    console.log(localStorage.getItem('nameDevice'));
    const arr = JSON.parse(localStorage.getItem('Device'));
    document.querySelector('.info__local-storage').innerText = arr.NameDevice + '  ---   ' + arr.Name;
    userName = arr.NameDevice;
} else {
    console.log('none');
    document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
}


const monitor = document.querySelectorAll('.data-topic');
let client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "userName-" + parseInt(Math.random() * 100, 10));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


const printAnalogInput = document.querySelector('.popap-info__analog-input');
const parentListEeprom = document.querySelectorAll('.address-eeprom__data');
const tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
const tableEepromAddress = document.querySelectorAll('.address-eeprom__address');
const tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');

let inputDey;
let labelDey;
let releTempChangeRadio;
let releTempChangeLabel;
let releSetingSensorSelectLabel;
let releSetingSensorSelect;
let releTempVklStartLabel;
let releTempVkl;
let releSetingSwitcIhnput;
let releSetingSwitchLabel;
let tableEepromTemp;
let tableDeviceNumber;
let tableDeviceAddress;
let tableDeviceTemp;
let releItem;
let releNameInput;
let releTempChangeSingle;
let delayWhenTurned;
let releControlTimer;
let popapTemp;
let popapInfoTempItem;
let parentListDevice;
let btnSave;
let btnDefineDevice;
let timeBtn;
let timeBtnClear;
let releItemTitlePin;
let btnChange;
let inputControlError;
let releNameBtn;


//const inputControlErrorLabel = document.querySelectorAll('.input-control-error__label');


const startSelector = () => {
    //input and label class
    return new Promise(resolve => {
        inputDey = document.querySelectorAll('.day');
        labelDey = document.querySelectorAll('.label-day');
        releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
        releTempChangeLabel = document.querySelectorAll('.rele-temp-change__label');
        releSetingSensorSelectLabel = document.querySelectorAll('.rele__seting-sensor__select-label');
        releSetingSensorSelect = document.querySelectorAll('.rele__seting-sensor__select');
        releTempVklStartLabel = document.querySelectorAll(' .rele-temp-vkl-start-label');
        releTempVkl = document.querySelectorAll('.rele-temp-vkl');
        releSetingSwitcIhnput = document.querySelectorAll('.rele__seting-switch__input');
        releSetingSwitchLabel = document.querySelectorAll('.rele__seting-switch__label');
        tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
        tableDeviceNumber = document.querySelectorAll('.address-device__number');
        tableDeviceAddress = document.querySelectorAll('.address-device__address');
        tableDeviceTemp = document.querySelectorAll('.address-device__temp');
        releItem = document.querySelectorAll('.rele__item');
        releNameInput = document.querySelectorAll('.rele__name-input');
        releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
        delayWhenTurned = document.querySelectorAll('.delay-when-turned');
        releControlTimer = document.querySelectorAll('.delay-when-turned');
        popapTemp = document.querySelectorAll('.popap-info__temp-item');
        popapInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');
        parentListDevice = document.querySelectorAll('.address-device__data');
        btnSave = document.querySelector('.address-eeprom__save');
        btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
        timeBtn = document.querySelectorAll('.time__btn ');
        timeBtnClear = document.querySelectorAll('.time__btn-clear');
        releItemTitlePin = document.querySelectorAll('.rele__item-title-pin');
        btnChange = document.querySelectorAll('.address-eeprom__btn.change');
        inputControlError = document.querySelectorAll('.input-control-error');
        releNameBtn = document.querySelectorAll('.rele__name-btn');
        console.log('start function startSelector()');
        resolve();
    });

}


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
const outCleareEPROM = userName + '_cleareEPROM';

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