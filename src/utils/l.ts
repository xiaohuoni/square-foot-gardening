import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export const setItem = (key: string, data: string) => {
  if (Capacitor.isNativePlatform()) {
    Preferences.set({
      key,
      value: data,
    });
  } else {
    localStorage.setItem(key, data);
  }
};
export const getItem = async (key: string) => {
  let data: any = '';
  if (Capacitor.isNativePlatform()) {
    const ret = await Preferences.get({ key });
    data = ret.value;
  } else {
    data = localStorage.getItem(key);
  }
  return JSON.parse(data);
};
