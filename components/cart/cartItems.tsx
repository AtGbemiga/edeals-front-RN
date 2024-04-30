import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { payStackInitFn } from "../../lib/paystack/paymentInitialization";
import deleteCartFn from "../../lib/products/delete";
import getCartFn from "../../lib/products/getCart";
import updateCartQtyFn from "../../lib/products/updateCartQty";
import { RootStackParamList } from "../../types/global/root";
import { OneCart, ResGetCart } from "../../types/products/resGetCart";
import { CtaBtn } from "../global/ctaBtn";
import { StaticInlineNotice } from "../global/inlineNotice";

const CartItem = ({
  item,
  handleDelete,
  handleQtyUpdate,
}: {
  item: OneCart;
  handleDelete: (itemID: number) => void;
  handleQtyUpdate: (itemID: number, newQty: number) => void;
}) => {
  const [showRightContent, setShowRightContent] = useState(false);
  const [showLeftContent, setShowLeftContent] = useState(false);
  const [qty, setQty] = useState(item.qty);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const leftContent = (
    <View>
      <Pressable
        onPress={() => {
          handleQtyUpdate(item.id, qty + 1);
          setQty(qty + 1);
        }}
      >
        <AntDesign
          name="plus"
          size={24}
          color="#000000"
        />
      </Pressable>
      <Text>{qty}</Text>
      <Pressable
        onPress={() => {
          if (qty <= 1) return;
          handleQtyUpdate(item.id, qty - 1);
          setQty(qty - 1);
        }}
      >
        <AntDesign
          name="minus"
          size={24}
          color="#000000"
        />
      </Pressable>
    </View>
  );

  const rightContent = (
    <Pressable onPress={() => handleDelete(item.id)}>
      <View style={styles.deleteIconBox}>
        <Feather
          name="trash-2"
          size={24}
          color={"#ffffff"}
        />
      </View>
    </Pressable>
  );

  const SWIPE_THRESHOLD = 50;

  // Toggle left and right content on swipe
  const handleSwipe = (gestureEvent: PanGestureHandlerGestureEvent) => {
    const { translationX } = gestureEvent.nativeEvent;
    if (translationX < SWIPE_THRESHOLD) {
      setShowRightContent(true);
      setShowLeftContent(false);
    } else if (translationX > -SWIPE_THRESHOLD) {
      setShowLeftContent(true);
      setShowRightContent(false);
    } else {
      setShowLeftContent(false);
      setShowRightContent(false);
    }
  };

  const containerStyle = {
    width: Dimensions.get("window").width, // Initial full width
    backgroundColor: "white", // Adjust background color
    transform: [
      { translateX: showRightContent ? -SWIPE_THRESHOLD : 0 }, // Translate left on swipe
    ],
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View style={[styles.itemContainer, containerStyle]}>
          {showLeftContent && leftContent}
          <View>
            <Image
              source={{ uri: item.first_img }}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.store}>{item.store_name}</Text>
            <Text style={styles.price}>
              &#8358;{item.price.toLocaleString()}
            </Text>
          </View>

          {showRightContent && rightContent}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;
export const CartItemsFlatList = ({ navigation }: Props) => {
  const [resCart, setResCart] = useState<ResGetCart>();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    try {
      getCartFn({
        setErrMsg,
      }).then((res) => {
        res && setResCart(res);
      });
    } catch (error) {
      // disable empty object error
    }
  }, [resCart]);

  const totalCartItems = resCart?.finalResult[1].map((total) => total.total)[0];

  const totalPrice = resCart?.finalResult[0].reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const checkOutPrice = totalPrice ? totalPrice + 600 : 0;

  async function handleDelete(itemID: number) {
    try {
      const res = await deleteCartFn({
        cart_id: itemID,
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        try {
          getCartFn({
            setErrMsg,
          }).then((res) => {
            res && setResCart(res);
          });
        } catch (error) {
          // disable empty object error
        }
      }
    } catch (error) {
      // disable empty object error
    }
  }

  async function handleQtyUpdate(itemID: number, newQty: number) {
    try {
      const res = await updateCartQtyFn({
        qty: newQty,
        cart_id: itemID,
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        try {
          getCartFn({
            setErrMsg,
          }).then((res) => {
            res && setResCart(res);
          });
        } catch (error) {
          // disable empty object error
        }
      }
    } catch (error) {
      // disable empty object error
    }
  }

  async function handlePayment() {
    const formattedPrice = checkOutPrice * 100;
    const res = await payStackInitFn({
      email: "lG5s5@example.com",
      amount: formattedPrice.toString(),
    });

    if (res) {
      navigation.navigate("PaymentScreen", { res });
      console.log(res.data.authorization_url);
    }
  }

  return (
    <View>
      {errMsg ? (
        <StaticInlineNotice
          msg={errMsg}
          color="white"
          bgColor="red"
        />
      ) : (
        <>
          <View>
            {errMsg && (
              <StaticInlineNotice
                msg={errMsg}
                color="white"
                bgColor="red"
              />
            )}
            <Text style={styles.totalCartItems}>
              {totalCartItems === 1
                ? `${totalCartItems} item`
                : `${totalCartItems} items`}
            </Text>
          </View>
          <View>
            <FlatList
              data={resCart?.finalResult[0]}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  handleDelete={handleDelete}
                  handleQtyUpdate={handleQtyUpdate}
                />
              )}
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
              onPressFn={handlePayment}
            />
          </View>
        </>
      )}
    </View>
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
  deleteIconBox: {
    width: 106,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff0000",
  },
});
