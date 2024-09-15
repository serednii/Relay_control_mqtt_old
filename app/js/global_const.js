
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
let selectEepromDataSensor = null;
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
const parentListEeprom = document.querySelectorAll(CLASS_ADDRESS_EEPROM_DATA);
const tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
const tableEepromAddress = document.querySelectorAll('CLASS_ADDRESS_EEPROM_ADDRESS');
const tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');

let inputDey;
let labelDey;
let relayTempChangeRadio;
let tableEepromTemp;
let tableDeviceNumber;
let tableDeviceAddress;
let tableDeviceTemp;
let relayItem;
let relayNameInput;
let delayWhenTurned;
let relayControlTimer;
let popupTemp;
let popupInfoTempItem;
let parentListDevice;
let btnDefineDevice;
let timeBtn;
let timeBtnClear;
let relayItemTitlePin;

const startSelector = () => {
    //input and label class
    return new Promise(resolve => {
        inputDey = document.querySelectorAll('.day');
        labelDey = document.querySelectorAll('.label-day');
        relayTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
        tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
        tableDeviceNumber = document.querySelectorAll('.address-device__number');
        tableDeviceAddress = document.querySelectorAll('.address-device__address');
        tableDeviceTemp = document.querySelectorAll('.address-device__temp');
        relayItem = document.querySelectorAll(CLASS_RELAY_ITEM);
        relayNameInput = document.querySelectorAll('.rele__name-input');
        delayWhenTurned = document.querySelectorAll('.delay-when-turned');
        relayControlTimer = document.querySelectorAll('.delay-when-turned');
        popupTemp = document.querySelectorAll('.popap-info__temp-item');
        popupInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');
        parentListDevice = document.querySelectorAll('.address-device__data');
        btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
        timeBtn = document.querySelectorAll('.time__btn ');
        timeBtnClear = document.querySelectorAll('.time__btn-clear');
        relayItemTitlePin = document.querySelectorAll('.rele__item-title-pin');
        console.log('start function startSelector()');
        resolve();
    });

}


//**************************************************************************************** */

const CONNECT_SSID = userName + '_ssid';
const LOCAL_IP = userName + '_ip';
const GET_ANALOG_INPUT_A0 = userName + 'analogInputA0';
const RELAY_STATUS = userName + '_stanRele';
const GET_EEPROM_SENSOR_DATA = userName + '_eepromSensorData';
const GET_DEVICE_SENSOR_DATA = userName + '_deviceSensorData';
const OUT_START_DATA_SENSOR = userName + '_start-data-sensor-eepromAndDevice';
const OUT_SAVE_DATA_SENSOR_EEPROM = userName + '_save-data-sensor-eeprom';
const OUT_SAVE_NAME_SENSOR_EEPROM = userName + '_save-name-sensor-eeprom';
const OUT_SAVE_DATA_SENSOR_TEMP = userName + '_save-data-sensor-temp';
const OUT_SAVE_RELAY_NAME = userName + '_save-rele-name';
const GET_RELAY_EEPROM_UPR = userName + '_rele_eprom_upr';
const SET_RELAY_EEPROM_UPR = userName + '_rele_eprom_upr-set_number_sensor';
const SET_RELAY_EEPROM_UPR_ERROR_RELAY_ON_OFF = userName + '_rele_eprom_upr-set_erorr_rele_vkl_vukl';
const SET_RELAY_EEPROM_UPR_ONE_OR_TWO_RANGE_TEMP = userName + '_rele_eprom_upr-set_one_or_two_range_temp';
const SET_RELAY_EEPROM_UPR_CHANGE_ON_OR_OFF = userName + '_rele_eprom_upr-set_change_on_or_off';
const SET_RELAY_EEPROM_CONTROL_MANUAL = userName + '_rele-get-eprom_upr-manual';
const SET_RELAY_ON_OFF = userName + '_set-rele-vkl-otkl';
const SET_RELAY_DATA_TIME = userName + '_set-rele-data-time';
const SET_DEFINE_DEVICE = userName + '_define_device';
const SET_RESET_FUNCTION = userName + '_resetFunction';
const GET_RELAY_DATA_TIME = userName + '_out-web-rele-data-time';
const GET_SENSOR_NAME = userName + '_sensor-name';
const GET_RELAY_NAME = userName + '_rele-name';
const GET_RELAY_EEPROM_CONTROL_MANUAL = userName + '_rele-out-eprom_upr-manual';
const GET_SENSOR_TEMP_ON_OFF = userName + '_sensor-vkl-otkl';

