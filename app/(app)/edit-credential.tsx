import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { XIcon } from "lucide-react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";
import { Box } from "~/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "~/components/ui/button";
import { Input, InputField } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { VStack } from "~/components/ui/vstack";
import { Earth } from "~/lib/icons/Earth";
import { KeyRound } from "~/lib/icons/KeyRound";
import { User } from "~/lib/icons/User";
import { StickyNote } from "~/lib/icons/StickyNote";
import useNewCredential from "~/components/hooks/use-add-credential";

// Zod schema for email validation
const schema = z.object({
  title: z.string().min(1),
  username: z.string().min(1, { message: "Username/Email cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
  website: z.string().min(1),
  notes: z.string().min(0), // Optional,
});

export type AddEntry = z.infer<typeof schema>;

export default function EditCredential() {
  const { newEntry, error } = useNewCredential();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      username: "",
      password: "",
      website: "",
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<AddEntry> = (data) => {
    newEntry(data);
    // router.back();
  };

  return (
    <Box className="flex-1 flex-col p-3 px-4 ">
      <Box className={"flex-row pb-2 justify-between"}>
        <Button
          onPress={() => router.back()}
          className="w-10 p-2 justify-start rounded-full bg-secondary-400"
          variant="link"
        >
          <ButtonIcon className={"self-center"} size={"lg"}>
            <XIcon color={"white"} size={20} />
          </ButtonIcon>
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          className="rounded-full bg-secondary-400"
          variant="solid"
        >
          <ButtonText size="lg" className={"text-white"}>
            Create
          </ButtonText>
        </Button>
      </Box>
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets
        extraScrollHeight={20}
      >
        <Box className="flex-1 flex-col pt-4 h-full">
          <Box className="pt-2 gap-4">
            <VStack className="bg-slate-200 rounded-xl p-2">
              <Text className="ml-2 text-primary-400">Title</Text>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input size="xl" className="border-0 rounded-lg">
                    <InputField
                      autoCorrect={false}
                      className={"text-4xl font-bold"}
                      autoFocus
                      onChangeText={field.onChange}
                      value={field.value}
                      placeholder="Untitled"
                    />
                  </Input>
                )}
              />
            </VStack>
            <VStack className="flex flex-row items-center bg-slate-200 rounded-xl p-4">
              <User className="text-slate-500" size={20} />
              <Box className="flex-1">
                <Text className="ml-3 text-primary-400">Username or Email</Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input size="xl" className="border-0 rounded-lg">
                      <InputField
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Add username or email"
                      />
                    </Input>
                  )}
                />
              </Box>
            </VStack>

            <VStack className="flex flex-row items-center bg-slate-200 rounded-xl p-4">
              <KeyRound className="text-slate-500" size={20} />
              <Box className="flex-1">
                <Text className="ml-3 text-primary-400">Password</Text>
                <Controller
                  control={control}
                  name={"password"}
                  render={({ field }) => (
                    <Input size="lg" className="border-0">
                      <InputField
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Add password"
                        secureTextEntry
                      />
                    </Input>
                  )}
                />
              </Box>
            </VStack>
            <VStack className="flex flex-row items-center bg-slate-200 rounded-xl p-4">
              <Earth className="text-slate-500" size={20} />
              <Box className="flex-1">
                <Text className="ml-3 p-0 text-primary-400">Website</Text>
                <Controller
                  control={control}
                  name={"website"}
                  render={({ field }) => (
                    <Input size="lg" className="border-0">
                      <InputField
                        autoCapitalize={"none"}
                        keyboardType={"url"}
                        value={field.value}
                        onChangeText={(text) => {
                          const sanitizedText = text.replace(
                            /^https?:\/\//,
                            ""
                          );
                          field.onChange(sanitizedText);
                        }}
                        placeholder="https://"
                        onBlur={field.onBlur}
                      />
                    </Input>
                  )}
                />
              </Box>
            </VStack>
            <VStack className="flex flex-row items-center bg-slate-200 rounded-xl p-4">
              <StickyNote className="text-slate-500" size={20} />
              <Box className="flex-1">
                <Text className="ml-3 text-primary-400">Notes</Text>
                <Controller
                  control={control}
                  name="notes"
                  render={({ field }) => (
                    <Input size="lg" className="border-0 ">
                      <InputField
                        value={field.value}
                        onChangeText={field.onChange}
                        multiline
                        numberOfLines={3}
                        placeholder="Add note"
                      />
                    </Input>
                  )}
                />
              </Box>
            </VStack>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
}
