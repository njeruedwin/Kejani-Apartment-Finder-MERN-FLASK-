export function getFromStorage(key) {
  if (!key) {
    return null;
  }
  try {
    const verifyStr = localStorage.getItem(key);
    if (verifyStr) {
      return JSON.parse(verifyStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setInStorage(key, obj) {
  if (!key) {
    console.error("Error : key is missing");
  }
  try {
    return localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error("Error : " + err);
  }
}
export function deleteInStorage(key, obj) {
  if (!key) {
    console.error("Error : key is missing");
  }
  try {
    return localStorage.clear(key);
  } catch (err) {
    console.error("Error : " + err);
  }
}
