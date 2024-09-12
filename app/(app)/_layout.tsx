import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { GunAuthContext } from "~/components/providers/GunAuthProvider";
import { ModalProvider } from "~/components/providers/ModalProvider";
import { Text } from "~/components/ui/text";

export default function AppLayout() {
  const auth = useContext(GunAuthContext);
  const { user, loading } = auth;

  console.log({ user, loading });

  useEffect(() => {
    if (!loading && !user) {
      console.log("Redirecting...");
      return router.replace("/start-auth");
    }
  }, [user, loading]);

  if (loading) {
    // Show loading screen while checking authentication
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ModalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="new-credential"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="details" options={{ presentation: "modal" }} />
      </Stack>
    </ModalProvider>
  );
}
