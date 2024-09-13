
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
    const nameDevices = JSON.parse(localStorage.getItem('Device'));
    document.querySelector('.info__local-storage').innerText = nameDevices.NameDevice + '  ---   ' + nameDevices.Name;
    userName = nameDevices.NameDevice;
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
let relayTempChangeRadio;
//let relayTempChangeLabel;
//let relaySettingSensorSelectLabel;
//let relaySettingSensorSelect;
//let relayTempVklStartLabel;
//let relaySettingSwitchInput;
//let relaySettingSwitchLabel;
let tableEepromTemp;
let tableDeviceNumber;
let tableDeviceAddress;
let tableDeviceTemp;
let relayItem;
let relayNameInput;
//let relayTempChangeSingle;
let delayWhenTurned;
let relayControlTimer;
let popupTemp;
let popupInfoTempItem;
let parentListDevice;
let btnSave;
let btnDefineDevice;
let timeBtn;
let timeBtnClear;
let relayItemTitlePin;
//let btnChange;
//let inputControlError;
//let relayNameBtn;


//const inputControlErrorLabel = document.querySelectorAll('.input-control-error__label');


const startSelector = () => {
    //input and label class
    return new Promise(resolve => {
        inputDey = document.querySelectorAll('.day');
        labelDey = document.querySelectorAll('.label-day');
        relayTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
        //relayTempChangeLabel = document.querySelectorAll('.rele-temp-change__label');
        //relaySettingSensorSelectLabel = document.querySelectorAll('.rele__seting-sensor__select-label');
        //relaySettingSensorSelect = document.querySelectorAll('.rele__seting-sensor__select');
        //relayTempVklStartLabel = document.querySelectorAll(' .rele-temp-vkl-start-label');
        //relaySettingSwitchInput = document.querySelectorAll('.rele__seting-switch__input');
        //relaySettingSwitchLabel = document.querySelectorAll('.rele__seting-switch__label');
        tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
        tableDeviceNumber = document.querySelectorAll('.address-device__number');
        tableDeviceAddress = document.querySelectorAll('.address-device__address');
        tableDeviceTemp = document.querySelectorAll('.address-device__temp');
        relayItem = document.querySelectorAll('.rele__item');
        relayNameInput = document.querySelectorAll('.rele__name-input');
        //relayTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
        delayWhenTurned = document.querySelectorAll('.delay-when-turned');
        relayControlTimer = document.querySelectorAll('.delay-when-turned');
        popupTemp = document.querySelectorAll('.popap-info__temp-item');
        popupInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');
        parentListDevice = document.querySelectorAll('.address-device__data');
        btnSave = document.querySelector('.address-eeprom__save');
        btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
        timeBtn = document.querySelectorAll('.time__btn ');
        timeBtnClear = document.querySelectorAll('.time__btn-clear');
        relayItemTitlePin = document.querySelectorAll('.rele__item-title-pin');
        //btnChange = document.querySelectorAll('.address-eeprom__btn.change');
        //inputControlError = document.querySelectorAll('.input-control-error');
        //relayNameBtn = document.querySelectorAll('.rele__name-btn');
        console.log('start function startSelector()');
        resolve();
    });

}


//**************************************************************************************** */

const CONNECT_SSID = userName + '_ssid';
const LOCAL_IP = userName + '_ip';
const getAnalogInputA0 = userName + 'analogInputA0';
const relayStatus = userName + '_stanRele';
const getEepromSensorData = userName + '_eepromSensorData';
const getDeviceSensorData = userName + '_deviceSensorData';
const outStartDataSensor = userName + '_start-data-sensor-eepromAndDevice';
const outSaveDataSensorEeprom = userName + '_save-data-sensor-eeprom';
const outSaveNameSensorEeprom = userName + '_save-name-sensor-eeprom';
//const outClearEEPROM = userName + '_cleareEPROM';

const outSaveDataSensorTemp = userName + '_save-data-sensor-temp';
const outSaveRelayName = userName + '_save-rele-name';

const getRelayEepromUpr = userName + '_rele_eprom_upr';
const setRelayEepromUpr = userName + '_rele_eprom_upr-set_number_sensor';
const setRelayEepromUprErrorRelayOnOff = userName + '_rele_eprom_upr-set_erorr_rele_vkl_vukl';
const setRelayEepromUprOneOrTwoRangeTemp = userName + '_rele_eprom_upr-set_one_or_two_range_temp';
const setRelayEepromUprChangeOnOrOff = userName + '_rele_eprom_upr-set_change_on_or_off';
const setRelayEepromControlManual = userName + '_rele-get-eprom_upr-manual';
const setRelayOnOff = userName + '_set-rele-vkl-otkl';
const setRelayDataTime = userName + '_set-rele-data-time';
const setDefineDevice = userName + '_define_device';
const setResetFunction = userName + '_resetFunction';


const getRelayDataTime = userName + '_out-web-rele-data-time';
const getSensorName = userName + '_sensor-name';
const getRelayName = userName + '_rele-name';
const getRelayEepromControlManual = userName + '_rele-out-eprom_upr-manual';
const getSensorTempOnOff = userName + '_sensor-vkl-otkl';