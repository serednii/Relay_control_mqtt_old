function removeShowBlock() {
    const timerDateItem = document.querySelectorAll('.timer-date__item')
    timerDateItem?.forEach(e => {
        e.classList.remove('show-block');
    });
}