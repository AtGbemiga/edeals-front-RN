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
  textWhite: {
    color: "#ffffff",
  },
  bellView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  bellIcon: {
    padding: 10,
    borderRadius: 50,
  },
  d4VAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  textRed: {
    color: "#FF0000",
  },
});
