import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import PolyfillCrypto from "react-native-webview-crypto";
import "react-native-get-random-values";
import "gun/lib/mobile";
import Gun from "gun";
import "gun/sea";
import "gun/lib/radix.js";
import "gun/lib/radisk.js";
import "gun/lib/store.js";
import asyncStore from "gun/lib/ras.js";
import * as SecureStore from "expo-secure-store";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tryit } from "radash";

// Define types
type GunInstance = Gun;
type User = Record<string, any> | null;
interface GunContextType {
  gun: GunInstance;
  user: User;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<any>;
  signup: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const GunContext = createContext<GunContextType | null>(null);

interface GunProviderProps {
  children: ReactNode;
}

export function GunProvider({ children }: GunProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const gunRef = useRef<GunInstance | null>(null);

  const gun: GunInstance = (() => {
    if (gunRef.current == null) {
      gunRef.current = Gun({
        peers: ["https://gun-relay.fly.dev/gun"],
        store: asyncStore({ AsyncStorage }),
      });
    }
    return gunRef.current;
  })();

  useEffect(() => {
    const restoreSession = async () => {
      const [err, credentials] = await tryit(SecureStore.getItemAsync)(
        "gunCredentials"
      );
      if (err) {
        setIsLoading(false);
        return;
      }

      if (credentials == null) {
        setIsLoading(false);
        return;
      }
      if (credentials) {
        const { username, password } = JSON.parse(credentials);
        gun.user().auth(username, password, async (ack: any) => {
          if (ack.err) {
            setIsLoading(false);
            setUser(null);
          } else {
            setUser(gun.user().is);
            setIsLoading(false);
          }
        });
      }
    };

    restoreSession();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        console.log(
          "App has come to the foreground, attempting to reauthenticate"
        );
        restoreSession();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const login = async (username: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      gun.user().auth(username, password, async (ack: any) => {
        if (ack.err) {
          reject(ack.err);
        } else {
          await SecureStore.setItemAsync(
            "gunCredentials",
            JSON.stringify({ username, password })
          );
          setUser(gun.user().is);
          resolve(ack);
        }
      });
    });
  };

  const signup = async (username: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      gun.user().create(username, password, (ack: any) => {
        if (ack.err) {
          reject(ack.err);
        } else {
          login(username, password).then(resolve).catch(reject);
        }
      });
    });
  };

  const logout = async (): Promise<void> => {
    setIsLoggingOut(true);
    return new Promise<void>((resolve) => {
      gun.user().leave();
      SecureStore.deleteItemAsync("gunCredentials");
      setUser(null);
      setIsLoggingOut(false);
      resolve();
    });
  };

  const value: GunContextType = {
    gun,
    user,
    isLoading,
    login,
    signup,
    logout,
    isLoggingOut,
  };

  return (
    <GunContext.Provider value={value}>
      <PolyfillCrypto />
      {children}
    </GunContext.Provider>
  );
}

export function useGun(): GunContextType {
  const context = useContext(GunContext);
  if (context === null) {
    throw new Error("useGun must be used within a GunProvider");
  }
  return context;
}
