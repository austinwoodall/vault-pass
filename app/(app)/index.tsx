import { useState } from "react";
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
import { useGunAuth } from "~/components/providers/GunAuthProvider";
import PasswordGenerator from "~/components/PasswordGenerator";
import { ScrollView } from "react-native";

export default function Home() {
  const [openGenerator, setOpenGenerator] = useState(false);
  const { user, signOut } = useGunAuth();
  // const { data }: any = useVault();
  const data = {};

  return (
    <>
      <Box className="flex-1 pt-16 px-5">
        <Box className="fle flex-row justify-between items-center">
          <VStack className="gap-1 mb-6">
            <Text className="text-xl text-black font-bold m-0">
              Hello, {user?.username}.
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
              key="Add account0"
              className="gap-2"
              textValue="Password generator"
              onPress={() => setOpenGenerator(true)}
            >
              <RefreshCcw color={"black"} size={16} />
              <MenuItemLabel size="md">Password generator</MenuItemLabel>
            </MenuItem>

            <MenuItem key="Add account1" className="gap-2" textValue="Settings">
              <User color={"black"} size={16} />
              <MenuItemLabel size="md">Profile</MenuItemLabel>
            </MenuItem>
            <MenuItem
              onPress={signOut}
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
            <InputField placeholder="Search password credentials" />
          </Input>
          <ScrollView className="flex-1">
            {data.length ? (
              <Box className="gap-2">
                {data.map((item: any) => (
                  <Box
                    key={item.id}
                    onPress={router.push({
                      pathname: "/(app)/details",
                      params: { id: item.id },
                    })}
                    className="p-4 rounded-md"
                  >
                    <Text className=" text-xl">{item.title}</Text>
                    <Text className="">{item.email}</Text>
                  </Box>
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
