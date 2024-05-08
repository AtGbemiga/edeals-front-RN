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
import { UploadProduct } from "./uploadProduct";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import { UploadService } from "./uploadService";
import booleanTokenCheck from "../../lib/booleanTokenCheck";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sell">;
};
export const SellIndex = ({ navigation }: Props) => {
  const [content, setContent] = useState(<UploadProduct />);

  const [showUploadProduct, setShowUploadProduct] = useState(true);

  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (!tokenRes) {
      navigation.navigate("Start");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // handleShowUService === handleShowUploadService. Etc.
  function handleShowUService() {
    setContent(<UploadService navigation={navigation} />);
    setShowUploadProduct(false);
  }

  function handleShowUProduct() {
    setContent(<UploadProduct />);
    setShowUploadProduct(true);
  }

  return (
    <SafeAreaView style={styles.mainBox}>
      <ScrollView>
        <View style={styles.toogleBtnBox}>
          <Pressable
            onPress={handleShowUProduct}
            style={[
              styles.toogleBtn,

              showUploadProduct ? styles.activeToggleBtn : null,
            ]}
          >
            <Text style={showUploadProduct ? styles.activeToggleBtnText : null}>
              Product
            </Text>
          </Pressable>
          <Pressable
            onPress={handleShowUService}
            style={[
              styles.toogleBtn,

              !showUploadProduct ? styles.activeToggleBtn : null,
            ]}
          >
            <Text
              style={!showUploadProduct ? styles.activeToggleBtnText : null}
            >
              Service
            </Text>
          </Pressable>
        </View>
        <>{content}</>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  toogleBtnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toogleBtn: {
    borderWidth: 1,
    borderColor: "#59AEFF",
    width: "48%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  activeToggleBtn: {
    backgroundColor: "#59AEFF",
  },
  activeToggleBtnText: {
    color: "#F5F5F5",
  },
});
