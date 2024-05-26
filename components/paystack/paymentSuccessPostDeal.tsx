import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackScreenProps<RootStackParamList, "PostDealSuccess">;
export const PostDealSuccess = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.mainBox}>
      <View style={styles.subBox}>
        <Text>Payment Successful</Text>
        <Text>Thanks for using E-Deals</Text>

        <Pressable onPress={() => navigation.navigate("EDeals")}>
          <Text>Return to E-Deals</Text>
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
