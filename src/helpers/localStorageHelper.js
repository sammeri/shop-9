/**
 * Загружает данные из localStorage по ключу
 * @param {string} key - Ключ ('favorites' или 'cart')
 * @returns {Array|null} - Массив данных или null
 */
export function loadFromLocalStorage(key) {
  try {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : null;
  } catch (error) {
    console.error(`Ошибка парсинга localStorage(${key}):`, error);
    return null;
  }
}

/**
 * Сохраняет данные в localStorage
 * @param {string} key - Ключ ('favorites' или 'cart')
 * @param {Array} data - Данные для сохранения
 */
export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Ошибка сохранения localStorage(${key}):`, error);
  }
}
