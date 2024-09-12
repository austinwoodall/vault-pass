import { useGun } from "../providers/GunProvider";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useCredential(id: string[] | string) {
  const gun = useGun();
  const { data, error } = useSuspenseQuery({
    queryKey: ["vault", id],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        if (error) {
          reject(error);
        }
        const vaultData = gun
          .user("vault")
          .get(id)
          .on(async (data: any) => {
            if (data) {
              return data;
            }
          });

        setTimeout(() => resolve(vaultData), 500);
      });
    },
  });

  return { data, error };
}
