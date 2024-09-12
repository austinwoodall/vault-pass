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
import { Mail } from "~/lib/icons/Mail";
import { User } from "~/lib/icons/User";
import { StickyNote } from "~/lib/icons/StickyNote";
import useNewCredential from "~/components/hooks/use-add-credential";

// Zod schema for email validation
const schema = z.object({
  title: z.string().min(0), // Optional
  username: z.string().min(0, { message: "Username cannot be empty" }),
  email: z.string().min(0),
  password: z.string().min(0, { message: "Password cannot be empty." }),
  website: z.string().min(0), // Optional
  notes: z.string().min(0), // Optional,
  created_at: z.date(),
});

export type AddEntry = z.infer<typeof schema>;

export default function NewCredential() {
  const { newEntry } = useNewCredential();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      username: "",
      email: "",
      password: "",
      website: "",
      notes: "",
      created_at: new Date().toISOString(),
    },
  });
  const onSubmit: SubmitHandler<AddEntry> = (data) => {
    newEntry(data);
    router.back();
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
                <Text className="ml-3 text-primary-400">Username</Text>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input size="xl" className="border-0 rounded-lg">
                      <InputField
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Add username"
                      />
                    </Input>
                  )}
                />
              </Box>
            </VStack>
            <VStack className="flex flex-row items-center bg-slate-200 rounded-xl p-4">
              <Mail className="text-slate-500" size={20} />
              <Box className="flex-1">
                <Text className="ml-3 text-primary-400">Email address</Text>
                <Controller
                  control={control}
                  name={"email"}
                  render={({ field }) => (
                    <Input size="xl" className="border-0">
                      <InputField
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="Add email address"
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
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="https://"
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
