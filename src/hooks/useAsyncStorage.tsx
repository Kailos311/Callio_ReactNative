import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

export default <T,>(
  key: string,
): [
  T | undefined | null,
  (data: T) => Promise<T>,
  () => Promise<void>,
  () => Promise<void>,
] => {
  const [storageItem, setStorageItem] = useState<T | null>();

  const getStorageItem: () => Promise<void> = async () => {
    const data = await AsyncStorage.getItem(key);
    data != null && setStorageItem(JSON.parse(data) as T);
  };

  const updateStorageItem: (data: T) => Promise<T> = async (data: T) => {
    const stringifiedData: string = JSON.stringify(data);
    setStorageItem(data); // Need to set this first otherwise there will be a UI lag
    await AsyncStorage.setItem(key, stringifiedData);
    return data;
  };

  const clearStorageItem: () => Promise<void> = async () => {
    await AsyncStorage.removeItem(key);
    setStorageItem(null);
  };
  return [storageItem, updateStorageItem, getStorageItem, clearStorageItem];
};
