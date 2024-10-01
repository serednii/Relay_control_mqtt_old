function removeShowBlock() {
    const timerDateItems = document.querySelectorAll('.timer-date__item');

    // Переконатися, що є знайдені елементи
    if (timerDateItems.length > 0) {
        timerDateItems.forEach(item => {
            item.classList.remove('show-block');
        });
    }
}
