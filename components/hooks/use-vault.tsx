import { useState, useEffect, useCallback } from "react";
import { useGun } from "../providers/GunProvider";
import CryptosEs from "crypto-es";

function decryptData(encryptedData: any, decryptionKey: any) {
  // Decrypt the data
  const decryptedBytes = CryptosEs.AES.decrypt(encryptedData, decryptionKey);

  // Convert the decrypted bytes to a UTF-8 string
  const decryptedString = decryptedBytes.toString(CryptosEs.enc.Utf8);

  return decryptedString;
}

export default function useVault() {
  const { gun, user, isLoading, isLoggingOut } = useGun();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const processVaultItem = useCallback(
    (data: any) => {
      console.log(data);
      data.password = decryptData(data.password, gun.user()._.sea.pub);
      console.log(data.password);
      setData((prev) => {
        const isDuplicate = prev.some((item) => item._["#"] == data._["#"]);
        if (isDuplicate) {
          return [...prev];
        } else {
          return [...prev, data];
        }
      });
      return [];
    },
    [gun]
  );

  useEffect(() => {
    const unsubscribe = gun.user().get("vault").map().on(processVaultItem);

    return () => {
      unsubscribe.off();
    };
  }, [gun, processVaultItem]);

  return { data };
}
