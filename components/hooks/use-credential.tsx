import { useState } from "react";
import { useGun } from "../providers/GunProvider";
import { useLocalSearchParams } from "expo-router";

export default function useCredential() {
  const { id } = useLocalSearchParams();
  const { gun } = useGun();
  const [credentialData, setCredential] = useState();
  new Promise((resolve, reject) => {
    gun
      .user()
      .get("vault")
      .map()
      .once((data: any, key: string) => {
        if (key === id) {
          console.log(data);
          setCredential(data);
          resolve(data);
        }
      });

    // Reject if not found after a timeout
    setTimeout(() => reject(new Error("Node not found")), 5000);
  });

  return { credentialData };
}
