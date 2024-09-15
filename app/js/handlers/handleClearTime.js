function handleClearTime() {
    if (timeBtnClear.length > 0) {
        console.log(`YES CLASSES time__btn-clear ${timeBtnClear.length}`);

        timeBtnClear.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                messageDate(index);

                const DATA_TIME_AND_TIME_ELEMENTS = relayItem[index].querySelectorAll(`${CLASS_DATE_TIME}, .time`);
                DATA_TIME_AND_TIME_ELEMENTS.forEach(element => element.value = '');
            });
        });
    } else {
        console.log('NOT CLASSES time__btn-clear');
    }
}



// if (timeBtnClear.length > 0) {
//     console.log('YES CLASSES  time__btn-clear ' + timeBtnClear.length);
//     timeBtnClear.forEach(function (e, i) {
//       e.addEventListener('click', function () {
//         messageDate(i);
//         relayItem[i].querySelectorAll('CLASS_DATE_TIME, .time').forEach(function (e) {
//           e.value = '';
//         });
//       });
//     });
//   } else {
//     console.log('NOT CLASSES  time__btn-clear ');
//   }