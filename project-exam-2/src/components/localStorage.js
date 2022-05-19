import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const tokenKey = "token";
const userKey = "user";

// token
export function saveToken(token) {
    saveStorage(tokenKey, token)
}

export function getToken() {
    return getStorage(tokenKey);
}

// user
export function saveUser(user) {
    return saveStorage(userKey, user);
}

export function getUser() {
    const user = getStorage(userKey)

    if (user) {
        return user.username;
    }
}

// storage
export function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
    const value = localStorage.getItem(key);

    if (value === null) {
      return [];
    } else {
      return JSON.parse(value);
    }
}