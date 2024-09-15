function showSectionTime(event, parent) {
    if (event.target.classList.contains('on')) {
        parent.querySelector(CLASS__RELAY_TIMERsETTING_SVG).classList.add('rele__timer-seting-svg-on');
        parent.querySelector(CLASS_RELAY_CONTROL_TIMER).classList.add('block__show'); //Добавляємо клас
        event.target.classList.remove('on');
    } else {
        parent.querySelector(CLASS__RELAY_TIMERsETTING_SVG).classList.remove('rele__timer-seting-svg-on');
        parent.querySelector(CLASS_RELAY_CONTROL_TIMER).classList.remove('block__show');
        event.target.classList.add('on');
    }
}

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

function showSectionTimeAndSeting(event, parent, classLink, classShowSection, num) { //Покузує або скриває блок з настройками
    event.preventDefault();
    if (event.target.classList.contains('on')) {
        parent.querySelector(classLink).classList.remove(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.remove('show-block');
        if (event.target.classList.contains(CLASS_RELAY_CONTROL_MANUAL_SHOW)) {
            parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
            const s = num + 'x0k';
            console.log('s----' + s);
            sendMessage(SET_RELAY_EEPROM_CONTROL_MANUAL, s);
        }
        event.target.classList.remove('on');
    } else {
        parent.querySelector(classLink).classList.add(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.add('show-block');
        if (event.target.classList.contains(CLASS_RELAY_CONTROL_MANUAL_SHOW)) {
            parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
            const s = num + 'x1k';
            console.log('s----' + s);
            sendMessage(SET_RELAY_EEPROM_CONTROL_MANUAL, s);
        }
        event.target.classList.add('on');
    }
}

//не використовується unused
function switchSeting(event, parent) { //Покузує або скриває блок з настройками
    console.log('testtest')
    if (event.target.classList.contains('on')) {
        parent.querySelector(CLASS_RELAY_SETTING_SVG).classList.add('rele__seting-svg-on');
        parent.querySelector(CLASS_RELAY_SECTION_SETTING).classList.add('show-block');
        event.target.classList.remove('on');
    } else {
        parent.querySelector(CLASS_RELAY_SETTING_SVG).classList.remove('rele__seting-svg-on');
        parent.querySelector(CLASS_RELAY_SECTION_SETTING).classList.remove('show-block');
        event.target.classList.add('on');
    }
}