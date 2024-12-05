import { useRef, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store"; // SecureStore for storing sensitive data securely
import { VStack } from "~/components/ui/vstack";
import { Text } from "~/components/ui/text";
import { HStack } from "~/components/ui/hstack";
import { Input, InputField } from "~/components/ui/input";
import { Button, ButtonText } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "~/components/ui/box";

const EnterPIN = ({ onSuccess }) => {
  const [pin, setPin] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);
  const [attempts, setAttempts] = useState(0); // To track failed attempts

  const handleChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== "" && index < pin.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      console.log(inputRefs.current[0].event);

      // Move focus to the previous input when backspace is pressed and current field is empty
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const validatePIN = async () => {
    const enteredPin = pin.join("");
    const storedPin = await SecureStore.getItemAsync("user_pin");

    if (enteredPin === storedPin) {
      onSuccess(); // Call the success handler
    } else {
      setAttempts(attempts + 1);
      Alert.alert("Invalid PIN", `Attempt ${attempts + 1}/5`);
      if (attempts + 1 >= 5) {
        Alert.alert("Too many failed attempts", "Please try again later.");
        // Optional: Add logic for a cooldown period or lockout
      }
    }
  };

  return (
    <SafeAreaView>
      <VStack className={"h-full gap-5 flex-col items-center p-4"}>
        <Box className={"flex-1"}>
          <Text className={"text-2xl text-center font-bold"}>
            Enter Your PIN
          </Text>
          <HStack className={"gap-4"}>
            {pin.map((value, index) => (
              <Input size="xl" className={"w-10"}>
                <InputField
                  key={index}
                  value={value}
                  onKeyPress={handleKeyPress}
                  onChangeText={(text) => handleChange(text, index)}
                  maxLength={1}
                  keyboardType="numeric"
                  secureTextEntry={true} // Hide PIN entry
                  id={`pin-input-${index}`}
                  ref={(input) => (inputRefs.current[index] = input)}
                />
              </Input>
            ))}
          </HStack>
        </Box>
        <Button onPress={validatePIN} style={styles.submitButton}>
          <ButtonText>Unlock</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pinInput: {
    borderBottomWidth: 3,
    borderBottomColor: "#333",
    textAlign: "center",
    fontSize: 24,
    height: 60,
    width: 70,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
  },
});

export default EnterPIN;
