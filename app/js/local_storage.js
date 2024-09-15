

const btnPoppaAddNewDeviceOpen = document.querySelector('.popup-menu__btn-local-storage');
const POPUP_LOCAL_STORAGE = document.querySelector('.popup-local-storage')
btnPoppaAddNewDeviceOpen.addEventListener('click', () => {
  POPUP_LOCAL_STORAGE.classList.remove('popup-local-storage__show');
});

document.querySelector('.popup-local-storage__top-list').addEventListener('click', selectItem)
document.querySelector('.popup-local-storage__btn-add').addEventListener('click', addDevice)
document.querySelector('.popup-local-storage__btn-remove').addEventListener('click', removeDevice)
document.querySelector('.popup-local-storage__btn-close').addEventListener('click', closeForm)


if (localStorage.getItem('DeviceList') != null) {
  const devicesList = JSON.parse(localStorage.getItem('DeviceList'));
  if (devicesList) {
    POPUP_LOCAL_STORAGE.classList.remove('popup-local-storage__show');
  }
  removeList();
  printListDevice(devicesList);
}




//Select language
const startLocalStorage = () => {
  return new Promise(resolve => {
    const language = localStorage.getItem('Language');
    if (language) {
      if (language == 'ua' || language == 'en' || language == 'cz') {
        languageChange(language); //langugage  write in localStrarage 
      }
    } else {
      languageChange('ua'); //default language
    }
    console.log('start function startLocalStorage()');
    resolve();
  })

}

function selectItem(event) {
  event.preventDefault();
  const dev = event.target.closest('.popup-local-storage__top-item').querySelector('.popup-local-storage__top-device').innerText;
  const nam = event.target.closest('.popup-local-storage__top-item').querySelector('.popup-local-storage__top-name').innerText;
  if (dev != 'Name Device' || nam != 'Name') {
    event.target.closest('.popup-local-storage__top-item').classList.toggle('click');
  }

}






function removeDevice(event) { //удаляємо видалені пристрої
  event.preventDefault();
  let deviceList = [];
  const itemDeviceElement = document.querySelectorAll('.popup-local-storage__top-item');
  if (localStorage.getItem('DeviceList') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
    deviceList = JSON.parse(localStorage.getItem('DeviceList'));

    const newDeviceList = [];
    let isClick = false;
    itemDeviceElement.forEach((element, i) => {
      if (i > 0) {
        if (element.classList.contains('click')) {
          isClick = true;
          const deleteDevice = element.querySelector('.popup-local-storage__top-device').innerText;
          deviceList.forEach((device) => {
            if (device != null && device.NameDevice != deleteDevice) {
              newDeviceList.push(device);
            }
          });
        }
      }
    });
    if (isClick == true) {
      localStorage.setItem('DeviceList', JSON.stringify(newDeviceList));
      removeList();
      printListDevice(newDeviceList);
    }

  } else return false;
}

function closeForm(event) {
  event.preventDefault();
  POPUP_LOCAL_STORAGE.classList.remove('popup-local-storage__show');
}

function addDevice(event) {
  event.preventDefault();
  let deviceList = [];
  const obj = {};

  const form = document.querySelector('.popup-local-storage__form');
  const nameDevice = form.device.value;
  const name = form.name.value;
  let validateMessage;
  if (localStorage.getItem('DeviceList') != null) {
    deviceList = JSON.parse(localStorage.getItem('DeviceList'));
  }

  if ((nameDevice == '' || name == '') && (nameDevice != 'Name Device' || name == 'Name'))
    validateMessage = 'Заповніть всі поля';
  else if (deviceList != '') {
    deviceList.forEach(e => {
      if (e.NameDevice === nameDevice) {
        validateMessage = 'Такий пристрій вже є';
      }
    })
  }

  if (validateMessage != undefined) {
    alert(validateMessage);
    return;
  }

  obj.NameDevice = nameDevice;
  obj.Name = name;
  deviceList.push(obj);
  localStorage.setItem('DeviceList', JSON.stringify(deviceList));
  removeList();
  printListDevice(deviceList);
}

function removeList() {
  const items = document.querySelectorAll('.popup-local-storage__top-item, .popup-local-storage-menu__item')
  items.forEach((item, i) => {
    if (i > 0) item.remove();
  })
}

function printListDevice(deviceList = []) {
  //******************************************** */  
  deviceList.forEach((device) => {
    if (device != null) {
      const ul = document.querySelector('.popup-local-storage__top-list');
      const ulMenu = document.querySelector('.popup-local-storage-menu__list');
      let li = document.createElement('li');
      let p = document.createElement('p');
      let p1 = document.createElement('p');

      li.className = 'popup-local-storage__top-item';

      p.className = 'popup-local-storage__top-device';
      p.innerText = device.NameDevice;

      p1.className = 'popup-local-storage__top-name';
      p1.innerText = device.Name;

      li.append(p);
      li.append(p1);

      ul.append(li);

      let liMenu = document.createElement('li');
      let pMenu = document.createElement('p');
      let p1Menu = document.createElement('p');

      liMenu.className = 'popup-local-storage-menu__item';

      pMenu.className = 'popup-local-storage-menu__device';
      pMenu.innerText = device.NameDevice;

      p1Menu.className = 'popup-local-storage-menu__name';
      p1Menu.innerText = device.Name;

      liMenu.append(pMenu);

      liMenu.append(p1Menu);
      ulMenu.append(liMenu);
    }
  });

  //******************************************** */
}