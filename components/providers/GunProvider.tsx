import React, { createContext, useContext } from "react";

import "react-native-get-random-values";
import PolyfillCrypto from "react-native-webview-crypto";
import "gun/lib/mobile";
import Gun from "gun/gun";
import "gun/sea";
import "gun/lib/radix.js";
import "gun/lib/radisk.js";
import "gun/lib/store.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageAdapter = {
  put: async (
    key: string,
    value: any,
    cb: (err: Error | null, data?: any) => void
  ) => {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
      cb(null);
    } catch (err) {
      cb(err as Error);
    }
  },
  get: async (key: string, cb: (err: Error | null, data?: any) => void) => {
    try {
      const json = await AsyncStorage.getItem(key);
      const value = json ? JSON.parse(json) : null;
      cb(null, value);
    } catch (err) {
      cb(err as Error);
    }
  },
};

const gun = Gun({
  peers: ["https://gun-relay.fly.dev/gun"], // Replace with your Gun peer
  store: asyncStorageAdapter,
  localStorage: false,
});

const GunContext = createContext<Gun | null>(null);

export const GunProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GunContext.Provider value={gun}>
      <PolyfillCrypto />
      {children}
    </GunContext.Provider>
  );
};

export const useGun = () => {
  const context = useContext(GunContext);
  if (context === undefined) {
    throw new Error("useGun must be used within a GunProvider");
  }
  return context as Gun;
};
