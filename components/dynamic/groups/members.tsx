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
  OneGroupMember,
  ResGetGroupMembers,
} from "../../../types/groups/resGetMembers";
import getGroupMembersFn from "../../../lib/groups/getMembers";

const screenWidth = Dimensions.get("window").width;

export const GroupMembers = ({ id }: { id: number }) => {
  const [resGroupMembers, setResGroupMembers] = useState<ResGetGroupMembers>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getGroupMembersFn({
          groupID: id,
          setErrMsg,
        });

        if (res && res.result.length > 0) {
          setResGroupMembers(res);
        }
      } catch (error) {
        // Handle error
      }
    })();
  }, [id, setErrMsg]);

  const renderItem = ({ item }: { item: OneGroupMember }) => {
    return (
      <Pressable key={item.id}>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.img }}
            style={styles.image}
          />
          <Text>{item.account_name} </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Text>Groupmembers</Text>
      <FlatList
        data={resGroupMembers?.result}
        renderItem={renderItem}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    padding: 10,
    backgroundColor: "#F6FBFF",
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});
