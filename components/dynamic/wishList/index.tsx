import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
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
import getLInfoFn from "../../../lib/global/getLInfo";
import { RootStackParamList } from "../../../types/global/root";
import {
  OneProductLInfo,
  ResWishListLInfo,
} from "../../../types/products/resProducts";
import { StaticInlineNotice } from "../../global/inlineNotice";

const screenWidth = Dimensions.get("window").width;
type Props = NativeStackScreenProps<RootStackParamList, "WishList">;
export const WishListIndex = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [resProducts, setResProducts] = useState<ResWishListLInfo>();
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    wishList: "",
  });

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "wishList",
          subIdentifier: id.toString(),
          setErrMsg,
        })) as ResWishListLInfo;

        if (res && "wishListRes" in res && res.wishListRes.length > 0) {
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
      <View>
        {errMsg.wishList ? (
          <StaticInlineNotice
            msg={errMsg.wishList}
            bgColor="red"
            color="white"
          />
        ) : (
          <FlatList
            data={resProducts?.wishListRes}
            renderItem={renderItem}
            snapToInterval={screenWidth} // Width of each item
            decelerationRate="fast"
            contentContainerStyle={styles.flatListContainer}
          />
        )}
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
