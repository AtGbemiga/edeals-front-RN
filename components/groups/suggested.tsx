import { ParamListBase, useNavigation } from "@react-navigation/native";
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
import getLInfoFn from "../../lib/global/getLInfo";
import { OneGroup, ResGetGroups } from "../../types/groups/resGetGroups";
import { StaticInlineNotice } from "../global/inlineNotice";

const screenWidth = Dimensions.get("window").width;

export const SuggestedGroups = () => {
  const navigation =
    useNavigation<NativeStackScreenProps<ParamListBase>["navigation"]>();
  const [resGroups, setResGroups] = useState<ResGetGroups>();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "groups",
          setErrMsg,
        })) as ResGetGroups;

        if (res && res.result.length > 0) {
          setResGroups(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

  const renderItem = ({ item }: { item: OneGroup }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("GroupFullInfo", { id: item.id })}
        key={item.id}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.logo }}
            style={styles.image}
          />
          <Text>{item.name} </Text>
          <Text>{item.member_total}</Text>
          <Text>{item.total_post_last_24_hrs}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Text>Groups you may like</Text>
      {errMsg ? (
        <View>
          <StaticInlineNotice
            msg={errMsg}
            color="red"
            bgColor="red"
          />
        </View>
      ) : (
        <View style={{ borderWidth: 5, borderColor: "blue" }}>
          <FlatList
            data={resGroups?.result}
            renderItem={renderItem}
            snapToInterval={screenWidth}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //   flatListContainer: {
  //     paddingHorizontal: 10,
  //   },

  image: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
  itemContainer: {
    flexDirection: "column",
    rowGap: 10,
    marginHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    columnGap: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "70%",
  },
  searchBtn: {
    backgroundColor: "#59AEFF",
    borderRadius: 24,
    color: "#ffffff",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    width: "25%",
  },
  searchBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
  },
});
