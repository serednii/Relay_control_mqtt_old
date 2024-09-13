
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



const CONNECT_SSID = userName + '_SSID';
const LOCAL_IP = userName + '_IP';
const GET_ANALOG_INPUT_A0 = userName + '_ANALOG_INPUT_A0';
const RELAY_STATUS = userName + '_STAN_RELE';
const GET_EEPROM_SENSOR_DATA = userName + '_EEPROM_SENSOR_DATA';
const GET_DEVICE_SENSOR_DATA = userName + '_DEVICE_SENSOR_DATA';
const OUT_START_DATA_SENSOR = userName + '_START_DATA_SENSOR_EEPROM_AND_DEVICE';
const OUT_SAVE_DATA_SENSOR_EEPROM = userName + '_SAVE_DATA_SENSOR_EEPROM';
const OUT_SAVE_NAME_SENSOR_EEPROM = userName + '_SAVE_NAME_SENSOR_EEPROM';
//const OUT_CLEAR_EEPROM = userName + '_CLEARE_EEPROM';

const OUT_SAVE_DATA_SENSOR_TEMP = userName + '_SAVE_DATA_SENSOR_TEMP';
const OUT_SAVE_RELAY_NAME = userName + '_SAVE_RELE_NAME';

const GET_RELAY_EEPROM_UPR = userName + '_RELE_EPROM_UPR';
const SET_RELAY_EEPROM_UPR = userName + '_RELE_EPROM_UPR_SET_NUMBER_SENSOR';
const SET_RELAY_EEPROM_UPR_ERROR_RELAY_ON_OFF = userName + '_RELE_EPROM_UPR_SET_ERROR_RELE_VKL_VUKL';
const SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP = userName + '_RELE_EPROM_UPR_SET_ONE_OR_TWO_RANGE_TEMP';
const SET_RELAY_EEPROM_UPR_CHANGE_ON_OR_OFF = userName + '_RELE_EPROM_UPR_SET_CHANGE_ON_OR_OFF';
const SET_RELAY_EEPROM_CONTROL_MANUAL = userName + '_RELE_GET_EPROM_UPR_MANUAL';
const SET_RELAY_ON_OFF = userName + '_SET_RELE_VKL_OTKL';
const SET_RELAY_DATA_TIME = userName + '_SET_RELE_DATA_TIME';
const SET_DEFINE_DEVICE = userName + '_DEFINE_DEVICE';
const SET_RESET_FUNCTION = userName + '_RESET_FUNCTION';

const GET_RELAY_DATA_TIME = userName + '_OUT_WEB_RELE_DATA_TIME';
const GET_SENSOR_NAME = userName + '_SENSOR_NAME';
const GET_RELAY_NAME = userName + '_RELE_NAME';
const GET_RELAY_EEPROM_CONTROL_MANUAL = userName + '_RELE_OUT_EPROM_UPR_MANUAL';
const GET_SENSOR_TEMP_ON_OFF = userName + '_SENSOR_VKL_OTKL';
