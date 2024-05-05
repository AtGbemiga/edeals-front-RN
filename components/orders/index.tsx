import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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

const OrderItem = ({
  item,
  statusShown,
}: {
  item: OneOrder;
  statusShown: boolean;
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
      <View style={{ borderColor: "red", borderWidth: 1, minWidth: "62%" }}>
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
      </View>
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Orders">;

export const Orders = ({ navigation }: Props) => {
  const [resOrders, setResOrders] = useState<ResGetOrders>();
  const [statusShown, setStatusShown] = useState(false);
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    orders: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getLInfoFn({
          identifier: "orders",
          setErrMsg,
        });
        res && "ordersRes" in res && setResOrders(res);
      } catch (error) {
        // disable empty object error
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.mainBox}>
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
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
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
});
