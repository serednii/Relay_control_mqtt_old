
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


initDateTimeArray()


async function go() {
  await innerHtmlText();
  await addIdAndFor();
  await startLocalStorage();
  await startSelector();
  await startAllFunctions();
}
go();
































