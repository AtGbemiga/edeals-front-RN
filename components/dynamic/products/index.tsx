import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import backIcon from "../../../assets/backIcon.png";
import addToCartFn from "../../../lib/products/addToCart";
import getFInfoFn from "../../../lib/products/getFInfo";
import { RootStackParamList } from "../../../types/global/root";
import { ResProductFInfo } from "../../../types/products/resProducts";
import { CtaBtn } from "../../global/ctaBtn";
import { FadeInlineNotice } from "../../global/inlineNotice";
import { ReviewsFlatList } from "../../global/reviews";
import { SimilarProducts } from "./similarProducts";
import { Res4ProductReviews } from "../../../types/products/resReviews";
import getReviewsFn from "../../../lib/global/getReviews";
import { AntDesign } from "@expo/vector-icons";
import addToWishListFn from "../../../lib/products/addToWishList";
import deleteFromWishListFn from "../../../lib/products/deleteFromWishList";
import StarRatings from "../../global/starRatings";
import { BellIcon } from "../../edeals/notice";

type Props = NativeStackScreenProps<RootStackParamList, "Dynamic Product">;
const screenWidth = Dimensions.get("window").width;

// TODO: handle if no token
// Add check to ensure qty, colour and size are not set when adding to cart
export const DynamicProduct = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [resFProduct, setResFProduct] = useState<ResProductFInfo>();

  const [errMsg, setErrMsg] = useState("");
  const productId = id;
  const [qty, setQty] = useState("Qty");
  const [personalized_price, setPersonalized_price] = useState("");
  const [colour, setColour] = useState("Colour");
  const [size, setSize] = useState("Size");

  const [inlineMsg, setinlineMsg] = useState("");
  const [images, setImages] = useState<string[] | undefined>([]);
  const [ratings, setRatings] = useState<string | undefined>("");
  const [isWishListed, setisWishListed] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [wishListID, setWishListID] = useState<number | undefined>(0);

  // review state
  const [resReviews, setResReviews] = useState<Res4ProductReviews>();

  useEffect(() => {
    if (scrollViewRef.current && !isMounted) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      setIsMounted(true);
    }
    (async () => {
      let resWishList: number | undefined;
      let wishListID: number | undefined;
      const res = await getFInfoFn({ product_id: id.toString(), setErrMsg });
      setResFProduct(res);

      setImages(resFProduct?.result[0].imgs);
      setRatings(resFProduct?.result[0].rating);
      if (res && res.result.length > 0) {
        resWishList = res?.result.find(
          (user) => user.user_has_wishlisted
        )?.user_has_wishlisted;

        wishListID = res?.result.find((user) => user.wishlist_id)?.wishlist_id;
      }
      setWishListID(wishListID);
      setisWishListed(resWishList ? 1 : 0);

      if (resFProduct && resFProduct.result.length > 0) {
        setPersonalized_price(resFProduct.result[0].price.toString());

        // get the reviews
        (async () => {
          const res = await getReviewsFn({
            identifier: "products",
            product_id: id.toString(),
            setErrMsg,
          });
          setResReviews(res);
        })();
      }
    })();
  }, [id, resFProduct, isMounted, route.params]);

  if (resFProduct === undefined) {
    return (
      <SafeAreaView>
        <Text>{errMsg}</Text>
      </SafeAreaView>
    );
  }

  // TODO: Add check for qty, colour and size
  const handleAddToCart = async () => {
    // check if resFProduct is not undefined
    if (resFProduct === undefined) {
      throw new Error("resFProduct is undefined");
    }
    try {
      const res = await addToCartFn({
        product_id: productId.toString(),
        qty,
        personalized_price,
        colour,
        size,
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        setinlineMsg(res.message);
      }
    } catch (error) {
      // disable empty object error
    }
  };

  const handleAddToWishList = async () => {
    try {
      const res = await addToWishListFn({ productID: id, setErrMsg });
      if (res?.message.includes("success")) {
        setSuccessMsg(res.message);
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
        setSuccessMsg(res.message);
        setisWishListed(0);
      }
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {successMsg && <Text>{successMsg}</Text>}
          <View>
            {inlineMsg && (
              <FadeInlineNotice
                msg={inlineMsg}
                color="#ffffff"
                bgColor="#59AEFF"
              />
            )}
          </View>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 5 }}
            >
              <Image source={backIcon} />
            </Pressable>
            <>
              <BellIcon navigation={navigation} />
            </>
          </View>
          <View>
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={screenWidth} // Width of each item
              decelerationRate="fast"
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
          <View style={styles.optionsArea}>
            <View style={styles.options}>
              <Picker
                selectedValue={size}
                onValueChange={(itemValue) => {
                  setSize(itemValue);
                }}
              >
                <Picker.Item
                  label="Size"
                  value="size"
                  enabled={false}
                />
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.s === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="sdf"
                          value="s"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.m === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="m"
                          value="m"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.l === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="l"
                          value="l"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.xl === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="xl"
                          value="xl"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.xxl === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="xxl"
                          value="xxl"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.x3l === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="x3l"
                          value="x3l"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
              </Picker>
            </View>
            <View style={styles.options}>
              <Picker
                selectedValue={colour}
                onValueChange={(itemValue) => {
                  setColour(itemValue);
                }}
              >
                <Picker.Item
                  label="Colour"
                  value=""
                  enabled={false}
                />
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.blue === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="blue"
                          value="blue"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.black === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="black"
                          value="black"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.brown === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="brown"
                          value="brown"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.green === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="green"
                          value="green"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.orange === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="orange"
                          value="orange"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.purple === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="purple"
                          value="purple"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.red === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="red"
                          value="red"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.white === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="white"
                          value="white"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
                {resFProduct.result.map((item) =>
                  item.colors.map((color) => {
                    if (color.yellow === "1") {
                      return (
                        <Picker.Item
                          key={color.colors_id.toString()}
                          label="yellow"
                          value="yellow"
                        />
                      );
                    }
                    return null; // Skip rendering if size.s !== "1"
                  })
                )}
              </Picker>
            </View>
            <View style={styles.options}>
              <Picker
                selectedValue={qty}
                onValueChange={(itemValue) => setQty(itemValue)}
              >
                <Picker.Item
                  label="Qty"
                  value=""
                  enabled={false}
                />
                <Picker.Item
                  label="1"
                  value="1"
                />
                <Picker.Item
                  label="2"
                  value="2"
                />
                <Picker.Item
                  label="3"
                  value="3"
                />
                <Picker.Item
                  label="4"
                  value="4"
                />
                <Picker.Item
                  label="5"
                  value="5"
                />
                <Picker.Item
                  label="6"
                  value="6"
                />
                <Picker.Item
                  label="7"
                  value="7"
                />
                <Picker.Item
                  label="8"
                  value="8"
                />
                <Picker.Item
                  label="9"
                  value="9"
                />
                <Picker.Item
                  label="10"
                  value="10"
                />
              </Picker>
            </View>
            <View>
              {isWishListed === 0 ? (
                <Pressable onPress={() => handleAddToWishList()}>
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
          </View>
          <View style={styles.details}>
            <View>
              <Text style={styles.boldText}>
                {resFProduct.result.map((item) => item.name)}
              </Text>
              <Text>{resFProduct.result.map((item) => item.sub_heading)}</Text>
              <View style={styles.ratingsBox}>
                {ratings && (
                  <StarRatings
                    ratings={ratings}
                    size={24}
                  />
                )}
                <Text>
                  ({resFProduct.result.map((item) => item.ratings_count)})
                </Text>
              </View>
            </View>
            <View>
              {resFProduct.result.map((item) => Number(item.discount) === 0) ? (
                <Text style={styles.boldText}>
                  &#8358;
                  {resFProduct.result.map((item) =>
                    Number(item.discount_price).toLocaleString()
                  )}
                </Text>
              ) : (
                <Text style={styles.boldText}>
                  &#8358;
                  {resFProduct.result.map((item) =>
                    item.price.toLocaleString()
                  )}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Text>{resFProduct.result.map((item) => item.description)}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <CtaBtn
              text="ADD TO CART"
              onPressFn={() => handleAddToCart()}
            />
          </View>
          <View>
            <ReviewsFlatList
              data={resReviews as Res4ProductReviews}
              errMsg={errMsg}
            />
          </View>
          <View>
            <SimilarProducts
              subIdentifier="fashion"
              navigation={navigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 10,
    // flex: 1,
    flexDirection: "column",
    rowGap: 10,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: screenWidth,
    height: 200,
    resizeMode: "stretch",
  },
  optionsArea: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
  options: {
    borderColor: "black",
    borderWidth: 1,
    width: "47%",
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
  boldText: {
    fontWeight: "700",
    fontSize: 16,
  },
  ratingsBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    textAlign: "center",
  },
});
