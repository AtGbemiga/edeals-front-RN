import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
}

export function DemoButton({
  onPress,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "skyblue" : "steelblue",
        },
      ]}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}
