import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import backIcon from "../../assets/icon.png";
import blackListIcon from "../../assets/icon.png";
import privacyIcon from "../../assets/icon.png";
import settingsIcon from "../../assets/icon.png";
import supportIcon from "../../assets/icon.png";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackScreenProps<RootStackParamList>;

export const More = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ padding: 5 }}
          >
            <Image source={backIcon} />
          </Pressable>
        </View>
        <View style={styles.body}>
          <Pressable
            onPress={() => {
              navigation.navigate("SettingsIndex");
            }}
          >
            <View style={styles.itemBox}>
              <Image source={settingsIcon} />
              <Text>Settings</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {}}>
            <View style={styles.itemBox}>
              <Image source={blackListIcon} />
              <Text>Blacklist</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {}}>
            <View style={styles.itemBox}>
              <Image source={supportIcon} />
              <Text>Health and Support</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Privacy");
            }}
          >
            <View style={styles.itemBox}>
              <Image source={privacyIcon} />
              <Text>Privacy Policy</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("UploadNews");
            }}
          >
            <View style={styles.itemBox}>
              <Image source={privacyIcon} />
              <Text>Add News</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  mainView: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  body: {
    flexDirection: "column",
    rowGap: 10,
  },
  itemBox: {
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 5,
  },
});
