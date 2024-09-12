import { H1 } from "@expo/html-elements";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import useCredential from "~/components/hooks/use-credential";
import { Box } from "~/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { Text } from "~/components/ui/text";
import { VStack } from "~/components/ui/vstack";
import { Mail } from "~/lib/icons/Mail";

export default function Credential() {
  const params = useLocalSearchParams();
  const { data } = useCredential(params.id);

  return (
    <Box className={"flex-1 flex-col p-3 px-4 "}>
      <Box className={"flex-row pb-2 justify-between"}>
        <Button
          onPress={() => router.back()}
          className="w-10 p-2 justify-start rounded-full bg-secondary-400"
          variant="link"
        >
          <ButtonIcon className={"self-center"} size={"lg"}>
            <ChevronDown color={"white"} size={20} />
          </ButtonIcon>
        </Button>
        <Button className="rounded-full bg-secondary-400" variant="solid">
          <ButtonText size="lg" className={"text-white"}>
            Edit
          </ButtonText>
        </Button>
      </Box>
      <H1>{data?.title}</H1>
      <Box>
        <Box className={"border-x border-y f border-primary-50 p-4 rounded-xl"}>
          <Box className="lex flex-row items-center gap-2">
            <Mail className="text-slate-500" />
            <VStack>
              <Box className={"flex flex-row "}>
                <Box>
                  <Text>Email address</Text>
                </Box>
              </Box>
              <Box className={"flex flex-row gap-2"}>
                <Box>
                  <Text>{data.email}</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
          <Divider className="bg-primary-50" />
          <Box className="lex flex-row items-center gap-2">
            <Mail className="text-slate-500" />
            <VStack>
              <Box className={"flex flex-row "}>
                <Box>
                  <Text>Email address</Text>
                </Box>
              </Box>
              <Box className={"flex flex-row gap-2"}>
                <Box>
                  <Text>{data.email}</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
