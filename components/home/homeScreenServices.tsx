import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import backIcon from "../../assets/backIcon.png";
import CutCostBanner from "../../assets/hServicesCutCost.png";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import globalSearchFn from "../../lib/global/search";
import { RootStackParamList } from "../../types/global/root";
import { ResSearchServices } from "../../types/services/resSearch";
import { StaticInlineNotice } from "../global/inlineNotice";
import { Banners } from "../hSServices/banners";
import { Categories } from "../hSServices/categories";
import { ServicesSearchCardLInfo } from "../hSServices/servicesSearchCardLInfo";

const screenWidth = Dimensions.get("window").width;
// HSProducts = HomeScreenProducts
export const HSServices = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const [resSearch, setResSearch] = useState<ResSearchServices>();
  const [searchValue, setSearchValue] = useState("");
  // const [showAllCategories, setShowAllCategories] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  async function handleSearch(searchValue?: string) {
    console.log("search");
    if (!searchValue) return;
    try {
      (async () => {
        const res = await globalSearchFn({
          identifier: "services",
          searchValue: searchValue,
          setErrMsg,
        });
        if (
          res &&
          "servicesFinalResult" in res &&
          res.servicesFinalResult.length > 0
        ) {
          setResSearch(res);
          console.log(resSearch);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          placeholder="search for services"
          value={searchValue}
          onChangeText={(newText) => {
            setSearchValue(newText);
            console.log(newText);
          }}
          style={styles.textInput}
        />
        <Pressable
          onPress={() => navigation.navigate("SearchFilterServices")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#ffffff",
            },
            styles.searchAreaBtn,
          ]}
        >
          <Ionicons
            name="filter"
            size={24}
            color="black"
          />
        </Pressable>

        <Pressable
          onPress={() => handleSearch(searchValue)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#ffffff",
            },
            styles.searchAreaBtn,
          ]}
        >
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.searchAreaBtn}
          />
        </Pressable>
      </View>
      {errMsg ? (
        <StaticInlineNotice
          msg={errMsg}
          color="#ffffff"
          bgColor="#ff0000"
        />
      ) : (
        <View>
          {(resSearch && resSearch.servicesFinalResult.length > 0) ||
          showSearch ? (
            <>
              <View>
                <Pressable
                  onPress={() => {
                    console.log("back");
                    setResSearch(undefined);
                  }}
                  style={{ padding: 5 }}
                >
                  <Image source={backIcon} />
                </Pressable>
              </View>
              <ServicesSearchCardLInfo
                data={resSearch as ResSearchServices}
                navigation={navigation}
                searchValue={searchValue}
              />
            </>
          ) : (
            <>
              <View>
                <Banners navigation={navigation} />
              </View>
              <View></View>
              <View>
                <Text>Categories</Text>
                <View>
                  <Categories
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={() => handleSearch(searchValue)}
                    setShowSearch={setShowSearch}
                  />
                </View>
              </View>
              <View>
                <Image
                  source={CutCostBanner}
                  style={styles.cutCostBanner}
                />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 10,
    marginVertical: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#EDF4FB",
    width: screenWidth - 150,
  },
  filterIcon: {
    backgroundColor: "#48B2E7",
    padding: 15,
    borderRadius: 50,
  },
  searchIcon: { padding: 15 },
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  cutCostBanner: {
    width: "100%",
    height: 100,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  searchAreaBtn: {
    padding: 5,
    borderRadius: 50,
  },
});
