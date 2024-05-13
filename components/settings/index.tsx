import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../../types/global/root";
import { globalStyles } from "../style/global";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SettingsIndex">;
};
export const SettingsIndex = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={[globalStyles.mainBox, styles.mainBox]}>
      <View style={styles.card}>
        <Pressable
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <View>
            <Text>Change Password</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: "#f8f8f8",
  },
  card: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
  },
});
