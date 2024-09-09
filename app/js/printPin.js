function printPin() {
    if (releItemTitlePin.length > 0) {
        console.log('YES CLASSES rele__item-title-pin ' + releItemTitlePin.length);
        releItemTitlePin[0].textContent = 'PIN 5'
        releItemTitlePin[1].textContent = 'PIN 4'
        releItemTitlePin[2].textContent = 'PIN 0'
        releItemTitlePin[3].textContent = 'PIN 2'
        releItemTitlePin[4].textContent = 'PIN 12'
        releItemTitlePin[5].textContent = 'PIN 13'
        releItemTitlePin[6].textContent = 'PIN 3'
        releItemTitlePin[7].textContent = 'PIN 1'
    } else {
        console.log('NOT CLASSES rele__item-title-pin ' + releItemTitlePin.length);
    }
}