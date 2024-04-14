import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import getCartFn from "../../lib/products/getCart";
import { OneCart, ResGetCart } from "../../types/products/resGetCart";
import { CtaBtn } from "../global/ctaBtn";
const cartItem = ({ item }: { item: OneCart }) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Image
          source={{ uri: item.first_img }}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.store}>{item.store_name}</Text>
        <Text>{item.qty}</Text>
        <Text style={styles.price}>&#8358;{item.price.toLocaleString()}</Text>
      </View>
    </View>
  );
};

export const CartItemsFlatList = () => {
  const [resCart, setResCart] = useState<ResGetCart>();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    try {
      getCartFn({
        setErrMsg,
      }).then((res) => {
        res && setResCart(res);
      });
    } catch (error) {}
  }, []);

  const totalCartItems = resCart?.finalResult[1].map((total) => total.total)[0];

  const totalPrice = resCart?.finalResult[0].reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const checkOutPrice = totalPrice ? totalPrice + 600 : 0;

  return (
    <>
      <View>
        <Text style={styles.totalCartItems}>
          {totalCartItems === 1
            ? `${totalCartItems} item`
            : `${totalCartItems} items`}
        </Text>
      </View>
      <View>
        <FlatList
          data={resCart?.finalResult[0]}
          renderItem={cartItem}
          decelerationRate="fast"
          keyExtractor={(item) => item.id.toString()}
          extraData={resCart?.finalResult[0]}
          style={styles.flatListContainer}
        />
      </View>
      <View style={styles.mathContainer}>
        <View style={styles.math}>
          <Text style={styles.mathText}>Subtotal</Text>
          <Text style={styles.mathPrice}>
            &#8358;{totalPrice?.toLocaleString() ?? "N/A"}
          </Text>
        </View>
        <View style={styles.math}>
          <Text style={styles.mathText}>Delivery</Text>
          <Text style={styles.mathPrice}>&#8358;600</Text>
        </View>
        <View style={[styles.math, styles.lastMath]}>
          <Text style={styles.checkOutText}>Total Cost</Text>
          <Text style={styles.checkOutPrice}>
            &#8358;{checkOutPrice?.toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <CtaBtn
          text="Checkout"
          onPressFn={() => {}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "column",
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  itemContainer: {
    flexDirection: "row",
    columnGap: 30,
    rowGap: 30,
    marginVertical: 10,
    borderColor: "red",
    borderWidth: 5,
  },
  totalCartItems: {
    fontSize: 16,
    fontWeight: "500",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  store: {
    fontSize: 14,
    fontWeight: "400",
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  mathContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  math: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mathText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#707B81",
  },
  mathPrice: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#1A2530",
  },
  lastMath: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderLeftColor: "white",
    borderRightColor: "transparent",
    paddingVertical: 10,
    borderTopColor: "black",
    borderBottomColor: "transparent",
  },
  checkOutText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#2B2B2B",
  },
  checkOutPrice: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#59AEFF",
  },
  btnContainer: {
    alignItems: "center",
  },
});
