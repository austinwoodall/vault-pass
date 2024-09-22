import AsyncStorage from "@react-native-async-storage/async-storage";

import Gun from "gun/gun";
import "gun/lib/mobile";
import "gun/sea";
import "gun/lib/radix.js";
import "gun/lib/radisk.js";
import "gun/lib/store.js";

class AsyncStorageAdapter {
  constructor(opts) {
    this.opts = opts || {};
    this.prefix = this.opts.prefix || "gun/";
  }

  async put(key, data, cb) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(this.prefix + key, jsonData);
      cb(null);
    } catch (err) {
      cb(err);
    }
  }

  async get(key, cb) {
    try {
      const data = await AsyncStorage.getItem(this.prefix + key);
      if (data === null) {
        cb(null, null);
      } else {
        cb(null, JSON.parse(data));
      }
    } catch (err) {
      cb(err);
    }
  }
}

const createGunWithAsyncStorage = (opts = {}) => {
  const asyncAdapter = new AsyncStorageAdapter(opts);

  return Gun({
    ...opts,
    store: {
      put: asyncAdapter.put.bind(asyncAdapter),
      get: asyncAdapter.get.bind(asyncAdapter),
    },
  });
};

export default createGunWithAsyncStorage;
