import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackScreenProps<RootStackParamList, "Thanks">;
export const Thanks = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.mainBox}>
      <View style={styles.subBox}>
        <Text>Payment Successful</Text>
        <Text>Thanks for shopping with us</Text>

        <Pressable onPress={() => navigation.navigate("Orders")}>
          <Text>See Orders</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 10,
  },
  subBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
});
