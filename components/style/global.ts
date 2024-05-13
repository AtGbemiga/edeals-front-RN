import { StatusBar, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: "column",
    rowGap: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "600",
  },
  errText: {
    color: "#FF0000",
  },
});
