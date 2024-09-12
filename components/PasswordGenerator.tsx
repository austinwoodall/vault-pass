import { H2, H3 } from "@expo/html-elements";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";

import { CheckIcon, CopyIcon, RefreshCcw } from "lucide-react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "./ui/actionsheet";
import { VStack } from "./ui/vstack";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "./ui/slider";
import { Box } from "./ui/box";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "./ui/checkbox";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { Text } from "./ui/text";

export default function PasswordGenerator(props: any) {
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [values, setValues] = useState([
    "uppercase",
    "lowercase",
    "numbers",
    "symbols",
  ]);

  useEffect(() => {
    generateCustomPassword(length);
  }, []);

  function generateCustomPassword(length: number) {
    const charSets = {
      numbers: "0123456789",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    const getRandomChar = () => {
      const selectedSets = Object.entries(charSets)
        .filter(([key]) => values.includes(key))
        .map(([, chars]) => chars)
        .join("");

      if (selectedSets.length === 0) {
        // If no sets are selected, use all characters
        return getRandomChar();
      }

      const randomIndex = Math.floor(Math.random() * selectedSets.length);
      return selectedSets[randomIndex];
    };

    let password = "";
    while (password.length < length) {
      const char = getRandomChar();
      if (char) {
        password += char;
      }
    }

    setCopied(false);
    setPassword(password);
  }

  async function copyToClipboard() {
    const copiedToClip = await Clipboard.setStringAsync(password);
    if (copiedToClip) {
      setCopied(true);
    } else {
      setCopied(false);
    }
  }

  return (
    <Actionsheet
      isOpen={props.isOpen}
      onOpen={props.handleOpen}
      onClose={props.handleClose}
      snapPoints={[45]}
    >
      <ActionsheetBackdrop onPress={props.handleClose} />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper className="h-3">
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack className="flex-1 gap-0">
          <Box className="flex-1 w-full">
            <Box>
              <H2 className={"text-center"}>Password generator</H2>

              <Input isReadOnly size="lg">
                <InputField
                  onPress={copyToClipboard}
                  className="text-center"
                  value={password}
                />
                <InputSlot>
                  <InputIcon
                    onPress={copyToClipboard}
                    className="self-center mr-2"
                    as={CopyIcon}
                    color="black"
                    size={24}
                  >
                    <CopyIcon className="self-center" color="black" size={20} />
                  </InputIcon>
                </InputSlot>
              </Input>

              <Text className={"text-center"}>
                {copied ? "Copied!" : "Click to copy"}
              </Text>
            </Box>
            <Box className="flex flex-row items-center w-full gap-10">
              <Box className="flex">
                <H3>Length: {length}</H3>
              </Box>
              <Box className="flex-1">
                <Slider
                  onChange={(value) => setLength(value)}
                  defaultValue={16}
                  size="md"
                  orientation="horizontal"
                  isDisabled={false}
                  isReversed={false}
                  minValue={8}
                  maxValue={64}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </Box>
            <Box>
              <CheckboxGroup
                value={values}
                onChange={(keys) => {
                  setValues(keys);
                }}
              >
                <Checkbox size="lg" value="uppercase">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} color="white">
                      <CheckIcon color="white" />
                    </CheckboxIcon>
                  </CheckboxIndicator>
                  <CheckboxLabel>Uppercase</CheckboxLabel>
                </Checkbox>
                <Checkbox size="lg" value="lowercase">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} color="white">
                      <CheckIcon color="white" />
                    </CheckboxIcon>
                  </CheckboxIndicator>
                  <CheckboxLabel>Lowercase</CheckboxLabel>
                </Checkbox>
                <Checkbox size="lg" value="numbers">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} color="white">
                      <CheckIcon color="white" />
                    </CheckboxIcon>
                  </CheckboxIndicator>
                  <CheckboxLabel>Numbers</CheckboxLabel>
                </Checkbox>
                <Checkbox size="lg" value="symbols">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} color="white">
                      <CheckIcon color="white" />
                    </CheckboxIcon>
                  </CheckboxIndicator>
                  <CheckboxLabel>Symbols(@!$)</CheckboxLabel>
                </Checkbox>
              </CheckboxGroup>
            </Box>
          </Box>
          <Button
            onPress={() => generateCustomPassword(length)}
            className={"rounded-full gap-2 mb-4"}
            size="lg"
          >
            <ButtonIcon as={RefreshCcw} color={"white"} size="md">
              <RefreshCcw color={"white"} size={24} />
            </ButtonIcon>
            <ButtonText>Generate Password</ButtonText>
          </Button>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
