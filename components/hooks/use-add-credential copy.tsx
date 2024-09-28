import { useState } from "react";
import { useGun } from "../providers/GunProvider";

export default function useEditCredential(id: string) {
  const { gun } = useGun();
  const [error, setError] = useState<string | null>(null);

  const user = gun.user();

  const editEntry = async (data: any) => {
    user
      .get("vault")
      .set({
        ...data,
        website: `https://${data.website}`,
        password: encryptPass,
      })
      .then((newE: any) => console.log({ newE }));
  };

  return { editEntry, error };
}
