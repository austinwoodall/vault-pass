import { H1 } from "@expo/html-elements";
import { router } from "expo-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Trash2,
} from "lucide-react-native";
import { Platform, Pressable } from "react-native";
import { useUser } from "~/components/hooks/use-user";
import { Box } from "~/components/ui/box";
import { ButtonIcon, Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { VStack } from "~/components/ui/vstack";

export default function Acccount() {
  const { username } = useUser();
  return (
    <Box
      className={`flex-1 flex-col p-3 px-4 ${Platform.OS == "android" ? "pt-14" : ""}`}
    >
      <Box className={"flex-row pb-2 justify-between"}>
        <Button
          onPress={() => router.back()}
          className="w-10 p-2 justify-start rounded-full bg-secondary-400"
          variant="link"
        >
          <ButtonIcon className={"self-center"} size={"lg"}>
            {Platform.OS == "android" ? (
              <ChevronLeft color={"white"} size={20} />
            ) : (
              <ChevronDown color={"white"} size={20} />
            )}
          </ButtonIcon>
        </Button>
      </Box>
      <Box className="flex flex-col justify-between h-full">
        <Box>
          <H1>Account</H1>
          <Box className="gap-4">
            <Box
              className={"border-x border-y border-secondary-200 rounded-xl"}
            >
              <Box>
                <Box className="flex flex-row items-center p-4 gap-4">
                  <VStack>
                    <Box className={"flex flex-row "}>
                      <Text>Username</Text>
                    </Box>
                    <Box className={"flex flex-row gap-2"}>
                      <Box>
                        <Text className="text-xl">{username}</Text>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Box>
            <Pressable onPress={() => router.push("/change-password")}>
              <Box
                className={
                  "border-x border-y border-secondary-200 px-4 py-6 rounded-xl"
                }
              >
                <Box className="lex flex-row items-center justify-between">
                  <Text className="text-xl">Change password</Text>
                  <ChevronRight color={"grey"} />
                </Box>
              </Box>
            </Pressable>
            <Box
              className={
                "border-x border-y border-secondary-200 px-4 py-6 rounded-xl"
              }
            >
              <Box className="lex flex-row items-center justify-between">
                <Text className="text-xl text-blue-700">Sign out</Text>
                <LogOut color={"blue"} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="mb-20">
          <Box
            className={
              "border-x border-y border-secondary-200 px-4 py-6 rounded-xl"
            }
          >
            <Box className="lex flex-row items-center justify-between">
              <Text className="text-xl color-red-600">Delete account</Text>
              <Trash2 color={"red"} />
            </Box>
          </Box>
          <Box>
            <Text>
              This will permanently delete your VaultPass account and all of its
              data. You will not be able to reactivate this account.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
