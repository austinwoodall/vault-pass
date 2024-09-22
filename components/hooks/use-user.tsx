import { useEffect, useState } from "react";
import { useGun } from "../providers/GunProvider";

function useUser() {
  const { gun } = useGun();
  const [username, setUsername] = useState();

  useEffect(() => {
    gun.user().once((data: any) => setUsername(data.alias));
  }, [username]);

  return { username };
}

export { useUser };
