import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Box } from "~/components/ui/box";
import { Button, ButtonText } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";

export default function StartAuth() {
  return (
    <Box className={" pb-6"} style={styles.container}>
      <View style={styles.content}>
        <Heading size="4xl">VaultPass</Heading>
      </View>
      <Box className="flex-1 justify-end px-10">
        <Link push href={"/sign-in"} asChild>
          <Button size="xl" className="rounded-full" variant={"solid"}>
            <ButtonText size="lg">Sign In</ButtonText>
          </Button>
        </Link>
        <Link push href={"/new-user"} asChild>
          <Button variant={"link"}>
            <ButtonText size="lg">New User</ButtonText>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    marginHorizontal: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: "flex-end",
  },
});
