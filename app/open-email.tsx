import { View, StyleSheet } from "react-native";
import { Text } from "~/components/ui/text";

export default function OpenEmail() {
  return (
    <View style={styles.container}>
      <Text>Open Email</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
