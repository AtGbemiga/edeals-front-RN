import { AntDesign } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import addToWishListFn from "../../lib/products/addToWishList";
import deleteFromWishListFn from "../../lib/products/deleteFromWishList";
import {
  OneProductLInfo,
  ResProductsLInfo,
} from "../../types/products/resProducts";
import StarRatings from "./starRatings";
import { FadeInlineNotice } from "./inlineNotice";

const screenWidth = Dimensions.get("window").width;

// Render individual items
const RenderItem = ({
  item,
  navigation,
}: {
  item: OneProductLInfo;
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [isWishListed, setisWishListed] = useState<number>(
    item.user_has_wishlisted ? 1 : 0
  );
  const [wishListID] = useState<number | null>(item.wishlist_id ?? null);
  const [errMsg, setErrMsg] = useState("");

  const handleAddToWishList = async ({
    productID,
    e,
  }: {
    productID: number;
    e: GestureResponderEvent;
  }) => {
    e.stopPropagation();
    try {
      const res = await addToWishListFn({ productID, setErrMsg });
      if (res?.message.includes("success")) {
        setisWishListed(1);
      }
    } catch (error) {
      // disable empty object error
    }
  };

  const handleDeleteFromWishList = async () => {
    if (!wishListID) return;
    try {
      const res = await deleteFromWishListFn({
        wishlistItemId: wishListID,
        setErrMsg,
      });
      if (res?.message.includes("success")) {
        setisWishListed(0);
      }
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("Dynamic Product", { id: item.id })}
    >
      <View style={styles.itemContainer}>
        {Number(item.discount) > 0 && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        )}
        <View style={styles.wishlistBox}>
          {isWishListed === 0 ? (
            <Pressable
              onPress={(e) => handleAddToWishList({ productID: item.id, e })}
            >
              <AntDesign
                name="hearto"
                size={24}
                color="#000000"
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleDeleteFromWishList()}>
              <AntDesign
                name="heart"
                size={24}
                color="#ff0000"
              />
            </Pressable>
          )}
        </View>
        <Image
          source={{ uri: item.first_img }}
          style={styles.image}
        />
        {item.ratings_count > 0 ? (
          <View style={styles.ratingsBox}>
            <StarRatings
              ratings={item.rating}
              size={15}
            />

            <Text>({item.ratings_count})</Text>
          </View>
        ) : (
          <Text>No Ratings</Text>
        )}
        <Text>{item.sub_heading}</Text>
        <Text style={styles.boldText}>{item.name}</Text>
        <View style={styles.priceBox}>
          <Text style={item.discount ? styles.standardPrice : null}>
            &#8358;{item.price.toLocaleString()}
          </Text>
          {Number(item.discount) > 0 && (
            <Text style={styles.discountPrice}>
              &#8358;{Number(item.discount_price).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      {errMsg && (
        <FadeInlineNotice
          msg={errMsg}
          bgColor="#ff0000"
          color="#ffffff"
        />
      )}
    </Pressable>
  );
};

export const CardLInfo = ({
  resProducts,
  navigation,
}: {
  resProducts: ResProductsLInfo;
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  return (
    <View style={{ borderWidth: 5, borderColor: "blue" }}>
      <FlatList
        data={resProducts?.result}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            navigation={navigation}
          />
        )}
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
    position: "relative",
  },
  ratingsBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "700",
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    textAlign: "center",
  },
  standardPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },
  discountPrice: {
    color: "#fc4c4c",
    fontWeight: "500",
  },
  discountTag: {
    backgroundColor: "#db3022",
    color: "#ffffff",
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  discountText: {
    fontWeight: "500",
    color: "#ffffff",
  },
  wishlistBox: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 60,
    right: 10,
    zIndex: 10,
  },
});
