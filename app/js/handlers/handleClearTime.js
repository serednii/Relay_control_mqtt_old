function handleClearTime() {
    if (timeBtnClear.length > 0) {
        console.log(`YES CLASSES time__btn-clear ${timeBtnClear.length}`);

        timeBtnClear.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                messageDate(index);

                const dateTimeAndTimeElements = relayItem[index].querySelectorAll('.datetime, .time');
                dateTimeAndTimeElements.forEach(element => element.value = '');
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
//         relayItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
//           e.value = '';
//         });
//       });
//     });
//   } else {
//     console.log('NOT CLASSES  time__btn-clear ');
//   }