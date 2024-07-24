import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorageProvider = {
  get: async (key: string) => {
    console.log("get", key);
    return await AsyncStorage.getItem(key);
  },
  set: async (key: string, value: string) => {
    console.log("set", key, value);
    return await AsyncStorage.setItem(key, value);
  },
  remove: async (key: string) => {
    console.log("remove", key);
    return await AsyncStorage.removeItem(key);
  },
};
