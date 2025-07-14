export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key)
    return serializedState ? JSON.parse(serializedState) : null
  } catch (e) {
    console.error('Error loading from localStorage', e)
    return null
  }
}

export const saveToLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Error saving to localStorage', e)
  }
}