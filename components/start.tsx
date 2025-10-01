import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import Logo from "../assets/icon.png";
import Img from "../assets/icon.png";
import booleanTokenCheck from "../lib/booleanTokenCheck";

export default function Start({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  // check for token
  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (tokenRes) {
      navigation.navigate("HomeRoot");
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
          <Text style={styles.brandName}>
            <Text style={styles.e}>E</Text>-Deals
          </Text>
          <Text style={styles.subContent}>Lets Strke a deal with you</Text>
          <Image source={Img} />
        </ImageBackground>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Screen1")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

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
  e: {
    color: "#59AEFF",
  },
  subContent: {
    color: "#111",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 44,
    textAlign: "center",
  },

  btn: {
    backgroundColor: "#59AEFF",
    borderRadius: 24,
    color: "#ffffff",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 50,
    marginTop: 80,
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
