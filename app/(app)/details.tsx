import { H1 } from "@expo/html-elements";
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronDown,
  ChevronLeft,
  Earth,
  StickyNoteIcon,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Platform, Pressable } from "react-native";
import Constants from "expo-constants";
import useCredential from "~/components/hooks/use-credential";
import { Box } from "~/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { Text } from "~/components/ui/text";
import { VStack } from "~/components/ui/vstack";
import { Mail } from "~/lib/icons/Mail";
import { ShieldCheckIcon } from "~/lib/icons/Shield";
import { EyeOpen } from "~/lib/icons/EyeOpen";
import { EyeClosed } from "~/lib/icons/EyeClosed";

interface IData {
  credentialData: any;
}

export default function Credential() {
  const { credentialData }: IData = useCredential();
  const { id } = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      className={`flex-1 flex-col p-3 px-4`}
      style={{
        paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 10,
      }}
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
        <Button
          onPress={() =>
            router.push({ pathname: "/edit-credential", params: { id: id } })
          }
          className="rounded-full bg-secondary-400"
          variant="solid"
        >
          <ButtonText size="lg" className={"text-white"}>
            Edit
          </ButtonText>
        </Button>
      </Box>
      <H1>{credentialData?.title}</H1>
      <Box className="gap-4">
        <Box className={"border-x border-y border-secondary-200 rounded-xl"}>
          <Box>
            <Box className="flex flex-row items-center p-4 gap-4">
              <Mail className="text-slate-500" />
              <VStack>
                <Box className={"flex flex-row "}>
                  <Text>Username/Email</Text>
                </Box>
                <Box className={"flex flex-row gap-2"}>
                  <Box>
                    <Text className="text-lg">{credentialData?.username}</Text>
                  </Box>
                </Box>
              </VStack>
            </Box>
            <Divider className="bg-secondary-200" />
            <Box className="flex flex-row items-center justify-between pr-4 gap-4">
              <Box className="flex flex-row items-center p-4  gap-4">
                <ShieldCheckIcon className="text-green-500" />
                <VStack>
                  <Box className={"flex flex-row "}>
                    <Text>Password</Text>
                  </Box>
                  <Box className={"flex"}>
                    <Text className="text-lg">
                      {!showPassword ? "•••••••••" : credentialData?.password}
                    </Text>
                  </Box>
                </VStack>
              </Box>
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <EyeOpen className="text-gray-500" />
                ) : (
                  <EyeClosed className="text-gray-500" />
                )}
              </Pressable>
            </Box>
          </Box>
        </Box>
        <Box
          className={"border-x border-y border-secondary-200 p-4 rounded-xl"}
        >
          <Box className="lex flex-row items-center gap-4">
            <Earth className="text-slate-500" />
            <VStack>
              <Box className={"flex flex-row "}>
                <Box>
                  <Text>Website</Text>
                </Box>
              </Box>
              <Box className={"flex flex-row gap-2"}>
                <Box>
                  <Text>{credentialData?.website}</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
        <Box
          className={"border-x border-y border-secondary-200 p-4 rounded-xl"}
        >
          <Box className="lex flex-row items-center gap-4">
            <StickyNoteIcon className="text-slate-500" />
            <VStack>
              <Box className={"flex flex-row "}>
                <Box>
                  <Text>Note</Text>
                </Box>
              </Box>
              <Box className={"flex flex-row gap-2"}>
                <Box>
                  <Text>{credentialData?.notes}</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
      <Box className={"flex-1 justify-end p-4"}>
        <Button
          onPress={() =>
            Alert.alert(
              "",
              "This is a destructive operation, are you sure you want to delete this credential?",
              [
                {
                  text: "Cancel",
                },
                {
                  text: "Delete",
                  style: "destructive",
                },
              ],
              { cancelable: true }
            )
          }
          size="xl"
          className="rounded-full bg-red-600 py-2 px-4"
        >
          <ButtonText className="">Delete</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
