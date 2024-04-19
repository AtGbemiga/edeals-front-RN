import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import booleanTokenCheck from "../../lib/booleanTokenCheck";
import { HSProducts } from "./homeScreenProducts";
import { HSServices } from "./homeScreenServices";

/**
 * Check for token, redirect to start page if no token
 * Show default home page if token is present
 */
export const Home = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [content, setContent] = useState(
    <HSProducts navigation={navigation} />
  );
  const [isProductActiveBtn, setIsProductActiveBtn] = useState(true);

  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (!tokenRes) {
      navigation.navigate("Start");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  function handleShowService() {
    setContent(HSServices);
    setIsProductActiveBtn(false);
  }

  function handleShowProduct() {
    setContent(<HSProducts navigation={navigation} />);
    setIsProductActiveBtn(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Notification bell here</Text>
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
});
