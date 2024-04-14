import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export const InlineNotice = ({
  msg,
  color,
  bgColor,
}: {
  msg: string;
  color: string;
  bgColor: string;
}) => {
  const [showMsg, setShowMsg] = useState(msg);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMsg("");
    }, 5000);

    return () => {
      setShowMsg(msg);
      clearTimeout(timeout);
    };
  }, [msg]); // Update the UI whenever the `msg` prop receives any valu
  return (
    <View style={styles.container}>
      {showMsg && (
        <Text
          style={{
            color: color,
            backgroundColor: bgColor,
            padding: 5,
            borderRadius: 5,
          }}
        >
          {msg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: StatusBar.currentHeight || 42,
  },
});
