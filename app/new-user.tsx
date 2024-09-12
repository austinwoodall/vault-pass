import { Controller, useForm } from "react-hook-form";
import { Text, View, StyleSheet } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, ButtonText } from "~/components/ui/button";
import { Input, InputField } from "~/components/ui/input";
import { Box } from "~/components/ui/box";
import { VStack } from "~/components/ui/vstack";
import { router } from "expo-router";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "~/components/ui/toast";
import { useGunAuth } from "~/components/providers/GunAuthProvider";

// Zod schema for email validation
const schema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z.string().min(8, { message: "Password cannot be empty." }),
});

export default function NewUser() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const toast = useToast();
  const { signUp } = useGunAuth();
  const onSubmit = async (data: any) => {
    try {
      await signUp(data.username, data.password);
      router.push("/");
    } catch (e) {
      return toast.show({
        placement: "top",
        duration: 5000,
        render: () => {
          return (
            <Toast action="error" variant="outline">
              <ToastTitle>{e.name}</ToastTitle>
              <ToastDescription>{e.message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.h1}>
            Great. Let's setup your VaultPass account.
          </Text>
          <Text style={styles.subHeader}>What is your username?</Text>
        </View>
        <VStack space="lg" className="flex-1 pt-20 mx-10">
          <Box>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="xl">
                  <InputField
                    autoCorrect={false}
                    autoFocus
                    onBlur={onBlur}
                    enterKeyHint="done"
                    onChangeText={onChange}
                    placeholder="Username(i.e. johndoe1)"
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}
          </Box>
          <Box>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="xl">
                  <InputField
                    autoCorrect={false}
                    onBlur={onBlur}
                    enterKeyHint="done"
                    onChangeText={onChange}
                    placeholder="Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                  />
                </Input>
              )}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </Box>
        </VStack>
      </View>
      <Box className="flex-1 justify-end px-10 pb-10">
        <Button
          size="xl"
          className="rounded-full"
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid}
        >
          <ButtonText size="lg">Next</ButtonText>
        </Button>

        <Button onPress={() => router.back()} variant="link">
          <ButtonText size="lg">Back</ButtonText>
        </Button>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 30,
    paddingTop: 60,
    borderRadius: 10,
  },
  input: {
    marginVertical: 5,
  },
  headContainer: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBEBEB",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: "flex-end",
  },
  disabled: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ccc",
  },

  error: {
    color: "#f00",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },

  errorInput: {
    borderColor: "red",
    color: "red",
  },
});
