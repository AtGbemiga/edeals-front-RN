import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import getLInfoFn, { getLInfoFnProps } from "../../lib/products/getLInfo";
import {
  OneProductLInfo,
  ResProductsLInfo,
} from "../../types/products/resProducts";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const screenWidth = Dimensions.get("window").width;

export const CardLInfo = ({
  identifierValue,
  discountValue,
  navigation,
}: getLInfoFnProps & {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [resProducts, setResProducts] = useState<ResProductsLInfo>();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: identifierValue,
          discountIdentifier: discountValue ?? undefined,
          setErrMsg,
        })) as ResProductsLInfo;

        if (res && res.result.length > 0) {
          setResProducts(res);
        }
      })();
    } catch (error) {}
  }, []);

  // Render individual items
  const renderItem = ({ item }: { item: OneProductLInfo }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("Dynamic Product", { id: item.id })}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.first_img }}
            style={styles.image}
          />
          <Text>{item.rating} </Text>
          <Text>{item.ratings_count}</Text>
          <Text>{item.sub_heading}</Text>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
          <Text>{item.discount}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ borderWidth: 5, borderColor: "blue" }}>
      <FlatList
        data={resProducts?.result}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth} // Width of each item
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  itemContainer: {
    flexDirection: "column",
    columnGap: 10,
    marginHorizontal: 10,
  },
});
