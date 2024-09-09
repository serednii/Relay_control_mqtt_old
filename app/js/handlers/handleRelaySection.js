

function handleRelaySection() {

    if (releItem.length > 0) {
        releItem.forEach((parent, num) => {
            parent.addEventListener('change', (event) => {
                event.stopPropagation(); // Зупинка спливання подій
                const datetime = parent.querySelectorAll('.datetime');
                const time = parent.querySelectorAll('.time');

                if (event.target.classList.contains('day')) {
                    chekChecedDay(event);
                }
                if (event.target.classList.contains('datetime')) {
                    chekDate(parent, datetime, time);
                }
                if (event.target.classList.contains('time')) {
                    chekTime(parent, datetime, time);
                }

                showTimerIcons(parent, datetime, time); // Додає іконки таймера
            });

            parent.addEventListener('click', (event) => {
                event.stopPropagation(); // Зупинка спливання подій

                if (event.target.classList.contains('rele__seting-switch__input')) {
                    showSectionTimeAndSeting(event, parent, '.rele__seting-svg', '.rele__section-seting');
                }
                if (event.target.classList.contains('rele__timer-seting-show__input')) {
                    showSectionTimeAndSeting(event, parent, '.rele__timer-seting-svg', '.rele-control-timer');
                }
                if (event.target.classList.contains('rele__control-manually-show')) {
                    showSectionTimeAndSeting(event, parent, '.input-control-manually-svg', '.rele__control-manually', num);
                }
            });
        });
    } else {
        console.log('NOT CLASSES rele__item');
    }

}

// if (releItem.length > 0) {
//     // console.log('YES CLASSES  rele__item ' + releItem.length);

//     releItem.forEach((parent, num) => {

//         parent.addEventListener('change', function (event) {
//             event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
//             const datetime = parent.querySelectorAll('.datetime');
//             const time = parent.querySelectorAll('.time');
//             if (event.target.classList.contains('day')) chekChecedDay(event);
//             if (event.target.classList.contains('datetime')) chekDate(parent, datetime, time);
//             if (event.target.classList.contains('time')) chekTime(parent, datetime, time);
//             showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
//         });

//         parent.addEventListener('click', function (event) {
//             event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
//             console.log(event.target);
//             if (event.target.classList.contains('rele__seting-switch__input')) showSectionTimeAndSeting(event, parent, '.rele__seting-svg', '.rele__section-seting');
//             if (event.target.classList.contains('rele__timer-seting-show__input')) showSectionTimeAndSeting(event, parent, '.rele__timer-seting-svg', '.rele-control-timer');
//             if (event.target.classList.contains('rele__control-manually-show')) showSectionTimeAndSeting(event, parent, '.input-control-manually-svg', '.rele__control-manually', num);
//         });

//     });
// } else {
//     console.log('NOT CLASSES  rele__item ');
// }