import { useEffect, useState } from "react";
import {
  EllipsisVerticalIcon,
  LogOut,
  RefreshCcw,
  User,
} from "lucide-react-native";
import { router } from "expo-router";
import { H2 } from "@expo/html-elements";
import { Box } from "~/components/ui/box";
import { Text } from "~/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "~/components/ui/input";
import { Search } from "~/lib/icons/Search";
import { Button, ButtonText } from "~/components/ui/button";
import { VStack } from "~/components/ui/vstack";
import { Menu, MenuItem, MenuItemLabel } from "~/components/ui/menu";
import { useGun } from "~/components/providers/GunProvider";
import PasswordGenerator from "~/components/PasswordGenerator";
import { Alert, Pressable, ScrollView } from "react-native";
import { useUser } from "~/components/hooks/use-user";
import useVault from "~/components/hooks/use-vault";

export default function Home() {
  const [openGenerator, setOpenGenerator] = useState(false);
  const [data, setData] = useState([]);
  const { logout, isLoading, user, gun } = useGun();
  const { username } = useUser();

  const { data: vault }: any = useVault();

  useEffect(() => {
    if (vault.length) {
      setData(vault);
    }
  }, [vault]);

  function searchCredentials(value: string) {
    console.log(JSON.stringify(value, null, 2));
    const filteredData = vault.filter((item: any) =>
      item?.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  }

  return (
    <>
      <Box className="flex-1 pt-16 px-5">
        <Box className="fle flex-row justify-between items-center">
          <VStack className="gap-1 mb-6">
            <Text className="text-xl text-black font-bold m-0">
              Hello, {username}.
            </Text>
            <Text className="text-md">
              Save your passwords safely and securely.
            </Text>
          </VStack>
          <Menu
            placement="bottom right"
            trigger={({ ...triggerProps }) => (
              <Button {...triggerProps} variant="link">
                <EllipsisVerticalIcon color={"black"} />
              </Button>
            )}
          >
            <MenuItem
              key="Add account1"
              className="gap-2"
              textValue="Settings"
              onPress={() => router.push("/account")}
            >
              <User color={"black"} size={16} />
              <MenuItemLabel size="md">Account</MenuItemLabel>
            </MenuItem>
            <MenuItem
              key="Add account0"
              className="gap-2"
              textValue="Password generator"
              onPress={() => setOpenGenerator(true)}
            >
              <RefreshCcw color={"black"} size={16} />
              <MenuItemLabel size="md">Password generator</MenuItemLabel>
            </MenuItem>

            <MenuItem
              onPress={() =>
                Alert.alert("Do you want to log out?", "", [
                  {
                    text: "Cancel",
                    onPress: () => null,
                  },
                  {
                    text: "Log out",
                    onPress: () => logout(),
                    style: "destructive",
                  },
                ])
              }
              key="Sign out"
              className="gap-2"
              textValue="Sign out"
            >
              <LogOut color={"black"} size={16} />
              <MenuItemLabel size="md">Sign out</MenuItemLabel>
            </MenuItem>
          </Menu>
        </Box>
        <Box className="flex-1 h-full">
          <Input className={"rounded-xl"} size="xl">
            <InputSlot>
              <InputIcon className="ml-2" as={Search} size={20}>
                <Search className="text-slate-500" />
              </InputIcon>
            </InputSlot>
            <InputField
              onChangeText={(text) => searchCredentials(text)}
              placeholder="Search password credentials"
            />
          </Input>
          <ScrollView className="flex-1 pt-4">
            {data.length ? (
              <Box className="gap-2">
                {data.map((item: any) => (
                  <Pressable
                    key={item?._["#"] ?? null}
                    onPress={() =>
                      router.navigate({
                        pathname: "/details",
                        params: { id: item._["#"] },
                      })
                    }
                    className="flex-1 flex-row"
                  >
                    <Box className="w-12 h-12 self-center items-center justify-center rounded-xl bg-white">
                      <Text className="text-md font-bold">
                        {item?.title?.toUpperCase().substring(0, 2)}
                      </Text>
                    </Box>
                    <Box className="flex-col p-4 rounded-md">
                      <Text className=" text-xl">{item?.title}</Text>
                      <Text className="">{item?.username}</Text>
                    </Box>
                  </Pressable>
                ))}
              </Box>
            ) : (
              <>
                <H2 className="text-center">Your vault is empty</H2>
                <Text className="text-center">
                  Start adding credentials to get started.
                </Text>
              </>
            )}
          </ScrollView>
        </Box>
        <Box className="flex justify-end pb-20 ">
          <Button
            size="lg"
            onPress={() => router.push("/(app)/new-credential")}
            className="rounded-full"
          >
            <ButtonText>Add Credential</ButtonText>
          </Button>
        </Box>
      </Box>
      <PasswordGenerator
        isOpen={openGenerator}
        handleOpen={setOpenGenerator}
        handleClose={() => setOpenGenerator(false)}
      />
    </>
  );
}
