import { useEffect, useState } from "react";
import getLInfoFn from "../../../lib/global/getLInfo";
import {
  OneSimilarProduct,
  ResSimilarProducts,
} from "../../../types/products/resProducts";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { FadeInlineNotice } from "../../global/inlineNotice";

export const SimilarProducts = ({
  subIdentifier,
  navigation,
}: {
  subIdentifier: string;
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [resSimilarProducts, setResSimilarProducts] =
    useState<ResSimilarProducts>();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    console.log({ subIdentifier });

    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "similarProducts",
          subIdentifier,
          setErrMsg,
        })) as ResSimilarProducts;
        setResSimilarProducts(res);
      })();
    } catch (error) {
      // disable empty object error
    }
  }, []);

  // make me clickable
  const oneSimilarProduct = ({ item }: { item: OneSimilarProduct }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("Dynamic Product", { id: item.id })}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.first_img }}
            style={styles.image}
          />
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>&#8358;{item.price.toLocaleString()}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      {errMsg ? (
        <FadeInlineNotice
          msg={errMsg}
          bgColor="blue"
          color="white"
        />
      ) : (
        <FlatList
          data={resSimilarProducts?.result}
          renderItem={oneSimilarProduct}
          keyExtractor={(item) => item.id.toString()}
          extraData={resSimilarProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "column",
    columnGap: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#F8F8F8",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
