import { Redirect, useSegments } from "expo-router";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useGun } from "~/components/providers/GunProvider";
import { ModalProvider } from "~/components/providers/ModalProvider";
import { Text } from "~/components/ui/text";

export default function AppLayout() {
  const { user, isLoading } = useGun();
  const segments = useSegments();

  // If user is undefined, we're still loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // If user is null, redirect to start-auth
  if (user === null) {
    return <Redirect href={"/start-auth"} />;
  }

  // If user is logged in, render the main app layout
  return (
    <ModalProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen
          name="new-credential"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="details" options={{ presentation: "modal" }} />
        <Stack.Screen name="account" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="change-password"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="edit-credential"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </ModalProvider>
  );
}
