import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../../assets/icon.png";
import Img from "../../assets/icon.png";
import ChevronLeft from "../../assets/icon.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import booleanTokenCheck from "../../lib/booleanTokenCheck";
export const Screen1 = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (tokenRes) {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          source={Logo}
          style={styles.bgImg}
        >
          <Image source={Img} />
        </ImageBackground>
      </View>
      <Text style={styles.subContent}>
        Ad dolorem dolore doloribus ea quisquam reiciendis, nostrum eaque
        fugiat.
      </Text>
      <View style={styles.btnContainer}>
        <Pressable
          onPress={() => navigation.navigate("Select Account Type")}
          style={styles.skipBtn}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Screen2")}
          style={styles.nextBtn}
        >
          <Text style={styles.nextBtnText}>Next</Text>
          <Image
            source={ChevronLeft}
            style={styles.btnIcon}
          />
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImg: {
    width: 300,
    height: 300,
    alignItems: "center",
  },
  brandName: {
    color: "#111",
    // fontFamily: '"Inter_700Bold"', // needs compatible react native font
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 44,
    textAlign: "center",
  },
  subContent: {
    padding: 30,
    textAlign: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 150,
  },
  skipBtn: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 23,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  skipBtnText: {
    color: "#59AEFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 44,
  },
  nextBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nextBtnText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 44,
    letterSpacing: 0.32,
  },
  btnIcon: {
    backgroundColor: "#59AEFF",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: 10,
    height: 10,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 44,
    textAlign: "center",
  },
});
