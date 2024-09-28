import { H3 } from "@expo/html-elements";
import { router } from "expo-router";
import { ChevronLeft, ChevronDown } from "lucide-react-native";
import { Platform } from "react-native";
import { Box } from "~/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button";
import { Input, InputField } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

export default function ChangePassword() {
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
      <H3 className="text-center">Account password</H3>
      <Box className="flex-1 flex-col justify-between pb-10">
        <Box>
          <Text className="pb-4">
            Be sure to save your new password somewhere. Your VaultPass account
            password is not stored on our servers therefore we cannot help you
            retrieve it and your account will be lost.
          </Text>
          <Box className="gap-4">
            <Box>
              <Text className="text-lg font-bold">Current password</Text>
              <Input size="xl">
                <InputField secureTextEntry />
              </Input>
            </Box>
            <Box>
              <Text className="text-lg font-bold">New password</Text>
              <Input size="xl">
                <InputField secureTextEntry />
              </Input>
            </Box>
            <Box>
              <Text className="text-lg font-bold">Confirm password</Text>
              <Input size="xl">
                <InputField secureTextEntry />
              </Input>
            </Box>
          </Box>
        </Box>
        <Button size="xl" className="rounded-full">
          <ButtonText>Save password</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
