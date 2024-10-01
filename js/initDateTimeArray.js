function initDateTimeArray() {
    // Перевірка на вже існуючі дані
    if (dateTimeArray.length === 0) {
        dateTimeArray = Array.from({ length: 8 }, () => ({
            dateTimeList: [],
            dateTimeRealList: [],
            timeList: [],
            timeRealList: []
        }));
    } else {
        console.warn('dateTimeArray вже ініціалізовано.');
    }
}
