import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../../../types/global/root";
import { useEffect, useState } from "react";
import {
  OneProductLInfo,
  ResProductsLInfo,
} from "../../../types/products/resProducts";
import getLInfoFn from "../../../lib/global/getLInfo";

const screenWidth = Dimensions.get("window").width;
type Props = NativeStackScreenProps<RootStackParamList, "WishList">;
export const WishListIndex = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [resProducts, setResProducts] = useState<ResProductsLInfo>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "wishList",
          subIdentifier: id.toString(),
          setErrMsg,
        })) as ResProductsLInfo;

        if (res && res.result.length > 0) {
          setResProducts(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

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
    <SafeAreaView style={styles.container}>
      <View style={{ borderWidth: 5, borderColor: "blue" }}>
        <FlatList
          data={resProducts?.result}
          renderItem={renderItem}
          snapToInterval={screenWidth} // Width of each item
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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
