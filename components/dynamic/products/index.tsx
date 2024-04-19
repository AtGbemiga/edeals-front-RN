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

type Props = NativeStackScreenProps<RootStackParamList, "Dynamic Product">;
const screenWidth = Dimensions.get("window").width;

// TODO: handle if no token
export const DynamicProduct = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [resFProduct, setResFProduct] = useState<ResProductFInfo>();

  const [errMsg, setErrMsg] = useState("");
  const productId = id;
  const [qty, setQty] = useState("1");
  const [personalized_price, setPersonalized_price] = useState("");
  const [colour, setColour] = useState("blue");
  const [size, setSize] = useState("s");

  const [inlineMsg, setinlineMsg] = useState("");

  // review state
  const [resReviews, setResReviews] = useState<Res4ProductReviews>();

  useEffect(() => {
    if (scrollViewRef.current && !isMounted) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      setIsMounted(true);
    }
    (async () => {
      const res = await getFInfoFn({ product_id: id.toString(), setErrMsg });
      setResFProduct(res);

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

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
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
            <Text>Bell here</Text>
          </View>
          <View>
            <FlatList
              data={resFProduct.result}
              renderItem={({ item }) => (
                <View>
                  <Image
                    key={item.imgs[0]} // Add a unique key for each image
                    source={{ uri: item.imgs[0] }}
                    style={styles.image}
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={screenWidth} // Width of each item
              decelerationRate="fast"
              contentContainerStyle={styles.flatListContainer}
            />
          </View>
          {/* TODO: Make the view below flex row . style={styles.optionsArea}*/}
          <View>
            <View>
              <Picker
                selectedValue={size}
                onValueChange={(itemValue) => {
                  setSize(itemValue);
                }}
              >
                {resFProduct.result.map((item) =>
                  item.sizes.map((size) => {
                    if (size.s === "1") {
                      return (
                        <Picker.Item
                          key={size.sizes_id.toString()}
                          label="s"
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
            <View>
              <Picker
                selectedValue={colour}
                onValueChange={(itemValue) => {
                  setColour(itemValue);
                }}
              >
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
            <View>
              <Picker
                selectedValue={qty}
                onValueChange={(itemValue) => setQty(itemValue)}
              >
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
          </View>
          <View>
            <View>
              <Text>{resFProduct.result.map((item) => item.name)}</Text>
              <Text>{resFProduct.result.map((item) => item.sub_heading)}</Text>
              <Text>
                {resFProduct.result.map((item) => item.rating)} (
                {resFProduct.result.map((item) => item.ratings_count)})
              </Text>
            </View>
            <View>
              <Text>{resFProduct.result.map((item) => item.price)}</Text>
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
            <ReviewsFlatList data={resReviews as Res4ProductReviews} />
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
    paddingTop: StatusBar.currentHeight || 42,
    flex: 1,
    flexDirection: "column",
    rowGap: 50,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  // optionsArea: {
  //   display: "flex",
  //   flexDirection: "row",
  //   // columnGap: 10,
  //   borderColor: "red",
  // },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
