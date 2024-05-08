import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
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
import getLInfoFn from "../../../lib/global/getLInfo";
import { RootStackParamList } from "../../../types/global/root";
import { OneGroup, ResGetGroups } from "../../../types/groups/resGetGroups";
import { ResGroupSearch } from "../../../types/groups/resGroupSearch";
import globalSearchFn from "../../../lib/global/search";
import backIcon from "../../../assets/backIcon.png";
import { StaticInlineNotice } from "../../global/inlineNotice";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
type Props = NativeStackScreenProps<RootStackParamList, "GroupsIndex">;

const RenderItem = ({
  item,
  navigation,
}: {
  item: OneGroup;
  navigation: Props["navigation"];
}) => {
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
        <Text style={styles.name}>{item.name} </Text>
        <View style={styles.infoBox}>
          <Ionicons
            name="people-sharp"
            size={24}
            color="black"
          />
          <Text>{item.member_total}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialCommunityIcons
            name="message"
            size={24}
            color="black"
          />
          <Text>{item.total_post_last_24_hrs}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export const GroupsIndex = ({ navigation }: Props) => {
  const [resGroups, setResGroups] = useState<ResGetGroups>();
  const [searchValue, setSearchValue] = useState("");
  const [resSearch, setResSearch] = useState<ResGroupSearch>();

  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    groups: "",
  });

  const [searchErrMsg, setSearchErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "groups",
          setErrMsg,
        })) as ResGetGroups;

        if (res && "groupsRes" in res && res.groupsRes.length > 0) {
          setResGroups(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

  async function handleSearch() {
    console.log("search");
    if (!searchValue) {
      return;
    }
    try {
      (async () => {
        const res = await globalSearchFn({
          identifier: "groups",
          searchValue,
          setErrMsg: setSearchErrMsg,
        });
        if (res && "finalResult" in res && res.finalResult.length > 0) {
          console.log(resSearch);

          setResSearch(res);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          onPress={() => {
            resSearch !== undefined
              ? setResSearch(undefined)
              : navigation.goBack();
          }}
          style={{ padding: 5 }}
        >
          <Image source={backIcon} />
        </Pressable>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={setSearchValue}
          value={searchValue}
          placeholder="Search"
          style={styles.textInput}
        />
        <Pressable
          onPress={handleSearch}
          style={styles.searchBtn}
        >
          <Text style={styles.searchBtnText}>Search</Text>
        </Pressable>
      </View>
      {errMsg.groups || searchErrMsg ? (
        <View>
          <StaticInlineNotice
            msg={errMsg.groups || searchErrMsg}
            bgColor="red"
            color="white"
          />
        </View>
      ) : (
        <View>
          {resSearch && resSearch.finalResult.length > 0 ? (
            <View style={styles.contentBox}>
              <FlatList
                data={resSearch?.finalResult[0]}
                renderItem={({ item }) => (
                  <RenderItem
                    item={item}
                    navigation={navigation}
                  />
                )}
                snapToInterval={screenWidth}
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContainer}
              />
            </View>
          ) : (
            <View style={styles.contentBox}>
              <FlatList
                data={resGroups?.groupsRes}
                renderItem={({ item }) => (
                  <RenderItem
                    item={item}
                    navigation={navigation}
                  />
                )}
                snapToInterval={screenWidth}
                decelerationRate="fast"
                contentContainerStyle={styles.flatListContainer}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 100,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "stretch",
  },
  itemContainer: {
    flexDirection: "column",
    rowGap: 5,
    marginHorizontal: 10,
    marginBottom: 20,
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
  name: {
    fontWeight: "700",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
  },
  contentBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});
