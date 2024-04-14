import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import backIcon from "../../assets/backIcon.png";
import { CartItemsFlatList } from "./cartItems";

type Props = NativeStackScreenProps<ParamListBase>;
export const CartIndex = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 5 }}
            >
              <Image source={backIcon} />
            </Pressable>
            <Text>Bell here</Text>
          </View>
          <View>
            <CartItemsFlatList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  mainView: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
