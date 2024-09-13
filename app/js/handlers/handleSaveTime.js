function handleSaveTime() {

    if (timeBtn.length > 0) {
        console.log('YES CLASSES time__btn ' + timeBtn.length);

        timeBtn.forEach((e, i) => {
            e.addEventListener('click', () => {
                const parent = e.closest('.rele__item');
                const errorClasses = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround, .time-red__backround');

                if (errorClasses.length > 0) {
                    // Якщо є помилки
                    const popapError = document.querySelector('.popap_error');
                    popapError.classList.add('popap_error-show');

                    let counter = 0;
                    const timerId = setInterval(() => {
                        errorClasses.forEach(el => {
                            el.classList.toggle('blink__eror-red', counter % 2 === 0);
                        });

                        if (++counter > 9) {
                            clearInterval(timerId);
                            popapError.classList.remove('popap_error-show');
                        }
                    }, 300);
                } else {
                    // Якщо немає помилок
                    const dayElements = parent.querySelectorAll('.day');
                    let dataString = `RELE${i}-${delayWhenTurned[i].value}-`;

                    dateTimeArray[i].dateTimeRealList.forEach(dateTime => {
                        if (dateTime instanceof Date && !isNaN(dateTime)) {
                            const timestamp = Math.floor(dateTime.getTime() / 1000);
                            dataString += `${timestamp}-${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}-${dateTime.getHours()}-${dateTime.getMinutes()}-${dateTime.getDay()}-`;
                        } else {
                            dataString += '4294967295-65535-99-99-99-99-';
                        }
                    });

                    dateTimeArray[i].timeRealList.forEach(time => {
                        dataString += time ? `${time.getHours()}-${time.getMinutes()}-` : '99-99-';
                    });

                    dayElements.forEach(e => {
                        dataString += e.checked ? '1-' : '0-';
                    });

                    console.log(dataString);
                    sendMessage(SET_RELAY_DATA_TIME, dataString);
                }
            });
        });
    } else {
        console.log('NOT CLASSES time__btn ');
    }

}


//  // 2022-06-12T00:00 format input date set

//  if (timeBtn.length > 0) {
//     console.log('YES CLASSES  time__btn ' + timeBtn.length);

//     timeBtn.forEach(function (e, i) {

//       e.addEventListener('click', function (ee) {
//         const parent = e.closest('.rele__item');
//         // let numberReleClick = parent.getAttribute('data-rele');
//         // console.log(i);
//         const error_class = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

//         // console.log('length error  ' + error_class.length);

//         if (error_class.length > 0) {

//           //Якщо є класи з помилками

//           const popapError = document.querySelector('.popap_error');
//           popapError.classList.add('popap_error-show');
//           let counter = 0;

//           let timerId = setInterval(function () {
//             error_class.forEach(function (e) {
//               if (counter % 2 == 0) e.classList.add('blink__eror-red');
//               if (counter % 2 != 0) e.classList.remove('blink__eror-red');
//             });

//             counter++;
//             // console.log('counter  ' + counter);
//             if (counter > 9) {
//               clearTimeout(timerId);
//               popapError.classList.remove('popap_error-show');
//             }
//           }, 300);
//         } else {
//           //Якщо нема класів з помилками то відправляємо повідомлення
//           //Відправляємо дані
//           // console.log(delayWhenTurned[i].value);

//           const dayElement = parent.querySelectorAll('.day');
//           let _s = 'RELE' + i + '-' + delayWhenTurned[i].value + '-';

//           for (nn = 0; nn < 10; nn++) {
//             // console.log('dayElement  ' + dateTimeArray[i].dateTimeRealList[nn]);

//             if (dateTimeArray[i].dateTimeRealList[nn] != 'Invalid Date') {
//               // console.log('dayElement  ' + dateTimeArray[i].dateTimeRealList[nn]);
//               let dateInput = new Date(dateTimeArray[i].dateTimeRealList[nn]).getTime();
//               dateInput = dateInput / 1000;
//               console.log("ZZZZZZZZZZZZ");
//               console.log(dateTimeArray[i].dateTimeRealList[nn]);
//               _s += dateInput + '-'; //Рік  v minute
//               _s += dateTimeArray[i].dateTimeRealList[nn].getFullYear() + '-'; //Рік
//               _s += dateTimeArray[i].dateTimeRealList[nn].getMonth() + 1 + '-'; //Місяць
//               _s += dateTimeArray[i].dateTimeRealList[nn].getDate() + '-'; //день 1-31
//               _s += dateTimeArray[i].dateTimeRealList[nn].getHours() + '-'; //Година
//               _s += dateTimeArray[i].dateTimeRealList[nn].getMinutes() + '-'; //Хвилина
//               _s += dateTimeArray[i].dateTimeRealList[nn].getDay() + '-'; //День тижня 0-6
//             } else {
//               _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
//             }
//           }

//           for (nn = 0; nn < 50; nn++) {
//             // console.log( "HHHHHHHHH  " );

//             console.log(dateTimeArray[i].timeRealList[nn]);

//             if (dateTimeArray[i].timeRealList[nn] != undefined && dateTimeArray[i].timeRealList[nn] != '') {
//               _s += dateTimeArray[i].timeRealList[nn].getHours() + "-" + dateTimeArray[i].timeRealList[nn].getMinutes() + '-';
//             } else _s += '99-99-';
//           }

//           // s += 'DAY---';
//           dayElement.forEach(function (e) {
//             if (e.checked) {
//               _s += '1-';
//             } else {
//               _s += '0-';
//             }
//           });
//           console.log(_s);

//           sendMessage(SET_RELAY_DATA_TIME, _s);

//         }
//       });
//     });
//   } else {
//     console.log('NOT CLASSES  time__btn ');
//   }