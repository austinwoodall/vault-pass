import { useState } from "react";
import { useGun } from "../providers/GunProvider";
import CryptosEs from "crypto-es";

export default function useNewCredential() {
  const { gun } = useGun();
  const [error, setError] = useState<string | null>(null);

  const user = gun.user();

  const newEntry = async (data: any) => {
    const encryptPass = CryptosEs.AES.encrypt(
      data.password,
      user._.sea.pub
    ).toString();
    console.log({ encryptPass });

    gun
      .user()
      .get("vault")
      .set({ ...data, password: encryptPass })
      .then((newE: any) => console.log({ newE }));
  };

  return { newEntry, error };
}
