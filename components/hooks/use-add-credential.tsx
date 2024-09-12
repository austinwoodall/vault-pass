import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGun } from "../providers/GunProvider";

export default function useNewCredential() {
  const gun = useGun();
  const queryClient = useQueryClient();

  const { mutateAsync: newEntry } = useMutation({
    mutationFn: (data) =>
      gun.user("vault").set(data, (ack: any) => {
        if (ack.err) {
          console.log("Error creating new credential:", ack.err);
        } else {
          console.log("New credential created successfully");
        }
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vault"] });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { newEntry };
}
