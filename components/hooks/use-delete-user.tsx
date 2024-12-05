import { tryit } from "radash";
import { useGun } from "../providers/GunProvider";
import * as SecureStore from "expo-secure-store";

function useDeleteUser() {
  const { gun } = useGun();

  async function deleteUser() {
    const [err, credentials] = await tryit(SecureStore.getItemAsync)(
      "gunCredentials"
    );

    const { username, password } = JSON.parse(credentials);
    console.log({ username, password });
    gun.user().delete(username, password, async (event) => {
      console.log(event);
    });
  }
  return { deleteUser };
}

export { useDeleteUser };
