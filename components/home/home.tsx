import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import booleanTokenCheck from "../../lib/booleanTokenCheck";
import { RootStackParamList } from "../../types/global/root";
import { HSProducts } from "./homeScreenProducts";
import { HSServices } from "./homeScreenServices";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../style/global";
import getNoticeByUserIdFn from "../../lib/edeals/getNoticeByUserId";
import { ResNoticeByUserId } from "../../types/edeals/resNoticeByUserId";

export interface HomeErrs {
  getNotice: string;
}

export const Home = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const [content, setContent] = useState(
    <HSProducts navigation={navigation} />
  );
  const [isProductActiveBtn, setIsProductActiveBtn] = useState(true);
  const [errMsg, setErrMsg] = useState<HomeErrs>({
    getNotice: "",
  });
  const [noticeCount, setNoticeCount] = useState<ResNoticeByUserId>({
    result: [],
  });

  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (!tokenRes) {
      navigation.navigate("Start");
      return;
    }
  };

  useEffect(() => {
    checkToken();

    (async () => {
      const res = await getNoticeByUserIdFn({
        setErrMsg,
      });

      if (res) {
        setNoticeCount(res);
      }
    })();
  }, []);

  function handleShowService() {
    setContent(<HSServices navigation={navigation} />);
    setIsProductActiveBtn(false);
  }

  function handleShowProduct() {
    setContent(<HSProducts navigation={navigation} />);
    setIsProductActiveBtn(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={globalStyles.bellView}>
          <Pressable
            onPress={() => {
              console.log("clikced");
              navigation.navigate("EDeals");
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "skyblue" : "white",
              },

              globalStyles.bellIcon,
            ]}
          >
            {noticeCount.result[0] && noticeCount.result[0].unread === 0 ? (
              <Feather
                name="bell"
                size={24}
                color="black"
              />
            ) : (
              <MaterialCommunityIcons
                name="bell-plus"
                size={24}
                color="red"
              />
            )}
          </Pressable>
        </View>
        <View style={styles.toogleBtnArea}>
          <Pressable
            onPress={handleShowProduct}
            style={[
              styles.toogleBtn,

              isProductActiveBtn ? styles.activeToggleBtn : null,
            ]}
          >
            <Text
              style={isProductActiveBtn ? styles.activeToggleBtnText : null}
            >
              Products
            </Text>
          </Pressable>
          <Pressable
            onPress={handleShowService}
            style={[
              styles.toogleBtn,

              !isProductActiveBtn ? styles.activeToggleBtn : null,
            ]}
          >
            <Text
              style={!isProductActiveBtn ? styles.activeToggleBtnText : null}
            >
              Services
            </Text>
          </Pressable>
        </View>
        <View>{content}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: StatusBar.currentHeight || 0,
  },
  toogleBtnArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toogleBtn: {
    borderWidth: 1,
    borderColor: "#59AEFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  activeToggleBtn: {
    backgroundColor: "#59AEFF",
  },
  activeToggleBtnText: {
    color: "#F5F5F5",
  },
  bellView: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  bellIcon: {
    padding: 10,
    borderRadius: 50,
  },
});
