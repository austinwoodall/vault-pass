import { useState } from "react";
import { useGun } from "../providers/GunProvider";

export default function useDeleteCredential() {
  const { gun } = useGun();
  const [error, setError] = useState<string | null>(null);

  const user = gun.user();

  const deleteEntry = async (data: any) => {
    user
      .get("vault")
      .delete({
        ...data,
        website: `https://${data.website}`,
      })
      .then((newE: any) => console.log({ newE }));
  };

  return { deleteEntry, error };
}
