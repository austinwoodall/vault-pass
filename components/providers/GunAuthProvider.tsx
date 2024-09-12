import React, { createContext, useState, useEffect, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { useGun } from "./GunProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  publicKey: string;
  username: string;
} | null;

type ContextProps = {
  user: User;
  session: Session | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
};

const GunAuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const GunAuthProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const gun = useGun();

  useEffect(() => {
    const handleAuth = async (event: any) => {
      if (event.sea) {
        const publicKey = gun.user().is.pub;
        const username = await gun.user().get("alias").then();
        setUser({ publicKey, username });
        await AsyncStorage.setItem(
          "gunUser",
          JSON.stringify({ publicKey, username })
        );
      } else {
        setUser(null);
        await AsyncStorage.removeItem("gunUser");
      }
      setLoading(false);
    };

    gun.on("auth", handleAuth);

    const initialAuthCheck = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("gunUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const existingUser = gun.user().is;
          if (existingUser) {
            const publicKey = existingUser.pub;
            const username = await gun.user().get("alias").then();
            setUser({ publicKey, username });
            await AsyncStorage.setItem(
              "gunUser",
              JSON.stringify({ publicKey, username })
            );
          }
        }
      } catch (error) {
        console.error("Initial auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    initialAuthCheck();

    return () => {
      gun.off("auth", handleAuth);
    };
  }, [gun]);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      gun.user().auth(username, password, async (ack: any) => {
        if (ack.err) {
          setLoading(false);
          reject(new Error(ack.err));
        } else {
          const publicKey = gun.user().is.pub;
          await AsyncStorage.setItem(
            "gunUser",
            JSON.stringify({ publicKey, username })
          );
          setLoading(false);
          console.log("logged in.");
          resolve();
        }
      });
    });
  };

  const signUp = async (username: string, password: string) => {
    setLoading(true);
    return new Promise<void>((resolve, reject) => {
      gun.user().create(username, password, (ack: any) => {
        if (ack.err) {
          setLoading(false);
          reject(new Error(ack.err));
        } else {
          signIn(username, password).then(resolve).catch(reject);
        }
      });
    });
  };

  const signOut = async () => {
    gun.user().leave();
    setUser(null);
    await AsyncStorage.removeItem("gunUser");
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <GunAuthContext.Provider value={value}>
      {props.children}
    </GunAuthContext.Provider>
  );
};

export const useGunAuth = () => {
  const context = useContext(GunAuthContext);
  if (context === undefined) {
    throw new Error("useGunAuth must be used within an AuthProvider");
  }
  return context;
};

export { GunAuthContext, GunAuthProvider };
