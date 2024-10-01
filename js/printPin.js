function printPin() {
    if (relayItemTitlePin.length > 0) {
        console.log(`YES CLASSES rele__item-title-pin ${relayItemTitlePin.length}`);

        const pinLabels = ['PIN 5', 'PIN 4', 'PIN 0', 'PIN 2', 'PIN 12', 'PIN 13', 'PIN 3', 'PIN 1'];

        relayItemTitlePin.forEach((element, index) => {
            if (index < pinLabels.length) {
                element.textContent = pinLabels[index];
            }
        });
    } else {
        console.log(`NOT CLASSES rele__item-title-pin ${relayItemTitlePin.length}`);
    }
}
