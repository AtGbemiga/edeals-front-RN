import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import getLInfoFn from "../../lib/global/getLInfo";
import { OneOrder, ResGetOrders } from "../../types/orders/resGetOrders";
import { StaticInlineNotice } from "../global/inlineNotice";
import backIcon from "../../assets/backIcon.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import { formatDate } from "../global/formatTimeDiff";
import { capitalizeFirstLetter } from "../global/capitalize1stLetter";
import { globalStyles } from "../style/global";
import { Picker } from "@react-native-picker/picker";
import addRatingAndReviewFn from "../../lib/products/addRating&Review";
import { showMessage } from "react-native-flash-message";

const OrderItem = ({
  item,
  statusShown,
  review,
  rating,
  setReview,
  setRating,
  hasUserRated,
  handleReviewSubmit,
}: {
  item: OneOrder;
  statusShown: boolean;
  review: string;
  rating: number;
  setReview: (review: string) => void;
  setRating: (rating: number) => void;
  hasUserRated: boolean;
  handleReviewSubmit: ({
    review,
    rating,
    product_id,
  }: {
    review: string;
    rating: number;
    product_id: number;
  }) => Promise<void>;
}) => {
  let statusColor: string;

  if (item.order_status === "unknown") {
    statusColor = "red";
  } else if (item.order_status === "processing") {
    statusColor = "#0000ff";
  } else if (item.order_status === "shipped") {
    statusColor = "#00ff00";
  } else if (item.order_status === "delivered") {
    statusColor = "#00ff00";
  } else {
    statusColor = "red";
  }

  return (
    <View style={styles.orderBox}>
      <View>
        <Image
          source={{ uri: item.first_img }}
          style={styles.img}
        />
      </View>
      <View>
        <Text>{item.name}</Text>
        <Text style={styles.price}>&#8358;{item.price.toLocaleString()}</Text>

        <Text>Order Number: {item.reference_id}</Text>
        <Text>Order Date: {formatDate(item.created_at)}</Text>
        <Text>Customer Name: {item.buyer_name}</Text>
        {statusShown && (
          <Text style={[styles.status, { color: statusColor }]}>
            {capitalizeFirstLetter(item.order_status)}
          </Text>
        )}
        {!hasUserRated && (
          <>
            <Text>Rate this product</Text>
            <View>
              <Picker
                selectedValue={rating}
                onValueChange={(itemValue) => setRating(itemValue)}
              >
                <Picker.Item
                  label="1"
                  value={1}
                />
                <Picker.Item
                  label="2"
                  value={2}
                />
                <Picker.Item
                  label="3"
                  value={3}
                />
                <Picker.Item
                  label="4"
                  value={4}
                />
                <Picker.Item
                  label="5"
                  value={5}
                />
              </Picker>
            </View>
            <View>
              <Text>Write a review</Text>
              <TextInput
                onChangeText={(newText) => {
                  setReview(newText);
                }}
                placeholder="Write a review"
                value={review}
                style={globalStyles.textInput}
              />
            </View>
            <View>
              <Pressable
                onPress={() => {
                  handleReviewSubmit({
                    review,
                    rating,
                    product_id: item.product_id,
                  });
                }}
                style={styles.handleRatingBtn}
              >
                <Text style={styles.handleRatingBtnText}>Submit</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Orders">;

type OrderReview = {
  review: string;
  rating: number;
};

export const Orders = ({ navigation }: Props) => {
  const [resOrders, setResOrders] = useState<ResGetOrders>();
  const [statusShown, setStatusShown] = useState(false);
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    orders: "",
  });
  const [orderReviews, setOrderReviews] = useState<Record<number, OrderReview>>(
    {}
  );
  const [errMsgReviewRatings, setErrMsgReviewRatings] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getLInfoFn({
          identifier: "orders",
          setErrMsg,
        });
        if (res && "ordersRes" in res) {
          setResOrders(res);
        }
      } catch (error) {
        // disable empty object error
      }
    })();
  }, []);

  const setReview = (product_id: number) => (review: string) => {
    setOrderReviews((prev) => ({
      ...prev,
      [product_id]: { ...prev[product_id], review },
    }));
  };

  const setRating = (product_id: number) => (rating: number) => {
    setOrderReviews((prev) => ({
      ...prev,
      [product_id]: { ...prev[product_id], rating },
    }));
  };

  async function handleReviewSubmit({
    review,
    rating,
    product_id,
  }: {
    review: string;
    rating: number;
    product_id: number;
  }) {
    console.log("clicked");

    try {
      const res = await addRatingAndReviewFn({
        product_id,
        review,
        rating,
        setErrMsg: setErrMsgReviewRatings,
      });

      if (res?.message.includes("success")) {
        showMessage({
          message: res.message,
          type: "success",
          autoHide: true,
        });
        setResOrders((prevResOrders) => {
          if (!prevResOrders) return prevResOrders;

          const updatedOrders: OneOrder[] = prevResOrders.ordersRes.map(
            (order) =>
              order.product_id === product_id
                ? { ...order, user_has_rated: 1 }
                : order
          );

          return { ...prevResOrders, ordersRes: updatedOrders };
        });
      } else {
        // Handle error if the submission wasn't successful
        setErrMsgReviewRatings("Failed to submit review. Please try again.");
      }
    } catch (error) {
      // disable empty object error
    }
  }

  return (
    <SafeAreaView style={styles.mainBox}>
      {errMsgReviewRatings && (
        <StaticInlineNotice
          msg={errMsgReviewRatings}
          color="red"
          bgColor="yellow"
        />
      )}
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
      </View>
      {errMsg.orders ? (
        <StaticInlineNotice
          msg={errMsg.orders}
          color="red"
          bgColor="yellow"
        />
      ) : (
        <View>
          <View style={styles.ctaBox}>
            <Pressable
              onPress={() => setStatusShown(false)}
              style={[
                !statusShown ? styles.activeBtn : styles.inactiveBtn,
                styles.ctaBtn,
              ]}
            >
              <Text
                style={[
                  !statusShown ? styles.activeBtnText : styles.inactiveBtnText,
                  styles.ctaBtnText,
                ]}
              >
                Orders
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setStatusShown(true)}
              style={[
                statusShown ? styles.activeBtn : styles.inactiveBtn,
                styles.ctaBtn,
              ]}
            >
              <Text
                style={[
                  statusShown ? styles.activeBtnText : styles.inactiveBtnText,
                  styles.ctaBtnText,
                ]}
              >
                Order Status
              </Text>
            </Pressable>
          </View>

          <>
            <FlatList
              data={resOrders?.ordersRes}
              renderItem={({ item }) => (
                <OrderItem
                  item={item}
                  statusShown={statusShown}
                  review={orderReviews[item.product_id]?.review || ""}
                  rating={orderReviews[item.product_id]?.rating || 1}
                  setReview={setReview(item.product_id)}
                  setRating={setRating(item.product_id)}
                  hasUserRated={item.user_has_rated === 1}
                  handleReviewSubmit={handleReviewSubmit}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              extraData={resOrders}
            />
          </>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
    marginBottom: 100,
  },
  ctaBox: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "center",
  },
  activeBtn: {
    backgroundColor: "#343399",
  },
  inactiveBtn: {
    backgroundColor: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#343399",
  },
  activeBtnText: {
    color: "#F5F5F5",
  },
  inactiveBtnText: {
    color: "#343399",
  },
  ctaBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "40%",
    alignItems: "center",
  },
  ctaBtnText: {
    fontWeight: "600",
  },
  orderBox: {
    backgroundColor: "#f8f8f8",
    marginVertical: 10,
    flexDirection: "row",
    columnGap: 10,
    padding: 10,
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    height: "auto",
  },
  img: {
    width: 100,
    height: 100,
  },
  price: {
    marginBottom: 5,
  },
  status: {
    textAlign: "right",
    fontWeight: "700",
  },
  handleRatingBtn: {
    backgroundColor: "#0000ff",
    width: 100,
    columnGap: 5,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  handleRatingBtnText: {
    color: "#fff",
  },
});
