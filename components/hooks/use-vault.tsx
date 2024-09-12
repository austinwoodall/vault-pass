import { useSuspenseQuery } from "@tanstack/react-query";
import { useGun } from "../providers/GunProvider";

export default function useVault() {
  const gun = useGun();

  const { data, error } = useSuspenseQuery({
    queryKey: ["vault"],
    queryFn: () => {
      const passwords: any = [];
      return new Promise((resolve, reject) => {
        if (error) {
          reject(error);
        }
        gun
          .user("vault")
          .map()
          .once(async (data: any) => {
            if (data) {
              passwords.push({ id: data["_"]["#"], ...data });
            }
          });

        setTimeout(() => resolve(passwords), 500);
      });
    },
  });

  return { data };
}
