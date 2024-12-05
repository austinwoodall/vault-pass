import { useState } from "react";
import { useGun } from "../providers/GunProvider";
import CryptosEs from "crypto-es";
import uuid from "react-native-uuid";

export default function useNewCredential() {
  const { gun } = useGun();
  const [error, setError] = useState<string | null>(null);

  const user = gun.user();

  const newEntry = async (data: any) => {
    const encryptPass = await CryptosEs.AES.encrypt(
      data.password,
      user._.sea.pub
    ).toString();

    const id = uuid.v4();

    gun
      .user()
      .get("vault")
      .set({
        id,
        ...data,
        website: `https://${data.website}`,
        password: encryptPass,
      })
      .then((newE: any) => console.log({ newE }))
      .catch((e: any) => {
        setError(e.message);
        console.log(e.message);
      });
  };

  return { newEntry, error };
}
