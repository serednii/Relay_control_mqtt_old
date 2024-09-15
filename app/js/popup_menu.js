const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuLine = document.querySelector('.burger-menu span');
const popapLocalStorage = document.querySelector('.popup-local-storage');
const btnRestartDevice = document.querySelector('.popup-menu__btn-restart-device');


const POPAP_MENU = document.querySelector('.popup-menu');
const popapLocalStorageMenu = document.querySelector('.popup-local-storage-menu');
const popapLocalStoragMmenuList = document.querySelector('.popup-local-storage-menu__device');
const popapLocalStoragMmenuName = document.querySelector('.popup-local-storage-menu__name');
// console.log(popapLocalStoragMmenuList)


document.querySelector('.popup-local-storage-menu__list').addEventListener('click', selectItemMenu)


// function selectItemMenu(event) { //при виборі нового пристрою добавляємо або міняємо в localStorage і в шапці на горі
//     // event.preventDefault();
//     console.log(event)
//     const dev = event.closest('.popup-local-storage-menu__item').querySelector('.popup-local-storage-menu__device').innerText;
//     const nam = event.closest('.popup-local-storage-menu__item').querySelector('.popup-local-storage-menu__name').innerText;
//     if (dev != 'Name Device' || nam != 'Name') {
//         console.log(dev);
//         console.log(nam);
//         document.querySelector('.info__local-storage').innerText = dev + '     ' + nam;
//         userName = dev;
//         let obj = {
//             NameDevice: dev,
//             Name: nam,
//         }
//         localStorage.setItem('Device', JSON.stringify(obj));
//     }
// }

function selectItemMenu(event) {
    event.preventDefault();
    const dev = event.target.closest('.popup-local-storage-menu__item').querySelector('.popup-local-storage-menu__device').innerText;
    const nam = event.target.closest('.popup-local-storage-menu__item').querySelector('.popup-local-storage-menu__name').innerText;
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





window.onclick = (e) => {
    // console.log(e.target)

    // if (e.target === popapLocalStoragMmenuList) { //Відкриваємо меню для добавлення або зміни нових пристроїв
    //     console.log(e.target)
    //     selectItemMenu(e.target);
    // }
    if (e.target === btnPoppaAddNewDeviceOpen) { //Відкриваємо меню для добавлення або зміни нових пристроїв
        POPAP_MENU.classList.toggle('popup-menu__show');
        popapLocalStorage.classList.add('popup-local-storage__show');
    }





    if (e.target != POPAP_MENU) //Відкриває закриває бургер меню
        if (e.target != burgerMenu && e.target != burgerMenuLine && e.target != POPAP_MENU) {
            POPAP_MENU.classList.remove('popup-menu__show');
            burgerMenu.classList.remove('showw');
        } else {
            POPAP_MENU.classList.toggle('popup-menu__show');
            burgerMenu.classList.toggle('showw');
        }
};

btnRestartDevice.addEventListener('click', restartDevice);

function restartDevice() {
    let rezult = prompt("Підтвердіть введіть (ok)");
    if (rezult === 'ok') sendMessage(SET_RESET_FUNCTION, 'resetFunction');
}