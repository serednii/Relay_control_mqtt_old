

const LANGUAGE_DEY = {
    ua: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота', 'Неділя'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    cz: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle']
}


const LANGUAGE_ERROR_TITLE = {
    ua: 'При несправності термодатчика  або таймера   реле залишаємо',
    en: 'If the temperature sensor or timer malfunctions, leave the relay',
    cz: 'Pokud dojde k poruše teplotního čidla nebo časovače, opusťte relé'
}

const LANGUAGE_ON_OFF = {
    ua:['вкл',  'відкл'],
    en: ['on',  'off'],
    cz: ['zapnut', 'vypnut']
}

const LANGUAGE_CHANGE_ON_OFF_RELE = {
    ua: ' При спрацюванні термодатчика  або таймера включаємо або виключаємо реле',
    en: ' When the temperature sensor or timer is activated, turn the relay on or off',
    cz: 'Když je aktivován teplotní senzor nebo časovač, zapněte nebo vypněte relé'
}

const LANGUAGE_CONTROL_TERMO = {
    ua: ' Управління термодатчиком',
    en: 'Temperature sensor control',
    cz: 'Ovládání teplotním čidlem'
}

const LANGUAGE_CONTROL_TIMER = {
    ua: [' Управління таймером'],
    en: ['Timer control'],
    cz: ['Ovládání časovače']
}

const LANGUAGE_DATE_TIME= {
    ua: 'По даті і годинах',
    en: 'By date and time',
    cz: 'Podle data a času'
}

const LANGUAGE_TIME = {
    ua: ' По годинах',
    en: 'By date and time',
    cz: 'Podle  času'
}

const LANGUAGE_MANUAL_CONTROL = {
    ua: ['Ручне управління'],
    en: ['Manual control'],
    cz: ['Ruční ovládání']
}

const LANGUAGE_SELECT_SENSOR = {
    ua: ['Виберіть термодатчик'],
    en: ['Select the temperature sensor'],
    cz: ['Vyberte teplotní senzor']
}

const LANGUAGE_TEMP_RANGE = {
    ua: ['Один  діапазон', 'Два   діапазони'],
    en: ['One range', 'Two ranges'],
    cz: ['Jeden rozsah', 'Dva rozsahy'],
}

const LANGUAGE_TEM_ON_OFF = {
    ua: ['Температура включення', 'Температура відключення'],
    en: ['Switch-on temperature', 'Shutdown temperature'],
    cz: ['Teplota zapnutí', 'Vypínací teplota'],
}


const LANG_DAY = document.querySelectorAll('.label-day');
const LANG_ERROR = document.querySelectorAll('.input-control-error__label');
const LANG_CHANGE = document.querySelectorAll('.rele-temp-change__label')
const LANG_CONTROL_TIMER = document.querySelectorAll('.input-control-timer__label');
const LANG_CONTROL_MANUALY = document.querySelectorAll('.input-control-manually__label');
const LANG_SELECT_SENSOR = document.querySelectorAll('.select-sensor');
const LANG_TEMP_RANGE = document.querySelectorAll('.rele-temp-change-single__label');
const LANG_TEMP_ON_OFF = document.querySelectorAll('.rele-temp-vkl-label');
const LANG_TITLE_DATATIME = document.querySelectorAll('.timer-date__datetime-control');
const LANG_TITLE_TIME = document.querySelectorAll('.timer-date__time-control');

const  ERROR_TITLE  = document.querySelectorAll('.input-control-error__title');
const  CHANGE_TITLE  = document.querySelectorAll('.rele-temp-change__title');
const  CONTROL_TERMO_SENSOR  = document.querySelectorAll('.input-control-address');

// languageChange('ua');


function languageChange(language){
langChangeLabel(LANG_DAY,  LANGUAGE_DEY, 'data-num' );
langChangeLabel(LANG_ERROR,  LANGUAGE_ON_OFF, 'data-num' );
langChangeLabel(LANG_CHANGE,  LANGUAGE_ON_OFF, 'data-num' );
langChangeLabel(LANG_CONTROL_TIMER,  LANGUAGE_CONTROL_TIMER, 'data-num' );
langChangeLabel(LANG_CONTROL_MANUALY,  LANGUAGE_MANUAL_CONTROL, 'data-num' );
langChangeLabel(LANG_SELECT_SENSOR,  LANGUAGE_SELECT_SENSOR, 'data-num' );
langChangeLabel(LANG_TEMP_RANGE,  LANGUAGE_TEMP_RANGE, 'data-num' );


LANG_TEMP_ON_OFF.forEach((elements)=>{
  
const clearInput = elements.innerHTML.substring(elements.innerHTML.indexOf('<'));
    elements.innerHTML =LANGUAGE_TEM_ON_OFF[language][parseInt(elements.getAttribute( 'data-num'))] +  clearInput;
});

function langChangeLabel(e, obj, data){
    e.forEach((elements)=>{
       
        const clearInput = elements.innerHTML.substring(0, elements.innerHTML.indexOf('>')+1);
        elements.innerHTML =clearInput + obj[language][parseInt(elements.getAttribute(data))];
    });
}


langChange(ERROR_TITLE, LANGUAGE_ERROR_TITLE );
langChange(CHANGE_TITLE, LANGUAGE_CHANGE_ON_OFF_RELE );//При спрацюванні термодатчика  або таймера включаємо або виключаємо реле
langChange(CONTROL_TERMO_SENSOR, LANGUAGE_CONTROL_TERMO );
langChange(LANG_TITLE_DATATIME, LANGUAGE_DATE_TIME );
langChange(LANG_TITLE_TIME, LANGUAGE_TIME );



function langChange(e, text){
    e.forEach((elements)=>{
        elements.textContent = text[language];
    });
}
}



          document.querySelector('.popap-menu__btn-ua ').addEventListener('click', ()=>{
            languageChange('ua');
            addEventListenerClick();
           } );
          document.querySelector('.popap-menu__btn-en').addEventListener('click', ()=>{
            languageChange('en');
            addEventListenerClick();
        });
          document.querySelector('.popap-menu__btn-cz').addEventListener('click', ()=>{
            languageChange('cz');
            addEventListenerClick();
        });

       

