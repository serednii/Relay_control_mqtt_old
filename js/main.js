
initDateTimeArray()

async function start() {
  try {
    // Оновлює HTML текст
    await innerHtmlText();

    // Додає атрибути ID та for
    await addIdAndFor();

    // Ініціалізує Local Storage
    await startLocalStorage();

    // Налаштовує селектори
    await startSelector();

    // Виконує всі інші функції
    await startAllFunctions();
  } catch (error) {
    // Обробка помилок
    console.error('Error during initialization:', error);
  }
}
start();
