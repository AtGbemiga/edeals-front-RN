import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import booleanTokenCheck from "../../lib/booleanTokenCheck";
export const AccountType = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
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
      <View style={styles.topView}>
        <Text style={styles.brandName}>
          <Text style={styles.e}>E</Text>-Deals
        </Text>
        <Text style={styles.subContent}>
          Browse up to 30 000+ Products and services suggestions close to your
          location.
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("Log In/Sign Up", { screen: "seller" })
          }
          style={styles.btn}
        >
          <Text style={styles.btnText}>I want to Sell</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Log In/Sign Up", { screen: "buyer" })
          }
          style={styles.btn}
        >
          <Text style={styles.btnText}>I want to Buy</Text>
        </Pressable>
      </View>
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
  topView: {
    marginBottom: 300,
  },
  brandName: {
    color: "#111",
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
    width: 275,
    color: "#4F4F4F",
    textAlign: "center",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
  },
  btnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 343,
    gap: 20,
  },
  btn: {
    width: 343,
    height: 38,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#59AEFF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#59AEFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
  },
});
