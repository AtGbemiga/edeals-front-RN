import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import wishListIcon from "../../assets/wishListIcon.png";
import paymentIcon from "../../assets/paymentIcon.png";
import addressIcon from "../../assets/addressIcon.png";
import walletIcon from "../../assets/walletIcon.png";
import groupsIcon from "../../assets/groupsIcon.png";
import messagesIcon from "../../assets/messagesIcon.png";
import logoutIcon from "../../assets/logoutIcon.png";
import expandRightIcon from "../../assets/expandRightIcon.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import logOutFn from "../../lib/users/logOut";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

export const MyLinks = ({
  id,
  acc_type,
  navigation,
}: {
  id: number;
  acc_type: "seller" | "buyer";
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    logout: "",
  });
  async function handleLogOut() {
    console.log("log out");

    try {
      const res = await logOutFn({ setErrMsg });

      if (res && res.message.includes("success")) {
        navigation.navigate("Start");
      }
    } catch (err) {
      // disable empty object error
    }
  }
  return (
    <View style={styles.container}>
      {errMsg.logout && errMsg.logout !== "" && (
        <>
          {showMessage({
            message: errMsg.logout,
            type: "danger",
            hideOnPress: true,
            autoHide: false,
          })}
        </>
      )}
      <View>
        <Pressable
          onPress={() => navigation.navigate("WishList", { id })}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={wishListIcon} />
          <Text style={styles.listText}>My Wish list</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Orders")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={wishListIcon} />
          <Text style={styles.listText}>My Orders</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("EDeals")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={paymentIcon} />
          <Text style={styles.listText}>E-deals</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View>
      {/* <View>
        <Pressable
          onPress={() => console.log(id, acc_type)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={addressIcon} />
          <Text style={styles.listText}>Address</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View> */}
      {/* <View>
        <Pressable
          onPress={() => console.log(id, acc_type)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={walletIcon} />
          <Text style={styles.listText}>My Wallet</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View> */}
      <View>
        <Pressable
          onPress={() => navigation.navigate("GroupsIndex")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={groupsIcon} />
          <Text style={styles.listText}>Groups</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View>

      {/* <View>
        <Pressable
          onPress={() => console.log(id, acc_type)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={messagesIcon} />
          <Text style={styles.listText}>Messages</Text>
          <Image source={expandRightIcon} />
        </Pressable>
      </View> */}
      {acc_type === "seller" && (
        <>
          <View>
            <Pressable
              onPress={() => console.log(id, acc_type)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#909090" : "#cecece",
                },
                styles.pressable,
              ]}
            >
              <Image source={wishListIcon} />
              <Text style={styles.listText}>Feedback</Text>
              <Image source={expandRightIcon} />
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => console.log(id, acc_type)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#909090" : "#cecece",
                },
                styles.pressable,
              ]}
            >
              <Image source={paymentIcon} />
              <Text style={styles.listText}>Accounting For sales</Text>
              <Image source={expandRightIcon} />
            </Pressable>
          </View>
        </>
      )}
      <View>
        <Pressable
          onPress={handleLogOut}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#cecece",
            },
            styles.pressable,
          ]}
        >
          <Image source={logoutIcon} />
          <Text style={styles.listText}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    rowGap: 10,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderRadius: 10,
    padding: 10,
  },
  listText: { marginRight: "auto" },
});
