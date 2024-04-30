// takes a function to call onPress and the text for <Text />

import { Dimensions, Pressable, StyleSheet, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const CtaBtn = ({
  onPressFn,
  text,
}: {
  onPressFn: () => void;
  text: string;
}) => {
  return (
    <Pressable
      onPress={onPressFn}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#909090" : "#59AEFF",
        },
        styles.container,
      ]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    color: "#ffffff",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 50,
    width: screenWidth / 1.2,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    paddingVertical: 10,
    textAlign: "center",
  },
});
