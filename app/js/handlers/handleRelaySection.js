

function handleRelaySection() {

    if (relayItem.length > 0) {
        relayItem.forEach((parent, num) => {
            parent.addEventListener('change', (event) => {
                event.stopPropagation(); // Зупинка спливання подій
                const DATA_TIME = parent.querySelectorAll(CLASS_DATE_TIME);
                const TIME = parent.querySelectorAll(CLASS_TIME);

                if (event.target.classList.contains('day')) {
                    checkCheckedDay(event);
                }
                if (event.target.classList.contains('datetime')) {
                    checkDate(parent, DATA_TIME, TIME);
                }
                if (event.target.classList.contains('time')) {
                    checkTime(parent, DATA_TIME, TIME);
                }

                showTimerIcons(parent, DATA_TIME, TIME); // Додає іконки таймера
            });

            parent.addEventListener('click', (event) => {
                event.stopPropagation(); // Зупинка спливання подій

                if (event.target.classList.contains(CLASS_RELAY_SETTING_SWITCH_INPUT)) {
                    showSectionTimeAndSeting(event, parent, CLASS_RELAY_SETTING_SVG, CLASS_RELAY_SECTION_SETTING);
                }
                if (event.target.classList.contains(CLASS_RELAY_TIMER_SETTING_SHOW_INPUT)) {
                    showSectionTimeAndSeting(event, parent, CLASS__RELAY_TIMERsETTING_SVG, CLASS_RELAY_CONTROL_TIMER);
                }
                if (event.target.classList.contains(CLASS_RELAY_CONTROL_MANUAL_SHOW)) {
                    showSectionTimeAndSeting(event, parent, CLASS_INPUT_CONTROL_MANUAL_SVG, CLASS_RELAY_CONTROL_MANUAL, num);
                }
            });
        });
    } else {
        console.log('NOT CLASSES rele__item');
    }

}

// if (relayItem.length > 0) {
//     // console.log('YES CLASSES  rele__item ' + relayItem.length);

//     relayItem.forEach((parent, num) => {

//         parent.addEventListener('change', function (event) {
//             event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
//             const datetime = parent.querySelectorAll(CLASS_DATE_TIME);
//             const time = parent.querySelectorAll(CLASS_TIME);
//             if (event.target.classList.contains('day')) checkCheckedDay(event);
//             if (event.target.classList.contains('datetime')) checkDate(parent, datetime, time);
//             if (event.target.classList.contains('time')) checkTime(parent, datetime, time);
//             showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
//         });

//         parent.addEventListener('click', function (event) {
//             event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
//             console.log(event.target);
//             if (event.target.classList.contains(CLASS_RELAY_SETTING_SWITCH_INPUT)) showSectionTimeAndSeting(event, parent, CLASS_RELAY_SETTING_SVG, CLASS_RELAY_SECTION_SETTING);
//             if (event.target.classList.contains(CLASS_RELAY_TIMER_SETTING_SHOW_INPUT)) showSectionTimeAndSeting(event, parent, CLASS__RELAY_TIMERsETTING_SVG, CLASS_RELAY_CONTROL_TIMER);
//             if (event.target.classList.contains(CLASS_RELAY_CONTROL_MANUAL_SHOW)) showSectionTimeAndSeting(event, parent, CLASS_INPUT_CONTROL_MANUAL_SVG, CLASS_RELAY_CONTROL_MANUAL, num);
//         });

//     });
// } else {
//     console.log('NOT CLASSES  rele__item ');
// }