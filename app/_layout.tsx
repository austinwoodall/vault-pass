import "~/global.css";

import { Theme } from "@react-navigation/native";
import { Slot, SplashScreen } from "expo-router";

import { NAV_THEME } from "~/lib/constants";
import { GluestackUIProvider } from "~/components/ui/gluestack-ui-provider";
import { GunProvider } from "~/components/providers/GunProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const LIGHT_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  React.useEffect(() => {
    if (true) {
      SplashScreen.hideAsync();
    }
  }, []);

  return (
    <GunProvider>
      <GluestackUIProvider mode="light">
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </GluestackUIProvider>
    </GunProvider>
  );
}
